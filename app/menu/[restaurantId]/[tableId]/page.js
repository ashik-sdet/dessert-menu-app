import menuData from '@/data/menuData'
import MenuClient from './MenuClient'

// This is a Server Component — it runs on the server, reads the URL
// params, and looks up the restaurant. Notice there's no separate
// backend server to run here, unlike the earlier Express version:
// Next.js lets a single project have both server-side and client-side
// code, which is the main thing that makes this stack simpler day to day.
export default function MenuPage({ params }) {
  const { restaurantId, tableId } = params
  const restaurant = menuData[restaurantId]

  if (!restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-xl font-semibold text-cocoa">Restaurant not found</h1>
          <p className="mt-2 text-sm text-cocoaLight">
            No menu exists for &quot;{restaurantId}&quot;.
          </p>
        </div>
      </div>
    )
  }

  return <MenuClient restaurant={restaurant} restaurantId={restaurantId} tableId={tableId} />
}
