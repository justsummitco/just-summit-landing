import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Loader2 } from 'lucide-react'

const StripeCheckout = ({ tier, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: tier.id,
          tierName: tier.name,
          price: tier.price,
          depositAmount: 4900, // £49 in pence
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      window.location.href = url
      
    } catch (error) {
      console.error('Checkout error:', error)
      onError?.(error.message)
      setLoading(false)
    }
  }

  return (
    <Button 
      className={`w-full py-3 text-lg font-semibold ${
        tier.popular 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-gray-900 hover:bg-gray-800'
      }`}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Pre-Order Now'
      )}
    </Button>
  )
}

export default StripeCheckout

