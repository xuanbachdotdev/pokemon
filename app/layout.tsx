import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokemon',
  description: 'hmmmmmmmmmmm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} scroll-smooth leading-6 overflow-y-visible overflow-x-hidden text-xl bg-black`}>{children}</body>
    </html>
  )
}
