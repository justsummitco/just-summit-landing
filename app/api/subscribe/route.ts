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

    // Get API key from environment variables (secure)
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      console.error('BREVO_API_KEY environment variable not set');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Attempting to add contact to Brevo:', email);

    // Add contact to Brevo using official API format
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true
      })
    });

    const responseData = await brevoResponse.text();
    console.log('Brevo response status:', brevoResponse.status);
    console.log('Brevo response:', responseData);

    // Handle successful responses
    if (brevoResponse.status === 201) {
      // Contact created successfully
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed!' 
      });
    } else if (brevoResponse.status === 204) {
      // Contact updated successfully
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed!' 
      });
    } else if (brevoResponse.status === 400) {
      // Check if it's a duplicate contact error
      try {
        const errorData = JSON.parse(responseData);
        if (errorData.message && errorData.message.includes('Contact already exist')) {
          return NextResponse.json({ 
            success: true, 
            message: 'Successfully subscribed!' 
          });
        }
      } catch (e) {
        // If we can't parse the error, treat as general error
      }
      
      console.error('Brevo API 400 error:', responseData);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    } else {
      console.error('Brevo API error:', brevoResponse.status, responseData);
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

