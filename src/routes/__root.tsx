import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sthriyah — Pure Natural Care' },
      {
        name: 'description',
        content:
          'Biodegradable sanitary pads and liners made from bamboo, wood, corn, and banana fibre. Gentle on you. Kind to the earth.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#f7f3ec]">
        <Header />
        {children}
        <footer className="bg-[#1a3a1f] text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-[#6aab7e] mb-3 uppercase text-xs tracking-widest">
                  Sthriyah
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Premium biodegradable sanitary care made from bamboo, wood, corn, and banana
                  fibre. 100% plastic-free.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#6aab7e] mb-3 uppercase text-xs tracking-widest">
                  Our Promise
                </h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>✓ Fully biodegradable</li>
                  <li>✓ Plastic-free packaging</li>
                  <li>✓ Hypoallergenic materials</li>
                  <li>✓ Sustainably sourced</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#6aab7e] mb-3 uppercase text-xs tracking-widest">
                  Materials
                </h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>🌿 Bamboo Fibre</li>
                  <li>🌲 Wood Fibre</li>
                  <li>🌽 Corn Fibre</li>
                  <li>🍌 Banana Fibre</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs">
              © {new Date().getFullYear()} Sthriyah. All rights reserved. Gentle on you. Kind to
              Earth.
            </div>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
