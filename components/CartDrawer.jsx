'use client'

import { NO_FLAVOR } from './ItemCard'

// This drawer doubles as the "review & edit cart" step — every line
// has its own ±  stepper (same icon-style control as the menu cards),
// so quantities and items can be adjusted right here without
// hunting back through the menu sections.
export default function CartDrawer({ open, onClose, cartItems, total, onAdd, onRemove, onPlaceOrder, placing, placed }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-md rounded-t-3xl bg-card px-6 pb-8 pt-6 text-ink sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold">Review your order</h2>
          <button onClick={onClose} className="text-muted" aria-label="Close cart">
            ✕
          </button>
        </div>

        {placed ? (
          <div className="py-8 text-center">
            <p className="text-lg font-bold">Order placed</p>
            <p className="mt-1 text-sm text-muted">The counter has been notified.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-accent px-6 py-2 text-sm font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">Your cart is empty.</p>
        ) : (
          <>
            <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
              {cartItems.map(({ item, flavor, quantity }) => (
                <div key={`${item.id}-${flavor}`} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    {flavor !== NO_FLAVOR && <p className="text-xs text-muted">{flavor}</p>}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-accent px-1 py-1">
                    <button
                      onClick={() => onRemove(item.id, flavor)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-accent"
                      aria-label={`Remove one ${item.name}${flavor !== NO_FLAVOR ? ` (${flavor})` : ''}`}
                    >
                      −
                    </button>
                    <span className="w-3 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => onAdd(item.id, flavor)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-accent"
                      aria-label={`Add one more ${item.name}${flavor !== NO_FLAVOR ? ` (${flavor})` : ''}`}
                    >
                      +
                    </button>
                  </div>

                  <span className="w-14 shrink-0 text-right font-semibold">₹{item.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="font-bold">Total</span>
              <span className="text-lg font-bold text-accent">₹{total}</span>
            </div>

            <button
              onClick={onPlaceOrder}
              disabled={placing}
              className="mt-5 w-full rounded-full bg-accent py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accentDark disabled:opacity-60"
            >
              {placing ? 'Placing order…' : 'Place order'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
