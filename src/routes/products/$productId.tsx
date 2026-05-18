import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, CheckCircle, Leaf, Package, Shield, Recycle } from 'lucide-react'
import products from '@/data/products'
import type { ProductVariant } from '@/data/products'
import { BuyButton } from '@/components/BuyButton'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = products.find((p) => p.id === params.productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  },
})

const MATERIAL_ICONS: Record<string, string> = {
  bamboo: '🌿',
  wood: '🌲',
  corn: '🌽',
  banana: '🍌',
}

const MATERIAL_DESCRIPTIONS: Record<string, string> = {
  bamboo: 'Bamboo grows up to 35× faster than trees, requires no pesticides, and self-regenerates from its roots.',
  wood: 'FSC-certified wood pulp from responsibly managed forests with full chain-of-custody tracking.',
  corn: 'PLA derived from non-GMO corn starch — a renewable resource that composts in certified facilities.',
  banana: 'Harvested from banana pseudostems after fruit collection, turning agricultural waste into premium fibre.',
}

function SizeGuide({ category }: { category: 'pad' | 'liner' }) {
  if (category === 'liner') {
    return (
      <div className="bg-[#e8f0ea] rounded-xl p-4 mt-4">
        <h4 className="font-semibold text-[#1a3a1f] text-sm mb-2">Size Guide</h4>
        <p className="text-[#4a7c59] text-xs leading-relaxed">
          Panty liners are one size: 155mm — designed for all-day discreet everyday wear.
        </p>
      </div>
    )
  }
  return (
    <div className="bg-[#e8f0ea] rounded-xl p-4 mt-4">
      <h4 className="font-semibold text-[#1a3a1f] text-sm mb-3">Size Guide</h4>
      <div className="space-y-2 text-xs text-[#4a7c59]">
        {[
          { size: 'L', mm: '240mm', use: 'Light to regular flow' },
          { size: 'XL', mm: '280mm', use: 'Regular flow with double wings' },
          { size: 'XXL', mm: '330mm', use: 'Heavy flow with double wings' },
          { size: 'XXXL', mm: '380mm', use: 'Overnight / very heavy flow with double wings' },
        ].map((row) => (
          <div key={row.size} className="flex items-center justify-between">
            <span className="font-bold text-[#1a3a1f] w-10">{row.size}</span>
            <span className="w-16 text-center">{row.mm}</span>
            <span className="flex-1 text-right">{row.use}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RouteComponent() {
  const product = Route.useLoaderData()

  // Derive unique sizes and pack sizes
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size))]
  const [selectedSize, setSelectedSize] = useState(uniqueSizes[0])

  const packsForSize = product.variants.filter((v) => v.size === selectedSize)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(packsForSize[0])

  const handleSizeChange = (size: typeof uniqueSizes[0]) => {
    setSelectedSize(size)
    const firstVariant = product.variants.find((v) => v.size === size)!
    setSelectedVariant(firstVariant)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#4a7c59] hover:text-[#1a3a1f] text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all products
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image gallery */}
          <div className="space-y-4">
            <div
              className={`relative aspect-square bg-gradient-to-br ${product.color} rounded-3xl overflow-hidden shadow-lg`}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply opacity-50"
              />
              {product.badge && (
                <div className="absolute top-5 right-5 bg-[#1a3a1f] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {product.badge}
                </div>
              )}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="text-lg">{MATERIAL_ICONS[product.material]}</span>
                <span className="text-[#1a3a1f] text-sm font-semibold capitalize">
                  {product.material} fibre
                </span>
              </div>
            </div>

            {/* Thumbnail row — single image for now, ready for multi */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-gradient-to-br ${product.color} cursor-pointer border-[#4a7c59]`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover mix-blend-multiply opacity-50"
                  />
                </div>
              ))}
            </div>

            {/* Material sustainability note */}
            <div className="bg-[#1a3a1f] text-white rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{MATERIAL_ICONS[product.material]}</span>
                <div>
                  <h4 className="font-bold text-[#6aab7e] text-sm mb-1 uppercase tracking-wide">
                    About {product.material} fibre
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {MATERIAL_DESCRIPTIONS[product.material]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product details */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-[#4a7c59] uppercase tracking-widest">
                  {product.category === 'pad' ? 'Sanitary Pad' : 'Panty Liner'}
                </span>
                {product.badge && (
                  <span className="bg-[#e8f0ea] text-[#2d5a27] text-xs font-bold px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a1f] mb-3">{product.name}</h1>
              <p className="text-[#4a7c59] text-base leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Price display */}
            <div className="bg-[#e8f0ea] rounded-2xl p-5 mb-6">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-[#1a3a1f]">
                  ${(selectedVariant.price / 100).toFixed(2)}
                </span>
                <span className="text-[#4a7c59] text-sm mb-1">
                  Pack of {selectedVariant.packSize}
                  {selectedVariant.dimensions ? ` · ${selectedVariant.dimensions}` : ''}
                </span>
              </div>
              {selectedVariant.packSize > 6 && (
                <p className="text-[#4a7c59]/70 text-xs mt-1">
                  Save vs. buying two packs of{' '}
                  {Math.floor(selectedVariant.packSize / 2)}
                </p>
              )}
            </div>

            {/* Size selector */}
            {uniqueSizes.length > 1 && (
              <div className="mb-5">
                <h3 className="font-semibold text-[#1a3a1f] mb-2 text-sm">
                  Size{' '}
                  <span className="font-bold text-[#4a7c59]">
                    {selectedSize !== 'One Size' ? selectedSize : ''}
                  </span>
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {uniqueSizes.map((size) => {
                    const dim = product.variants.find((v) => v.size === size)?.dimensions
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`flex flex-col items-center px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                          selectedSize === size
                            ? 'border-[#1a3a1f] bg-[#1a3a1f] text-white'
                            : 'border-[#e8f0ea] bg-white text-[#1a3a1f] hover:border-[#4a7c59]'
                        }`}
                      >
                        <span>{size}</span>
                        {dim && (
                          <span
                            className={`text-xs font-normal ${selectedSize === size ? 'text-white/70' : 'text-[#4a7c59]/60'}`}
                          >
                            {dim}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Pack size selector */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#1a3a1f] mb-2 text-sm">Pack Size</h3>
              <div className="flex gap-3 flex-wrap">
                {packsForSize.map((variant) => (
                  <button
                    key={variant.sku}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      selectedVariant.sku === variant.sku
                        ? 'border-[#4a7c59] bg-[#4a7c59] text-white'
                        : 'border-[#e8f0ea] bg-white text-[#1a3a1f] hover:border-[#4a7c59]'
                    }`}
                  >
                    Pack of {variant.packSize}
                    <span
                      className={`block text-xs font-normal ${selectedVariant.sku === variant.sku ? 'text-white/70' : 'text-[#4a7c59]/60'}`}
                    >
                      ${(variant.price / 100).toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buy button */}
            <div className="flex gap-3 mb-8">
              <BuyButton
                productId={product.id}
                variant={selectedVariant}
                className="flex-1 py-4 text-base"
              />
            </div>

            {/* Quick trust signals */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: <Recycle className="w-4 h-4" />, label: 'Biodegradable' },
                { icon: <Shield className="w-4 h-4" />, label: 'Hypoallergenic' },
                { icon: <Package className="w-4 h-4" />, label: 'Plastic-Free Pack' },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col items-center gap-1.5 bg-[#e8f0ea] rounded-xl p-3 text-center"
                >
                  <span className="text-[#4a7c59]">{t.icon}</span>
                  <span className="text-xs font-medium text-[#1a3a1f]">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-[#1a3a1f] mb-3">About this product</h3>
              <p className="text-[#4a7c59] text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-[#1a3a1f] mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#4a7c59]">
                    <CheckCircle className="w-4 h-4 text-[#4a7c59] flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size guide */}
            <SizeGuide category={product.category} />
          </div>
        </div>
      </div>
    </div>
  )
}
