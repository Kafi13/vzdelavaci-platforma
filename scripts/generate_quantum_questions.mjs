
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const chapters = [
  "Úvod do kvantových technologií_ Skripta.md",
  "Kvantové Počítače_ Principy, Aplikace, Limity.md",
  "Kvantová komunikace a bezpečnost_ Nové základy.md",
  "Kvantová senzorika_ Principy a Aplikace.md",
  "Kvantové materiály_ Základ kvantových technologií.md",
  "Kvantové a hybridní algoritmy_ Kapitola 7.md",
  "Kvantové strojové učení_ Budoucnost AI.md"
];

async function generateQuestionsForChapter(chapterFile) {
  const content = fs.readFileSync(path.join("Kvantum md", chapterFile), "utf8");
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
  Jsi expert na kvantové technologie a pedagog. Na základě přiloženého textu kapitoly vygeneruj přesně 17 testových otázek typu "kroužkovačka" (jedna správná odpověď ze čtyř).
  
  Pravidla:
  1. Otázky musí být STRIKTNĚ založeny na informacích v textu. Nepřidávej žádné externí znalosti.
  2. Každá otázka musí mít 4 možnosti (A, B, C, D).
  3. U každé otázky uveď index správné odpovědi (0-3).
  4. Formát výstupu musí být čistý JSON pole objektů:
     [
       {
         "chapter_id": "${chapterFile}",
         "question_text": "...",
         "options": ["...", "...", "...", "..."],
         "correct_option_index": 0
       }
     ]
  
  Text kapitoly:
  ${content}
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  // Odstranění markdown obalu, pokud ho AI přidá
  const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(jsonStr);
}

async function main() {
  let allQuestions = [];
  for (const chapter of chapters) {
    console.log(`Generuji otázky pro: ${chapter}...`);
    try {
      const questions = await generateQuestionsForChapter(chapter);
      allQuestions = allQuestions.concat(questions);
      console.log(`Získáno ${questions.length} otázek.`);
    } catch (err) {
      console.error(`Chyba u kapitoly ${chapter}:`, err);
    }
  }

  fs.writeFileSync("quantum_exam_questions.json", JSON.stringify(allQuestions, null, 2));
  console.log(`Celkem vygenerováno ${allQuestions.length} otázek do quantum_exam_questions.json`);
}

main();
