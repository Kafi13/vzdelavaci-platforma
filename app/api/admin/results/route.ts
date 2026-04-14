
import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';
import { isAdminEmail } from '@/utils/admin';

function isMissingTableError(message?: string) {
  return message?.includes('Could not find the table') ?? false;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Získání všech profilů
  const { data: profilesData, error: profError } = await adminSupabase
    .from('profiles')
    .select('*');

  if (profError && !isMissingTableError(profError.message)) {
    return NextResponse.json({ error: profError.message }, { status: 500 });
  }

  // 2. Získání všech výsledků
  const { data: resultsData, error: resError } = await adminSupabase
    .from('exam_results')
    .select('*')
    .order('score', { ascending: false });

  if (resError && !isMissingTableError(resError.message)) {
    return NextResponse.json({ error: resError.message }, { status: 500 });
  }

  // 3. Získání emailů z auth.users (toto lze jen přes service role)
  const { data: { users }, error: authError } = await adminSupabase.auth.admin.listUsers();

  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });

  const profiles = profilesData ?? [];
  const results = resultsData ?? [];

  // 4. Propojení dat
  const combinedData = users.map((userAuth) => {
    const profile = profiles.find((p) => p.id === userAuth.id);
    const userResults = results.filter((r) => r.user_id === userAuth.id);
    const bestResult = userResults.length > 0 ? userResults[0] : null;

    return {
      id: userAuth.id,
      email: userAuth?.email || 'Neznámý',
      full_name: profile?.full_name || 'Nevyplněno',
      semester_project: profile?.semester_project_desc || 'Zatím nezadáno',
      best_score: bestResult ? Math.round((bestResult.score / bestResult.total_questions) * 100) : 0,
      attempts: userResults.length,
      last_attempt: bestResult ? bestResult.created_at : null
    };
  });

  return NextResponse.json(combinedData);
}
