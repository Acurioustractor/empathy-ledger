import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storytellerId, subscription } = body;

    if (!storytellerId || !subscription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Upsert subscription (update if exists, insert if not)
    const { error } = await supabase.from('push_subscriptions').upsert(
      {
        storyteller_id: storytellerId,
        subscription,
        active: true,
      },
      {
        onConflict: 'storyteller_id',
      }
    );

    if (error) {
      console.error('Push subscription error:', error);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Push subscribe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
