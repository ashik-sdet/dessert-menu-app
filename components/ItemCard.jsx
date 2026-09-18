'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon, Star, Sparkles } from 'lucide-react'

// Cart key for single-SKU items (no flavor picker) — kept as a
// constant so it's identical everywhere the item is referenced.
export const NO_FLAVOR = 'Regular'

// Small placeholder shown until a real product photo is uploaded.
// Once `item.image` is set (see data/menuData.js), this is swapped
// out automatically for the real photo below.
function ImagePlaceholder({ name }) {
  return (
    <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-muted/40 bg-placeholderBg text-muted">
      <ImageIcon size={22} strokeWidth={1.5} />
      <span className="px-1 text-center text-[9px] leading-tight">{name}</span>
    </div>
  )
}

// Corner ribbon shown on Best Seller / Newly Added cards.
function CornerBadge({ type }) {
  if (!type) return null
  if (type === 'bestseller') {
    return (
      <div className="badge-shine absolute -top-2 left-3 flex items-center gap-1 overflow-hidden rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-maroon shadow-[0_1px_4px_rgba(180,140,0,0.5)]">
        <Star size={10} className="fill-maroon text-maroon" />
        Best Seller
      </div>
    )
  }
  if (type === 'new') {
    return (
      <div className="absolute -top-2 left-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
        <Sparkles size={10} />
        New
      </div>
    )
  }
  return null
}

// Each product needs a flavor picked before it can be added — this
// replaces the earlier simple "Add" button since Sign Laban prices by
// product, not by flavor. Items with an empty `flavors` array (the
// "Newly Added" single-SKU products) skip the flavor picker entirely
// and use NO_FLAVOR as their cart key.
export default function ItemCard({ item, cartLines, onAdd, onRemove, badge, defaultFlavor }) {
  const hasFlavors = item.flavors.length > 0
  const [selectedFlavor, setSelectedFlavor] = useState(
    hasFlavors ? defaultFlavor || item.flavors[0] : NO_FLAVOR
  )

  const lineForSelectedFlavor = cartLines.find((l) => l.flavor === selectedFlavor)
  const selectedQuantity = lineForSelectedFlavor?.quantity || 0
  const totalQuantity = cartLines.reduce((sum, l) => sum + l.quantity, 0)

  // Most items have a separate photo per flavor — swap it in as the
  // customer taps between flavor pills. Falls back to item.image
  // (used for single-SKU items, or flavors that don't have their own
  // shot yet) and finally to the placeholder if neither exists.
  const displayImage = item.flavorImages?.[selectedFlavor] || item.image

  return (
    <div className="relative mb-4 mt-2 rounded-2xl bg-card p-3 shadow-sm">
      <CornerBadge type={badge} />

      <div className="flex gap-3">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={item.name}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 object-contain"
          />
        ) : (
          <ImagePlaceholder name={item.name} />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-ink">{item.name}</h3>
            <span className="shrink-0 text-sm font-bold text-accent">₹{item.price}</span>
          </div>

          {totalQuantity > 0 && (
            <p className="mt-0.5 text-xs text-muted">
              {totalQuantity} in cart{cartLines.length > 1 ? ` · ${cartLines.length} flavors` : ''}
            </p>
          )}

          {hasFlavors && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.flavors.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                    selectedFlavor === flavor
                      ? 'border-accent bg-accent text-white'
                      : 'border-gray-300 text-muted'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex justify-end">
        {selectedQuantity > 0 ? (
          <div className="flex items-center gap-3 rounded-full border border-accent px-1 py-1">
            <button
              onClick={() => onRemove(selectedFlavor)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-accent"
              aria-label={`Remove one ${item.name} (${selectedFlavor})`}
            >
              −
            </button>
            <span className="w-3 text-center text-sm font-medium text-ink">{selectedQuantity}</span>
            <button
              onClick={() => onAdd(selectedFlavor)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-accent"
              aria-label={`Add one more ${item.name} (${selectedFlavor})`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(selectedFlavor)}
            className="rounded-full border-2 border-accent bg-white px-4 py-1.5 text-xs font-bold tracking-wide text-accent transition hover:bg-accent hover:text-white"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  )
}
