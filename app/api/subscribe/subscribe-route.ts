import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email: email,
        listIds: [2], // Automatically add to "Summit Early Adopters" list (ID: 2)
        updateEnabled: true
      }),
    });

    if (brevoResponse.ok) {
      const result = await brevoResponse.json();
      console.log('Contact added to Brevo:', result);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed!' 
      });
    } else {
      const errorData = await brevoResponse.json();
      console.error('Brevo API error:', errorData);
      
      // Handle duplicate contact (this is actually success)
      if (brevoResponse.status === 400 && errorData.code === 'duplicate_parameter') {
        return NextResponse.json({ 
          success: true, 
          message: 'Already subscribed!' 
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
      { error: 'Email service not configured. Please try again later.' },
      { status: 500 }
    );
  }
}

