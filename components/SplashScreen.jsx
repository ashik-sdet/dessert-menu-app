'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Shown once when the menu first loads: the logo zooms in from large
// to its normal size over ~1s, holds briefly, then fades out to
// reveal the menu underneath. Purely decorative — never blocks
// interaction for more than a beat, and unmounts itself entirely
// once finished so it can't get in the way later.
export default function SplashScreen({ logo, name }) {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 950)
    const removeTimer = setTimeout(() => setVisible(false), 1300)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible || !logo) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-page transition-opacity duration-300 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <Image
        src={logo}
        alt={name}
        width={170}
        height={170}
        priority
        className="h-40 w-40 origin-center animate-splash-zoom object-contain"
      />
    </div>
  )
}
