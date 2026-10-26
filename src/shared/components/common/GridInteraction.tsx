import React, { useEffect, useRef } from 'react'

// Must match `.grid-bg` background-size in index.css
const CELL = 40
const RADIUS = 150
const PULL = 0.5
const STEP = 8
const RGB = '14, 165, 233'

// Draws a warped, glowing copy of the background grid around the pointer
export const GridInteraction: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const finePointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let width = 0
    let height = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let energy = 0
    let hasPointer = false
    let lastTime = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const clear = () => ctx.clearRect(0, 0, width, height)

    const frame = (now: number) => {
      raf = 0
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      // The warp centre lags the pointer a little, which gives the grid a soft, elastic feel
      const follow = 1 - Math.exp(-dt / 70)
      x += (targetX - x) * follow
      y += (targetY - y) * follow
      const moving = Math.hypot(targetX - x, targetY - y)
      energy = moving > 1 ? Math.min(1, energy + dt / 120) : Math.max(0, energy - dt / 900)

      clear()
      if (energy <= 0.01 && moving <= 1) return

      // The grid scrolls with the page, so line positions are offset by scroll
      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const warp = (px: number, py: number): [number, number, number] => {
        const dx = x - px
        const dy = y - py
        const d = Math.hypot(dx, dy)
        if (d >= RADIUS) return [px, py, 0]
        const t = 1 - d / RADIUS
        const k = t * t * PULL * (0.35 + 0.65 * energy)
        return [px + dx * k, py + dy * k, t]
      }

      const firstCol = Math.floor((x + scrollX - RADIUS) / CELL)
      const lastCol = Math.ceil((x + scrollX + RADIUS) / CELL)
      const firstRow = Math.floor((y + scrollY - RADIUS) / CELL)
      const lastRow = Math.ceil((y + scrollY + RADIUS) / CELL)

      ctx.lineCap = 'round'
      ctx.lineWidth = 1

      const strokeLine = (vertical: boolean, fixed: number) => {
        let prev: [number, number, number] | null = null
        for (let s = -RADIUS; s <= RADIUS + STEP; s += STEP) {
          const px = vertical ? fixed : x + s
          const py = vertical ? y + s : fixed
          const point = warp(px, py)
          if (prev) {
            const t = (prev[2] + point[2]) / 2
            if (t > 0) {
              ctx.strokeStyle = `rgba(${RGB}, ${(Math.pow(t, 1.1) * 0.7 * energy).toFixed(3)})`
              ctx.beginPath()
              ctx.moveTo(prev[0], prev[1])
              ctx.lineTo(point[0], point[1])
              ctx.stroke()
            }
          }
          prev = point
        }
      }

      for (let c = firstCol; c <= lastCol; c += 1) strokeLine(true, c * CELL - scrollX)
      for (let r = firstRow; r <= lastRow; r += 1) strokeLine(false, r * CELL - scrollY)

      // Bright nodes at the warped intersections
      for (let c = firstCol; c <= lastCol; c += 1) {
        for (let r = firstRow; r <= lastRow; r += 1) {
          const [nx, ny, t] = warp(c * CELL - scrollX, r * CELL - scrollY)
          if (t <= 0) continue
          ctx.fillStyle = `rgba(${RGB}, ${(t * 0.9 * energy).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(nx, ny, 1 + t * 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(frame)
    }

    const wake = () => {
      if (!raf) {
        lastTime = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches) return
      targetX = e.clientX
      targetY = e.clientY
      if (!hasPointer) {
        x = targetX
        y = targetY
        hasPointer = true
      }
      wake()
    }
    const onScroll = () => {
      if (hasPointer && energy > 0.01) wake()
    }
    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) hasPointer = false
    }

    resize()
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerout', onLeave)
    document.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerout', onLeave)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
}
