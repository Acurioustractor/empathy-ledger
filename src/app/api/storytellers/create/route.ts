import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Create user with Supabase Auth (magic link)
    const { data: authData, error: authError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        data: {
          name,
          phone,
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Failed to create storyteller account' },
        { status: 500 }
      );
    }

    // Generate QR code from magic link
    const magicLink = authData.properties.action_link;
    const qrCodeDataURL = await QRCode.toDataURL(magicLink, {
      width: 400,
      margin: 2,
      color: {
        dark: '#e8c47c',
        light: '#0a0908',
      },
    });

    // Create storyteller record
    const storytellerId = authData.user.id;

    const { error: insertError } = await (supabase as any)
      .from('portraits')
      .insert({
        storyteller_id: storytellerId,
        visible: false, // Default to hidden until story is uploaded and approved
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      // Non-fatal - user is created but portrait record failed
    }

    return NextResponse.json({
      success: true,
      storyteller: {
        id: storytellerId,
        email,
        name,
        phone,
      },
      magicLink,
      qrCode: qrCodeDataURL,
      accessCode: authData.user.id.slice(0, 8), // First 8 chars of UUID for easy reference
    });
  } catch (error) {
    console.error('Create storyteller error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
