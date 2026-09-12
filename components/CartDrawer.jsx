'use client'

// Styled like a paper receipt handed over the counter — cream paper on
// the dark espresso backdrop, a torn top edge, itemized lines. This is
// a deliberate nod to the subject matter (an actual order slip), not
// decoration for its own sake.
export default function CartDrawer({ open, onClose, cartItems, total, onPlaceOrder, placing, placed }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center">
      <div className="relative w-full max-w-md">
        {/* torn-edge effect */}
        <svg viewBox="0 0 400 16" className="w-full text-cream" preserveAspectRatio="none">
          <path
            d="M0,16 L0,6 L20,14 L40,4 L60,12 L80,2 L100,10 L120,3 L140,13 L160,5 L180,11 L200,2 L220,12 L240,4 L260,14 L280,6 L300,12 L320,3 L340,11 L360,5 L380,13 L400,6 L400,16 Z"
            fill="currentColor"
          />
        </svg>

        <div className="bg-cream px-6 pb-8 pt-2 text-cocoa sm:rounded-b-md">
          <div className="mb-4 flex items-center justify-between border-b border-dashed border-cocoa/20 pb-3">
            <h2 className="font-display text-lg font-semibold">Your order</h2>
            <button onClick={onClose} className="text-cocoa/60" aria-label="Close cart">
              ✕
            </button>
          </div>

          {placed ? (
            <div className="py-8 text-center">
              <p className="font-display text-lg font-semibold">Order placed</p>
              <p className="mt-1 text-sm text-cocoa/60">The counter has been notified.</p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-raspberry px-6 py-2 text-sm font-medium text-cream"
              >
                Done
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <p className="py-8 text-center text-sm text-cocoa/60">Your cart is empty.</p>
          ) : (
            <>
              <div className="max-h-64 space-y-2.5 overflow-y-auto pr-1">
                {cartItems.map(({ item, quantity }) => (
                  <div key={item.id} className="flex items-baseline gap-2 text-sm">
                    <span>{item.name}</span>
                    <span className="text-cocoa/50">× {quantity}</span>
                    <span className="flex-1 border-b border-dotted border-cocoa/25 translate-y-[-2px]" />
                    <span className="shrink-0 font-medium">₹{item.price * quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-dashed border-cocoa/20 pt-4">
                <span className="font-display font-semibold">Total</span>
                <span className="font-display text-lg font-semibold text-raspberry">₹{total}</span>
              </div>

              <button
                onClick={onPlaceOrder}
                disabled={placing}
                className="mt-5 w-full rounded-full bg-raspberry py-3 text-sm font-medium text-cream shadow-sm transition hover:bg-raspberryDark disabled:opacity-60"
              >
                {placing ? 'Placing order…' : 'Place order'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
