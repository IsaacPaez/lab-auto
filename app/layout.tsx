// app/layout.tsx
import './globals.css'

// app/layout.tsx
export const metadata = {
  title: 'Laboratorio de automatización',
  description: 'Interfaz de monitorización de temperatura y nivel'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
