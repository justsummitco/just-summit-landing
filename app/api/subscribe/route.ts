import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;
    const name = body.name || email?.split('@')[0]; // fallback if name missing

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name },
        listIds: [2], // update as needed
        updateEnabled: true,
      }),
    });

    const responseText = await brevoResponse.text();
    let parsedResponse = null;

    try {
      parsedResponse = responseText ? JSON.parse(responseText) : null;
    } catch (err) {
      console.warn('Failed to parse Brevo response as JSON:', responseText);
    }

    if (brevoResponse.ok) {
      console.log('Contact added to Brevo:', parsedResponse);

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed!',
      });
    } else {
      console.error('Brevo API error:', parsedResponse);

      if (
        brevoResponse.status === 400 &&
        parsedResponse?.code === 'duplicate_parameter'
      ) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed!',
        });
      }

      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      {
        error:
          'Email service not configured. Please try again later.',
      },
      { status: 500 }
    );
  }
}