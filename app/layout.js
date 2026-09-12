import './globals.css'

export const metadata = {
  title: 'Dessert Menu',
  description: 'Order desserts and cakes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
