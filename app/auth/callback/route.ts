import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
  const next = requestUrl.searchParams.get('next') ?? '/';
  const redirectUrl = new URL(next, requestUrl.origin);
  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (!error) {
      const loginUrl = new URL('/login', requestUrl.origin);
      loginUrl.searchParams.set('confirmed', '1');
      return NextResponse.redirect(loginUrl);
    }
  }

  const errorUrl = new URL('/login', requestUrl.origin);
  errorUrl.searchParams.set('error_description', 'Potvrzení e-mailu selhalo nebo odkaz již není platný.');
  return NextResponse.redirect(errorUrl);
}
