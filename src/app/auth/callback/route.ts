import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') || '/dashboard';

  if (token_hash && type) {
    const supabase = createServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    });

    if (!error) {
      // Redirect to dashboard with success
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Redirect to error page
  return NextResponse.redirect(new URL('/auth/error', request.url));
}
