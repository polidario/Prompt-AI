import '@assets/styles/theme.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Prompt AI',
  description: 'A Next.js 13 application created by Bernard Polidario',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
		<body>
			<Provider>
				<div className='main'>
					<div className='gradient'/>
				</div>

				<main className='app'>
					<Nav />
					{children}
				</main>
			</Provider>
		</body>
    </html>
  )
}
