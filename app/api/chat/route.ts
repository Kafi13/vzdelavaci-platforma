import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/utils/supabase";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey);
const baseSystemInstruction = `Jsi Sokratovský AI tutor. Tvojí rolí je pomáhat studentům pochopit probíranou látku. NIKDY nedávej přímou odpověď nebo nepiš kód za studenta. Místo toho pokládej návodné otázky a logicky veď studenta k tomu, aby na řešení přišel sám. Buď přátelský, trpělivý a vždy komunikuj v českém jazyce.`;

export async function POST(req: Request) {
    try {
        const { messages, pathname } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: "Missing or invalid messages." }), { status: 400 });
        }

        let slugContext = "";
        let pageContext = "";

        console.log("1. Přijatý pathname z frontendu:", pathname);

        if (pathname && typeof pathname === "string") {
            const slug = pathname.replace(/^\//, '');
            if (slug) {
                slugContext = slug;
                console.log("2. Hledám v databázi lekci se slugem:", slugContext);

                // Použijeme '*' abychom stáhli vše a vyhnuli se chybám s chybějícími sloupci
                const { data, error } = await supabase
                    .from('knowledge_cards')
                    .select('*')
                    .eq('page_slug', slug);

                if (error) {
                    console.error("3. CHYBA DATABÁZE (Supabase):", error.message);
                } else {
                    console.log("3. Nalezená data v databázi:", data);
                }

                if (data && data.length > 0) {
                    const card = data[0];
                    pageContext = `
Zde jsou informace o aktuální stránce ("${card.title || 'Neznámý název'}"), kterou student právě studuje.
Tato data obsahují kontext probírané látky a také znění kontrolních kvízů na stránce.
Přečti si to:
${JSON.stringify(card, null, 2)}

POUŽIJ TENTO KONTEXT při komunikaci se studentem a reaguj na to, co právě čte. Zůstaň však Sokratovským tutorem podle dříve uvedených instrukcí.
`;
                } else {
                    console.log("4. POZOR: Žádná data pro tento slug nebyla nalezena.");
                }
            }
        }

        const dynamicSystemInstruction = baseSystemInstruction + (pageContext ? `\n\n${pageContext}` : "");

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: dynamicSystemInstruction,
        });

        const latestMessage = messages[messages.length - 1].text;
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const chat = model.startChat({ history: history });
        const result = await chat.sendMessage(latestMessage);

        return new Response(JSON.stringify({ text: result.response.text() }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch response from AI." }), { status: 500 });
    }
}