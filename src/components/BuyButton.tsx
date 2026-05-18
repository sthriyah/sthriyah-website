import { useEffect, useState } from 'react'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'
import type { ProductVariant } from '@/data/products'

export function BuyButton({
  productId,
  variant,
  className = '',
}: {
  productId: string
  variant: ProductVariant
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled)
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      const url = await createCheckoutSession({ data: { productId, variant } })
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  if (stripeEnabled === false) {
    return (
      <button
        disabled
        className={`px-6 py-3 rounded-full bg-gray-200 text-gray-500 font-semibold cursor-not-allowed text-sm ${className}`}
        title="Checkout is not available"
      >
        Checkout Unavailable
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || stripeEnabled === null}
      className={`px-8 py-3 rounded-full bg-[#1a3a1f] hover:bg-[#2d5a27] text-white font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-wait text-sm shadow-md hover:shadow-lg active:scale-95 ${className}`}
    >
      {loading ? 'Processing…' : 'Buy Now'}
    </button>
  )
}
