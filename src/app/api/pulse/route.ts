import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portraitId, eventType, metadata } = body;

    if (!portraitId || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const validEventTypes = ['view', 'hover', 'click', 'message'];
    if (!validEventTypes.includes(eventType)) {
      return NextResponse.json(
        { error: 'Invalid event type' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Create pulse event (this triggers real-time notification)
    const { error: pulseError } = await supabase.from('pulse_events').insert({
      portrait_id: portraitId,
      event_type: eventType,
      metadata: metadata || null,
    });

    if (pulseError) {
      console.error('Pulse event error:', pulseError);
      return NextResponse.json(
        { error: 'Failed to create pulse event' },
        { status: 500 }
      );
    }

    // Update stats based on event type
    if (eventType === 'view' || eventType === 'hover') {
      await supabase.rpc('increment_views', { portrait_uuid: portraitId });
    } else if (eventType === 'click') {
      await supabase.rpc('increment_clicks', { portrait_uuid: portraitId });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pulse API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
