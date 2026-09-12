'use client'

import { useMemo, useState } from 'react'
import ItemCard from '@/components/ItemCard'
import CartDrawer from '@/components/CartDrawer'
import { supabase } from '@/lib/supabaseClient'

export default function MenuClient({ restaurant, restaurantId, tableId }) {
  const [activeCategory, setActiveCategory] = useState(restaurant.categories[0].name)
  const [cart, setCart] = useState({}) // { [itemId]: quantity }
  const [cartOpen, setCartOpen] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)

  const allItems = useMemo(
    () => restaurant.categories.flatMap((c) => c.items),
    [restaurant]
  )

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, quantity]) => ({
          item: allItems.find((i) => i.id === Number(id)),
          quantity,
        })),
    [cart, allItems]
  )

  const total = cartItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)
  const itemCount = cartItems.reduce((sum, { quantity }) => sum + quantity, 0)

  function addItem(id) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  function removeItem(id) {
    setCart((prev) => {
      const next = { ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }
      return next
    })
  }

  async function placeOrder() {
    setPlacing(true)

    const orderPayload = {
      restaurant_id: restaurantId,
      table_id: tableId,
      items: cartItems.map(({ item, quantity }) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
      })),
      total,
      status: 'pending',
    }

    if (!supabase) {
      // Demo mode: Supabase isn't configured yet (see README). We still
      // let you test the full flow instead of failing silently.
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
      // Reset for a fresh order after closing a completed one
      setCart({})
      setPlaced(false)
    }
  }

  const activeItems = restaurant.categories.find((c) => c.name === activeCategory)?.items ?? []

  return (
    <div className="min-h-screen bg-espresso pb-28">
      <header className="px-6 pb-6 pt-10 text-center">
        <h1 className="font-display text-[28px] font-semibold text-cream">{restaurant.name}</h1>
        <div className="mx-auto mt-3 h-px w-10 bg-gold/60" />
        <p className="mt-3 text-sm text-cream/50">Table {tableId}</p>
      </header>

      <nav className="sticky top-0 z-10 flex gap-6 overflow-x-auto bg-espresso/95 px-6 pb-3 pt-1 backdrop-blur-sm">
        {restaurant.categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`shrink-0 whitespace-nowrap pb-2 text-[15px] font-medium transition ${
              activeCategory === category.name
                ? 'border-b-2 border-gold text-cream'
                : 'border-b-2 border-transparent text-cream/40'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <main className="px-6 py-3">
        {activeItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={cart[item.id] || 0}
            onAdd={() => addItem(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </main>

      {itemCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-1/2 flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full bg-raspberry px-6 py-4 text-cream shadow-lg shadow-black/30"
        >
          <span className="text-sm font-medium">{itemCount} item{itemCount > 1 ? 's' : ''} added</span>
          <span className="font-display font-semibold">View cart · ₹{total}</span>
        </button>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        total={total}
        onPlaceOrder={placeOrder}
        placing={placing}
        placed={placed}
      />
    </div>
  )
}
