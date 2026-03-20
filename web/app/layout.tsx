import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Heyama Objects',
  description: 'Gestion d\'objets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <a href="/" className="text-xl font-bold">Heyama Objects</a>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}