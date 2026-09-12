'use client'

// A single menu row, styled like a line on a real menu board — name,
// a dotted leader, price — rather than a generic rounded card. The
// small green square-with-dot is the standard Indian "vegetarian"
// symbol customers will recognize.
export default function ItemCard({ item, quantity, onAdd, onRemove }) {
  return (
    <div className="border-b border-cream/10 py-4">
      <div className="flex items-baseline gap-2">
        <span
          className="inline-flex h-3.5 w-3.5 shrink-0 translate-y-[1px] items-center justify-center rounded-[3px] border-2 border-green-500"
          aria-label="Vegetarian"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        </span>
        <h3 className="font-display text-[17px] font-medium leading-snug text-cream">
          {item.name}
        </h3>
        <span className="flex-1 border-b border-dotted border-cream/25 translate-y-[-2px]" />
        <span className="shrink-0 font-medium text-gold">₹{item.price}</span>
      </div>

      <div className="mt-1.5 flex items-end justify-between gap-4 pl-5">
        <p className="text-sm leading-snug text-cream/55">{item.description}</p>

        <div className="shrink-0">
          {quantity > 0 ? (
            <div className="flex items-center gap-3 rounded-full border border-cream/20 px-1 py-1">
              <button
                onClick={onRemove}
                className="flex h-6 w-6 items-center justify-center rounded-full text-cream/80"
                aria-label={`Remove one ${item.name}`}
              >
                −
              </button>
              <span className="w-3 text-center text-sm font-medium text-cream">{quantity}</span>
              <button
                onClick={onAdd}
                className="flex h-6 w-6 items-center justify-center rounded-full text-cream/80"
                aria-label={`Add one more ${item.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="rounded-full border border-raspberry px-4 py-1.5 text-sm font-medium text-raspberry transition hover:bg-raspberry hover:text-cream"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
