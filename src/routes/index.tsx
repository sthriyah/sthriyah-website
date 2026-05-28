import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Search, Leaf, X } from 'lucide-react'
import products from '@/data/products'
import type { Product } from '@/data/products'

export const Route = createFileRoute('/')({
  component: ProductsIndex,
})

const MATERIAL_LABELS: Record<string, string> = {
  bamboo: '🌿 Bamboo',
  wood: '🌲 Wood',
  corn: '🌽 Corn',
  banana: '🍌 Banana',
}

const CATEGORY_LABELS: Record<string, string> = {
  pad: 'Pads',
  liner: 'Panty Liners',
}

function ProductCard({ product }: { product: Product }) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price))

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e8f0ea] hover:border-[#6aab7e] hover:-translate-y-1"
    >
      {/* Image area */}
      <div className={`relative aspect-square bg-gradient-to-br ${product.color} overflow-hidden`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Material badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a3a1f] text-xs font-semibold px-2.5 py-1 rounded-full">
          {MATERIAL_LABELS[product.material]}
        </div>
        {/* Special badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-[#1a3a1f] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        {/* Category pill */}
        <div className="absolute bottom-3 left-3 bg-[#1a3a1f]/80 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
          {CATEGORY_LABELS[product.category]}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h2 className="font-bold text-[#1a3a1f] text-lg mb-1 group-hover:text-[#4a7c59] transition-colors">
          {product.name}
        </h2>
        <p className="text-[#4a7c59]/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {product.shortDescription}
        </p>

        {/* Size chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[...new Set(product.variants.map((v) => v.size))].map((size) => (
            <span
              key={size}
              className="text-xs bg-[#e8f0ea] text-[#2d5a27] px-2 py-0.5 rounded-md font-medium"
            >
              {size}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-[#4a7c59]/60 block">from</span>
            <span className="text-xl font-bold text-[#1a3a1f]">
              ₹{(lowestPrice).toFixed(2)}
            </span>
          </div>
          <div className="text-sm font-semibold text-[#4a7c59] group-hover:text-[#1a3a1f] transition-colors flex items-center gap-1">
            View options
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ProductsIndex() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'pad' | 'liner'>('all')
  const [activeMaterial, setActiveMaterial] = useState<
    'all' | 'bamboo' | 'wood' | 'corn' | 'banana'
  >('all')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        p.material.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'all' || p.category === activeCategory
      const matchMaterial = activeMaterial === 'all' || p.material === activeMaterial
      return matchSearch && matchCategory && matchMaterial
    })
  }, [search, activeCategory, activeMaterial])

  const hasFilters = activeCategory !== 'all' || activeMaterial !== 'all' || search

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#1a3a1f] via-[#2d5a27] to-[#4a7c59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-[#6aab7e]" />
              <span className="text-[#6aab7e] text-sm font-semibold tracking-widest uppercase">
                100% Biodegradable
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Gentle on you.
              <br />
              <span className="text-[#6aab7e]">Kind to Earth.</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Premium sanitary pads and liners crafted from bamboo, wood, corn, and banana fibre.
              Plastic-free, hypoallergenic, and fully biodegradable — because you and the planet
              deserve better.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {['🌿 Bamboo', '🌲 Wood', '🌽 Corn', '🍌 Banana'].map((m) => (
                <span
                  key={m}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full font-medium"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search & filter bar */}
      <div className="sticky top-16 z-40 bg-[#f7f3ec]/95 backdrop-blur-sm border-b border-[#e8f0ea] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7c59]/60" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#e8f0ea] rounded-full text-sm text-[#1a3a1f] placeholder-[#4a7c59]/50 focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/10"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a7c59]/60 hover:text-[#1a3a1f]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {(['all', 'pad', 'liner'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1a3a1f] text-white shadow-sm'
                      : 'bg-white border border-[#e8f0ea] text-[#4a7c59] hover:border-[#4a7c59]'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat === 'pad' ? 'Pads' : 'Liners'}
                </button>
              ))}
            </div>

            {/* Material filter */}
            <div className="flex gap-2 flex-wrap">
              {(['all', 'bamboo', 'wood', 'corn', 'banana'] as const).map((mat) => (
                <button
                  key={mat}
                  onClick={() => setActiveMaterial(mat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeMaterial === mat
                      ? 'bg-[#4a7c59] text-white shadow-sm'
                      : 'bg-white border border-[#e8f0ea] text-[#4a7c59] hover:border-[#4a7c59]'
                  }`}
                >
                  {mat === 'all' ? 'All Materials' : MATERIAL_LABELS[mat]}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                onClick={() => {
                  setSearch('')
                  setActiveCategory('all')
                  setActiveMaterial('all')
                }}
                className="text-xs text-[#4a7c59] hover:text-[#1a3a1f] underline whitespace-nowrap"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-[#1a3a1f] mb-2">No products found</h3>
            <p className="text-[#4a7c59]/70 mb-6">Try adjusting your filters or search term.</p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
                setActiveMaterial('all')
              }}
              className="px-6 py-2 bg-[#1a3a1f] text-white rounded-full text-sm font-semibold hover:bg-[#2d5a27] transition-colors"
            >
              Show all products
            </button>
          </div>
        ) : (
          <>
            <p className="text-[#4a7c59]/70 text-sm mb-6">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Value props strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '♻️', title: 'Biodegradable', desc: 'Returns to earth naturally' },
            { icon: '🌱', title: 'Plastic-Free', desc: 'Zero plastic in every pack' },
            { icon: '💚', title: 'Hypoallergenic', desc: 'Safe for sensitive skin' },
            { icon: '🌍', title: 'Sustainably Sourced', desc: 'Ethical supply chain' },
          ].map((vp) => (
            <div
              key={vp.title}
              className="bg-white rounded-2xl p-5 border border-[#e8f0ea] text-center"
            >
              <div className="text-2xl mb-2">{vp.icon}</div>
              <div className="font-bold text-[#1a3a1f] text-sm mb-1">{vp.title}</div>
              <div className="text-[#4a7c59]/70 text-xs">{vp.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
