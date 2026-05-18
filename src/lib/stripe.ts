import { createServerFn } from '@tanstack/react-start'
import products from '@/data/products'
import type { ProductVariant } from '@/data/products'

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY
)

export interface CheckoutInput {
  productId: string
  variant: ProductVariant
}

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .inputValidator((data: CheckoutInput) => data)
  .handler(async ({ data }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const product = products.find((p) => p.id === data.productId)
    if (!product) {
      throw new Error('Product not found')
    }

    const variantLabel =
      data.variant.size === 'One Size'
        ? `Pack of ${data.variant.packSize}`
        : `Size ${data.variant.size} — Pack of ${data.variant.packSize}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${product.name} (${variantLabel})`,
              description: product.shortDescription,
            },
            unit_amount: data.variant.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SITE_URL ?? 'http://localhost:3000'}/checkout/success`,
      cancel_url: `${process.env.SITE_URL ?? 'http://localhost:3000'}/checkout/cancel`,
    })

    return session.url
  })
