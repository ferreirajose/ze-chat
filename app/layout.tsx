import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FilesModal } from "@/components/files-modal"
import { TranscriptionProvider } from "@/hooks/transcription-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aurora Transcrições",
  description: "Serviço de transcrição de áudio e vídeo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TranscriptionProvider>
              {children}
              <FilesModal />                
          </TranscriptionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
