import { Link } from '@tanstack/react-router'
import { Leaf } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-[#1a3a1f] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-[#6aab7e] rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">Sthriyah</span>
              <span className="hidden sm:block text-[10px] text-[#6aab7e] font-medium tracking-widest uppercase -mt-1">
                Pure Natural Care
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition-colors hidden sm:block"
            >
              Products
            </Link>
            <Link
              to="/"
              search={{ category: 'pad' } as never}
              className="text-white/80 hover:text-white transition-colors hidden sm:block"
            >
              Pads
            </Link>
            <Link
              to="/"
              search={{ category: 'liner' } as never}
              className="text-white/80 hover:text-white transition-colors hidden sm:block"
            >
              Liners
            </Link>
            <Link
              to="/"
              className="bg-[#4a7c59] hover:bg-[#6aab7e] text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
