import { Nav } from '@/components/Nav'
import { DocsSidebar } from '@/components/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* subtle top glow */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-40" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="flex gap-12">
          <DocsSidebar />

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
