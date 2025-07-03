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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Brevo API configuration
    const BREVO_API_KEY = process.env.BREVO_API_KEY || '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'
    const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'

    // Create contact in Brevo - using correct format from documentation
    const contactData = {
      email: email.toLowerCase().trim(),
      attributes: {
        FIRSTNAME: name || email.split('@')[0],
        SOURCE: 'Summit Website',
        SIGNUP_DATE: new Date().toISOString(),
      },
      // Remove listIds to avoid list ID errors - contact will be added to default list
      updateEnabled: true, // Update if contact already exists
    }

    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(contactData),
    })

    const responseData = await brevoResponse.json()

    if (!brevoResponse.ok) {
      console.error('Brevo API error:', responseData)
      
      // Handle duplicate email (not really an error)
      if (responseData.code === 'duplicate_parameter' || brevoResponse.status === 400) {
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

    console.log('Brevo subscription successful:', responseData)

    // Send welcome email using Brevo transactional email API
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
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2F5B9A;">Welcome to Summit Early Access!</h2>
              <p>Hi ${name || 'there'},</p>
              <p>Thanks for joining our early-adopter community! You're now part of an exclusive group helping shape the future of audio learning.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2F5B9A; margin-top: 0;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>🎯 You'll get first access to Summit when we launch</li>
                  <li>💰 Exclusive early-adopter pricing (save up to 40%)</li>
                  <li>📧 Behind-the-scenes updates on our progress</li>
                  <li>🧠 ADHD-friendly learning tips and strategies</li>
                </ul>
              </div>
              
              <p>Ready to secure your spot? <a href="https://justsummit.co/#pricing" style="color: #2F5B9A; text-decoration: none; font-weight: bold;">Check out our early-adopter pre-orders →</a></p>
              
              <p style="margin-top: 30px;">Best,<br>Tom & the Summit Team</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="font-size: 12px; color: #666;">
                You're receiving this because you signed up for Summit early access at justsummit.co
              </p>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json()
        console.error('Welcome email failed:', emailError)
      } else {
        console.log('Welcome email sent successfully')
      }
    } catch (emailError) {
      console.error('Welcome email error:', emailError)
      // Don't fail the signup if welcome email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for next steps.',
      contactId: responseData.id,
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
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

