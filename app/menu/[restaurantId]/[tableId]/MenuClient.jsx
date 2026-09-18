'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react'
import ItemCard from '@/components/ItemCard'
import CartDrawer from '@/components/CartDrawer'
import SplashScreen from '@/components/SplashScreen'
import { supabase } from '@/lib/supabaseClient'

// Small placeholder for the restaurant logo, shown until a real logo
// file is uploaded and `logo` is set in data/menuData.js.
function LogoPlaceholder() {
  return (
    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-muted/40 bg-placeholderBg text-muted">
      <ImageIcon size={18} strokeWidth={1.5} />
    </div>
  )
}

export default function MenuClient({ restaurant, restaurantId, tableId }) {
  // Best Sellers is shown first — it's a virtual tab built from
  // `restaurant.bestSellers` refs (see data/menuData.js), not a real
  // category, so it never duplicates item data.
  const tabs = useMemo(
    () => ['Best Sellers', ...restaurant.categories.map((c) => c.name)],
    [restaurant]
  )
  const [activeCategory, setActiveCategory] = useState(tabs[0])
  // Cart is keyed by "itemId::flavor" since the same product can be
  // ordered in more than one flavor — e.g. Salankatia (Nutella) and
  // Salankatia (Mango) need to be tracked as separate cart lines.
  // Single-SKU items (no flavor picker) use the NO_FLAVOR constant.
  const [cart, setCart] = useState({}) // { "1::Nutella": quantity }
  const [cartOpen, setCartOpen] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)

  const allItems = useMemo(() => restaurant.categories.flatMap((c) => c.items), [restaurant])

  function cartKey(itemId, flavor) {
    return `${itemId}::${flavor}`
  }

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([key, quantity]) => {
          const [itemId, flavor] = key.split('::')
          return { item: allItems.find((i) => i.id === Number(itemId)), flavor, quantity }
        }),
    [cart, allItems]
  )

  const total = cartItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)
  const itemCount = cartItems.reduce((sum, { quantity }) => sum + quantity, 0)

  function addItem(itemId, flavor) {
    const key = cartKey(itemId, flavor)
    setCart((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
  }

  function removeItem(itemId, flavor) {
    const key = cartKey(itemId, flavor)
    setCart((prev) => ({ ...prev, [key]: Math.max((prev[key] || 0) - 1, 0) }))
  }

  function cartLinesFor(itemId) {
    return Object.entries(cart)
      .filter(([key, qty]) => key.startsWith(`${itemId}::`) && qty > 0)
      .map(([key, quantity]) => ({ flavor: key.split('::')[1], quantity }))
  }

  async function placeOrder() {
    setPlacing(true)

    const orderPayload = {
      restaurant_id: restaurantId,
      table_id: tableId,
      items: cartItems.map(({ item, flavor, quantity }) => ({
        id: item.id,
        name: item.name,
        flavor,
        price: item.price,
        quantity,
      })),
      total,
      status: 'pending',
    }

    if (!supabase) {
      console.log('Demo mode — order not saved. Would have sent:', orderPayload)
      await new Promise((r) => setTimeout(r, 600))
      setPlacing(false)
      setPlaced(true)
      return
    }

    const { error } = await supabase.from('orders').insert(orderPayload)

    setPlacing(false)
    if (error) {
      console.error(error)
      alert('Something went wrong placing your order. Please tell the staff directly.')
      return
    }
    setPlaced(true)
  }

  function closeCart() {
    setCartOpen(false)
    if (placed) {
      setCart({})
      setPlaced(false)
    }
  }

  // Best Sellers renders the same underlying items as their source
  // category (cart state is shared globally by itemId, so quantity
  // badges stay in sync everywhere that item appears) — each entry
  // just carries which flavor should be pre-selected.
  const isBestSellers = activeCategory === 'Best Sellers'
  const bestSellerCards = isBestSellers
    ? restaurant.bestSellers
        .map((ref) => ({ item: allItems.find((i) => i.id === ref.itemId), defaultFlavor: ref.flavor }))
        .filter((c) => c.item)
    : []
  const activeCategoryData = restaurant.categories.find((c) => c.name === activeCategory)
  const activeItems = isBestSellers ? [] : activeCategoryData?.items ?? []
  const cardBadge = activeCategoryData?.name === 'Newly Added' ? 'new' : null

  return (
    <div className="relative min-h-screen overflow-hidden bg-page pb-28">
      <SplashScreen logo={restaurant.logo} name={restaurant.name} />

      <header className="relative z-[2] bg-card px-5 pt-4 pb-3 shadow-sm">
        <div className="flex items-center gap-3">
          {restaurant.logo ? (
            <Image
              src={restaurant.logo}
              alt={`${restaurant.name} logo`}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 object-contain"
            />
          ) : (
            <LogoPlaceholder />
          )}
          <div className="min-w-0 text-left">
            <h1 className="truncate text-xl font-extrabold tracking-tight text-ink">{restaurant.name}</h1>
            {restaurant.tagline && (
              <p className="mt-0.5 truncate text-xs font-medium text-accent">{restaurant.tagline}</p>
            )}
          </div>
        </div>
        <div className="mt-2 text-center">
          <img
            src="/images/badge-tagline.svg"
            alt="India's First Egyptian Dessert"
            className="mx-auto h-auto w-36 opacity-90"
          />
          <p className="mt-1 text-[11px] text-muted">Table {tableId}</p>
        </div>
      </header>

      {/* Decorative background swirls — fixed to the viewport (not
          absolute) so they stay visible in the background the whole
          time someone is scrolling through the menu, instead of
          scrolling away after the first screen. Purely visual. */}
      <img
        src="/images/bg-swirl.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed -right-16 top-24 w-72 rotate-12 opacity-30"
      />
      <img
        src="/images/bg-swirl.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed -left-20 bottom-24 w-80 -scale-x-100 opacity-30"
      />

      {/* Tall water-drop graphic along the side wall of the screen —
          smaller/lighter on phone widths so it doesn't crowd the
          menu, full-size on tablet/desktop where there's more wall
          space. */}
      <img
        src="/images/side-wall-water.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-1/2 h-[45vh] w-auto -translate-y-1/2 opacity-15 lg:h-[75vh] lg:opacity-25"
      />

      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-page px-4 py-3">
        {tabs.map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveCategory(tabName)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition ${
              activeCategory === tabName
                ? 'bg-accent text-white'
                : 'bg-card text-ink'
            }`}
          >
            {tabName}
          </button>
        ))}
      </nav>

      <main className="relative z-[1] px-4 py-1">
        {isBestSellers
          ? bestSellerCards.map(({ item, defaultFlavor }) => (
              <ItemCard
                key={`${item.id}-${defaultFlavor}`}
                item={item}
                defaultFlavor={defaultFlavor}
                badge="bestseller"
                cartLines={cartLinesFor(item.id)}
                onAdd={(flavor) => addItem(item.id, flavor)}
                onRemove={(flavor) => removeItem(item.id, flavor)}
              />
            ))
          : activeItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                badge={cardBadge}
                cartLines={cartLinesFor(item.id)}
                onAdd={(flavor) => addItem(item.id, flavor)}
                onRemove={(flavor) => removeItem(item.id, flavor)}
              />
            ))}
      </main>

      {itemCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-1/2 z-30 flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full bg-accent px-6 py-4 text-white shadow-lg shadow-black/20"
        >
          <span className="text-sm font-medium">{itemCount} item{itemCount > 1 ? 's' : ''} added</span>
          <span className="font-bold">View cart · ₹{total}</span>
        </button>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        total={total}
        onAdd={addItem}
        onRemove={removeItem}
        onPlaceOrder={placeOrder}
        placing={placing}
        placed={placed}
      />
    </div>
  )
}
