import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vrushabh Vakhare',
  description: 'ASIC Physical Design Portfolio',
  generator: 'ASIC Physical Design Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
