import { Link, createFileRoute } from '@tanstack/react-router'
import { XCircle, Leaf } from 'lucide-react'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-12 border border-[#e8f0ea] shadow-xl text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-[#4a7c59]" />
          <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase">
            Sthriyah
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1a3a1f] mb-3">Checkout Cancelled</h1>
        <p className="text-[#4a7c59] leading-relaxed mb-8">
          No charges were made. Your cart is still waiting — whenever you're ready.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-full bg-[#1a3a1f] text-white font-semibold hover:bg-[#2d5a27] transition-colors shadow-md"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  )
}
