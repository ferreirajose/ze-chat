"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="flex items-center justify-end">
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
