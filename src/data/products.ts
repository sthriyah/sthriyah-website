export interface ProductVariant {
  sku: string
  size: 'L' | 'XL' | 'XXL' | 'XXXL' | 'One Size'
  packSize: number
  price: number // in cents (USD)
  dimensions?: string
}

export interface Product {
  id: string
  name: string
  material: 'bamboo' | 'wood' | 'corn' | 'banana'
  category: 'pad' | 'liner'
  shortDescription: string
  description: string
  features: string[]
  images: string[]
  variants: ProductVariant[]
  badge?: string
  color: string // gradient classes for card accent
}

const products: Product[] = [
  {
    id: 'bamboo-pad',
    name: 'Bamboo Comfort Pad',
    material: 'bamboo',
    category: 'pad',
    shortDescription: 'Ultra-soft bamboo fibre pads with double wings for all-day confidence.',
    description:
      'Crafted from 100% natural bamboo fibre, our Bamboo Comfort Pad offers exceptional softness and breathability. The double-wing design ensures secure placement while the biodegradable core keeps you feeling fresh. Bamboo\'s natural antimicrobial properties mean fewer irritants against sensitive skin. Each pad is plastic-free and breaks down naturally after use — no guilt, just comfort.',
    features: [
      '100% natural bamboo fibre',
      'Double wings for secure fit',
      'Natural antimicrobial properties',
      'Fully biodegradable & plastic-free',
      'Hypoallergenic — ideal for sensitive skin',
      'Superior absorbency with leak-proof backing',
    ],
    images: ['/placeholder.png'],
    badge: 'Best Seller',
    color: 'from-emerald-100 to-green-50',
    variants: [
      { sku: 'BAMB-XL-6', size: 'XL', packSize: 6, price: 899, dimensions: '280mm with double wings' },
      { sku: 'BAMB-XL-12', size: 'XL', packSize: 12, price: 1549, dimensions: '280mm with double wings' },
      { sku: 'BAMB-XXL-6', size: 'XXL', packSize: 6, price: 949, dimensions: '330mm with double wings' },
      { sku: 'BAMB-XXL-12', size: 'XXL', packSize: 12, price: 1649, dimensions: '330mm with double wings' },
    ],
  },
  {
    id: 'wood-pad',
    name: 'Wood Fibre Pad',
    material: 'wood',
    category: 'pad',
    shortDescription: 'Sustainably sourced wood fibre pads in a full range of sizes.',
    description:
      'Our Wood Fibre Pad is made from responsibly harvested wood pulp, offering outstanding absorbency across all flow levels. Available in a complete size range from Large to XXXL, it provides the right fit for everyone. The natural wood fibre core wicks moisture away quickly, keeping skin dry and comfortable throughout the day. Certified biodegradable and free from chlorine bleaching.',
    features: [
      'Sustainably harvested wood pulp',
      'Available in L, XL, XXL, XXXL',
      'Fast-wicking moisture management',
      'Chlorine-free processing',
      'Certified biodegradable',
      'Soft, non-irritating top sheet',
    ],
    images: ['/placeholder.png'],
    color: 'from-amber-100 to-yellow-50',
    variants: [
      { sku: 'WOOD-L-6', size: 'L', packSize: 6, price: 749, dimensions: '240mm' },
      { sku: 'WOOD-L-12', size: 'L', packSize: 12, price: 1299, dimensions: '240mm' },
      { sku: 'WOOD-XL-6', size: 'XL', packSize: 6, price: 799, dimensions: '280mm with double wings' },
      { sku: 'WOOD-XL-12', size: 'XL', packSize: 12, price: 1399, dimensions: '280mm with double wings' },
      { sku: 'WOOD-XXL-6', size: 'XXL', packSize: 6, price: 849, dimensions: '330mm with double wings' },
      { sku: 'WOOD-XXL-12', size: 'XXL', packSize: 12, price: 1499, dimensions: '330mm with double wings' },
      { sku: 'WOOD-XXXL-6', size: 'XXXL', packSize: 6, price: 899, dimensions: '380mm with double wings' },
      { sku: 'WOOD-XXXL-12', size: 'XXXL', packSize: 12, price: 1599, dimensions: '380mm with double wings' },
    ],
  },
  {
    id: 'corn-pad',
    name: 'Corn Fibre Pad',
    material: 'corn',
    category: 'pad',
    shortDescription: 'Innovative corn fibre pads — plant-based, ultra-absorbent, and kind to skin.',
    description:
      'Made from PLA (polylactic acid) derived from corn starch, our Corn Fibre Pad is a next-generation biodegradable option. The naturally silky texture of corn fibre feels gentle against the skin while providing excellent fluid management. These pads are entirely plant-based, breaking down in composting conditions to return to the earth. Available in four sizes to suit every body and every flow.',
    features: [
      'Plant-based PLA corn fibre',
      'Silky-soft, skin-friendly texture',
      'Available in L, XL, XXL, XXXL',
      'Compostable in certified facilities',
      'Free from synthetic fragrances',
      'Excellent multi-layer absorbency',
    ],
    images: ['/placeholder.png'],
    badge: 'New',
    color: 'from-lime-100 to-green-50',
    variants: [
      { sku: 'CORN-L-6', size: 'L', packSize: 6, price: 829, dimensions: '240mm' },
      { sku: 'CORN-L-12', size: 'L', packSize: 12, price: 1449, dimensions: '240mm' },
      { sku: 'CORN-XL-6', size: 'XL', packSize: 6, price: 879, dimensions: '280mm with double wings' },
      { sku: 'CORN-XL-12', size: 'XL', packSize: 12, price: 1549, dimensions: '280mm with double wings' },
      { sku: 'CORN-XXL-6', size: 'XXL', packSize: 6, price: 929, dimensions: '330mm with double wings' },
      { sku: 'CORN-XXL-12', size: 'XXL', packSize: 12, price: 1649, dimensions: '330mm with double wings' },
      { sku: 'CORN-XXXL-6', size: 'XXXL', packSize: 6, price: 979, dimensions: '380mm with double wings' },
      { sku: 'CORN-XXXL-12', size: 'XXXL', packSize: 12, price: 1749, dimensions: '380mm with double wings' },
    ],
  },
  {
    id: 'banana-pad',
    name: 'Banana Fibre Pad',
    material: 'banana',
    category: 'pad',
    shortDescription: 'Rare banana fibre pads — exceptionally absorbent and naturally odour-neutralising.',
    description:
      'Banana fibre, harvested from the pseudostem of banana plants after fruit harvest, is one of nature\'s most absorbent and strong natural fibres. Our Banana Fibre Pad turns agricultural waste into a premium personal care product. These pads absorb up to three times their weight, making them ideal for heavier flows. The natural lignin in banana fibre acts as an odour neutraliser, keeping you feeling fresh all day.',
    features: [
      'Made from upcycled banana plant waste',
      'Absorbs up to 3× its weight',
      'Natural lignin neutralises odour',
      'Available in XL and XXL',
      'Exceptionally strong and durable',
      '100% compostable and plastic-free',
    ],
    images: ['/placeholder.png'],
    badge: 'Eco Premium',
    color: 'from-yellow-100 to-amber-50',
    variants: [
      { sku: 'BANA-XL-6', size: 'XL', packSize: 6, price: 949, dimensions: '280mm with double wings' },
      { sku: 'BANA-XL-12', size: 'XL', packSize: 12, price: 1699, dimensions: '280mm with double wings' },
      { sku: 'BANA-XXL-6', size: 'XXL', packSize: 6, price: 999, dimensions: '330mm with double wings' },
      { sku: 'BANA-XXL-12', size: 'XXL', packSize: 12, price: 1799, dimensions: '330mm with double wings' },
    ],
  },
  {
    id: 'bamboo-liner',
    name: 'Bamboo Panty Liner',
    material: 'bamboo',
    category: 'liner',
    shortDescription: 'Slim, everyday bamboo liners for light protection and all-day freshness.',
    description:
      'Our Bamboo Panty Liner is your everyday companion — ultra-thin yet remarkably absorbent. Made from the same premium bamboo fibre as our full pads, these liners offer discreet protection for light days, discharge, or as backup protection. The featherlight design means you\'ll barely know they\'re there, while the natural bamboo breathability keeps moisture and heat away from delicate skin.',
    features: [
      '100% natural bamboo fibre',
      'Ultra-thin and discreet',
      'Breathable, reduces heat and moisture',
      'Gentle adhesive stays in place',
      'Unscented and hypoallergenic',
      'Fully biodegradable',
    ],
    images: ['/placeholder.png'],
    color: 'from-teal-100 to-cyan-50',
    variants: [
      { sku: 'BLIN-OS-10', size: 'One Size', packSize: 10, price: 699, dimensions: '155mm' },
      { sku: 'BLIN-OS-20', size: 'One Size', packSize: 20, price: 1199, dimensions: '155mm' },
    ],
  },
  {
    id: 'corn-liner',
    name: 'Corn Fibre Panty Liner',
    material: 'corn',
    category: 'liner',
    shortDescription: 'Plant-based corn fibre liners with a silky-smooth feel for daily wear.',
    description:
      'Combining the softness of corn-derived PLA fibre with a breathable plant-based backing, our Corn Fibre Panty Liner delivers next-level daily comfort. The smooth top sheet glides against skin without friction, while the moisture-locking core keeps things fresh. Individually wrapped for hygiene on the go, these liners are a zero-compromise choice for conscious everyday care.',
    features: [
      'Plant-based PLA corn fibre',
      'Silky smooth top sheet',
      'Individually wrapped for portability',
      'Moisture-locking absorbent core',
      'Certified compostable',
      'Free from plastics and synthetics',
    ],
    images: ['/placeholder.png'],
    badge: 'Popular',
    color: 'from-green-100 to-emerald-50',
    variants: [
      { sku: 'CLIN-OS-10', size: 'One Size', packSize: 10, price: 749, dimensions: '155mm' },
      { sku: 'CLIN-OS-20', size: 'One Size', packSize: 20, price: 1299, dimensions: '155mm' },
    ],
  },
]

export default products
