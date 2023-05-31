import '@assets/styles/theme.css'

export const metadata = {
  title: 'Prompt AI',
  description: 'A Next.js 13 application created by Bernard Polidario',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
