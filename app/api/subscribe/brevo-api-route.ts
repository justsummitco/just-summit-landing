import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Brevo API configuration
    const BREVO_API_KEY = process.env.BREVO_API_KEY || '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'
    const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'

    // Create contact in Brevo
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name || email.split('@')[0],
          SOURCE: 'Summit Website',
          SIGNUP_DATE: new Date().toISOString(),
        },
        listIds: [1], // Default list ID - you may need to adjust this
        updateEnabled: true, // Update if contact already exists
      }),
    })

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json()
      console.error('Brevo API error:', errorData)
      
      // Handle duplicate email (not really an error)
      if (errorData.code === 'duplicate_parameter') {
        return NextResponse.json({
          success: true,
          message: 'Email already subscribed! You\'re all set for early access.',
        })
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    const result = await brevoResponse.json()
    console.log('Brevo subscription successful:', result)

    // Send welcome email (optional)
    try {
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: 'Summit Team',
            email: 'hello@justsummit.co',
          },
          to: [
            {
              email: email,
              name: name || email.split('@')[0],
            },
          ],
          subject: 'Welcome to Summit Early Access! 🎉',
          htmlContent: `
            <h2>Welcome to Summit Early Access!</h2>
            <p>Hi ${name || 'there'},</p>
            <p>Thanks for joining our early-adopter community! You're now part of an exclusive group helping shape the future of audio learning.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>🎯 You'll get first access to Summit when we launch</li>
              <li>💰 Exclusive early-adopter pricing (save up to 40%)</li>
              <li>📧 Behind-the-scenes updates on our progress</li>
              <li>🧠 ADHD-friendly learning tips and strategies</li>
            </ul>
            <p>Ready to secure your spot? <a href="https://justsummit.co/#pricing">Check out our early-adopter pre-orders</a></p>
            <p>Best,<br>Tom & the Summit Team</p>
          `,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Welcome email failed:', await emailResponse.json())
      }
    } catch (emailError) {
      console.error('Welcome email error:', emailError)
      // Don't fail the signup if welcome email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for next steps.',
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

