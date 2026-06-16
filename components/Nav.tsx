'use client'

import Link from 'next/link'
import { Github, Package } from 'lucide-react'

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm dark:bg-black/95 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm dark:bg-white dark:text-black">
            id
          </div>
          <span className="font-semibold text-base">safeids</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Abdul-Moiz31/safeids.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="https://www.npmjs.com/package/safeids"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors text-sm font-medium"
          >
            <Package size={16} />
            <span className="hidden sm:inline">npm</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
