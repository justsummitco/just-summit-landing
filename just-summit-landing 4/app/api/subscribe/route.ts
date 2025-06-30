import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    // Validate input
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get ActiveCampaign credentials from environment
    const acUrl = process.env.NEXT_PUBLIC_AC_URL
    const acKey = process.env.NEXT_PUBLIC_AC_KEY

    if (!acUrl || !acKey) {
      console.error('ActiveCampaign credentials not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      )
    }

    // Prepare contact data for ActiveCampaign
    const contactData = {
      contact: {
        email: email.toLowerCase().trim(),
        firstName: name.trim(),
        tags: ['landing-page-signup', 'pre-launch'],
        fieldValues: [
          {
            field: '1', // Assuming field 1 is for source
            value: 'Landing Page'
          }
        ]
      }
    }

    // Send to ActiveCampaign
    const acResponse = await fetch(`${acUrl}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': acKey,
      },
      body: JSON.stringify(contactData),
    })

    if (!acResponse.ok) {
      const errorData = await acResponse.json().catch(() => ({}))
      console.error('ActiveCampaign API error:', errorData)
      
      // Check if it's a duplicate email (usually returns 422)
      if (acResponse.status === 422) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      )
    }

    const responseData = await acResponse.json()
    
    // Log successful subscription (remove in production)
    console.log('Successfully subscribed:', email)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed!',
        contactId: responseData.contact?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

