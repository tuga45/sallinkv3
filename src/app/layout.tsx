import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'AI Company - Transform Your Business with AI',
  description: 'Revolutionize your workflow with our cutting-edge artificial intelligence platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${notoSans.variable} font-sans bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}