import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

// Get all visible portraits (public)
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: portraits, error } = await supabase
      .from('portraits')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Portraits fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch portraits' },
        { status: 500 }
      );
    }

    return NextResponse.json({ portraits });
  } catch (error) {
    console.error('Portraits API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new portrait (admin/upload)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, name, storytellerId } = body;

    if (!imageUrl || !storytellerId) {
      return NextResponse.json(
        { error: 'Missing required fields: imageUrl, storytellerId' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Generate random visual variation
    const rotation = (Math.random() - 0.5) * 3; // -1.5 to 1.5 degrees
    const offsetX = (Math.random() - 0.5) * 8; // -4 to 4 pixels
    const offsetY = (Math.random() - 0.5) * 8;

    const { data: portrait, error } = await supabase
      .from('portraits')
      // @ts-expect-error - Supabase type inference issue with Database schema
      .insert({
        image_url: imageUrl,
        name: name || null,
        storyteller_id: storytellerId,
        rotation,
        offset_x: offsetX,
        offset_y: offsetY,
      })
      .select()
      .single();

    if (error) {
      console.error('Portrait creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create portrait' },
        { status: 500 }
      );
    }

    // Type the portrait explicitly since @ts-expect-error breaks inference
    const typedPortrait = portrait as Database['public']['Tables']['portraits']['Row'];

    return NextResponse.json({
      success: true,
      portrait: typedPortrait,
      // Return the access code so storyteller can access their dashboard
      accessCode: typedPortrait.access_code,
      dashboardUrl: `/dashboard?code=${typedPortrait.access_code}`,
    });
  } catch (error) {
    console.error('Portraits POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update portrait (toggle visibility, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessCode, visible } = body;

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Access code required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const updates: Record<string, unknown> = {};
    if (typeof visible === 'boolean') {
      updates.visible = visible;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      );
    }

    // @ts-expect-error - Supabase type inference issue with Database schema
    const { data: portrait, error } = await supabase
      .from('portraits')
      .update(updates)
      .eq('access_code', accessCode)
      .select()
      .single();

    if (error) {
      console.error('Portrait update error:', error);
      return NextResponse.json(
        { error: 'Failed to update portrait' },
        { status: 500 }
      );
    }

    // Type the portrait explicitly
    const typedPortrait = portrait as Database['public']['Tables']['portraits']['Row'];

    return NextResponse.json({ success: true, portrait: typedPortrait });
  } catch (error) {
    console.error('Portraits PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
