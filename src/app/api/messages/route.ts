import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portraitId, word } = body;

    if (!portraitId || !word) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate word: single word, letters only, max 20 chars
    const cleanWord = word.trim().toLowerCase();
    if (!/^[a-zA-Z]+$/.test(cleanWord) || cleanWord.length > 20) {
      return NextResponse.json(
        { error: 'Invalid word format. Must be a single word, letters only.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Create the message
    const messageData: MessageInsert = {
      portrait_id: portraitId,
      word: cleanWord,
    };
    // @ts-ignore - Supabase type inference issue with Database schema
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();

    if (messageError) {
      console.error('Message error:', messageError);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Create a pulse event for the message (triggers notification)
    const pulseData: Database['public']['Tables']['pulse_events']['Insert'] = {
      portrait_id: portraitId,
      event_type: 'message',
      metadata: { word: cleanWord, message_id: message.id },
    };
    // @ts-ignore - Supabase type inference issue
    await supabase.from('pulse_events').insert(pulseData);

    // Increment click count (message is a form of engagement)
    await supabase.rpc('increment_clicks', { portrait_uuid: portraitId });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Messages API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accessCode = searchParams.get('accessCode');

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Access code required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Get portrait by access code
    const { data: portrait, error: portraitError } = await supabase
      .from('portraits')
      .select('id')
      .eq('access_code', accessCode)
      .single();

    if (portraitError || !portrait) {
      return NextResponse.json(
        { error: 'Portrait not found' },
        { status: 404 }
      );
    }

    // Get messages for this portrait
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('portrait_id', portrait.id)
      .order('created_at', { ascending: false });

    if (messagesError) {
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
