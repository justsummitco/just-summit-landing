import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true
      })
    });

    // Handle response
    if (brevoResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed!' 
      });
    } else if (brevoResponse.status === 400) {
      // Contact already exists - that's okay
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed!' 
      });
    } else {
      console.error('Brevo API error:', await brevoResponse.text());
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

