import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const CANVAS_SIZE = 360
const MAX_TRAIL = 170
const MAX_POINTS = 110
const DOT_RADIUS = 9
const TRAIL_WIDTH = 15
// Trail colour runs from the head (blue) to the tail (purple)
const HEAD_RGB = [14, 165, 233]
const TAIL_RGB = [168, 85, 247]

const mixColor = (t: number) => {
  const c = HEAD_RGB.map((h, i) => Math.round(h + (TAIL_RGB[i] - h) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

// Four-point star, used for the sparkle at the end of the tail
const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = mixColor(1)
  ctx.shadowBlur = 8
  ctx.beginPath()
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI / 4) * i - Math.PI / 2
    const radius = i % 2 === 0 ? size : size * 0.28
    const px = x + Math.cos(angle) * radius
    const py = y + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

interface CursorLabel {
  text: string
  width: number
}

// Keyed by the value of a `data-cursor-label` attribute
const LABELS: Record<string, CursorLabel> = {
  open: { text: 'Open Link', width: 92 },
  resume: { text: 'Download Resume', width: 140 },
  read: { text: 'Read Article', width: 108 },
  email: { text: 'Say Hello', width: 92 },
  terminal: { text: 'Open Terminal', width: 120 },
}

interface Point {
  x: number
  y: number
}

export const SiteCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const label = labelRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!root || !label || !canvas || !ctx) return

    const finePointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let active = false
    let pointerX = 0
    let pointerY = 0
    let trail: Point[] = []
    let lastMove = 0

    // Trail is stored in page coordinates so it follows the content while scrolling
    const addPoint = (x: number, y: number) => {
      const head = trail[0]
      if (!head) {
        trail = [{ x, y }]
        return
      }
      const dx = x - head.x
      const dy = y - head.y
      const dist = Math.hypot(dx, dy)
      if (dist < 2) return
      const step = Math.min(dist, MAX_TRAIL)
      let from = head
      if (dist > MAX_TRAIL) {
        from = { x: x - (dx * step) / dist, y: y - (dy * step) / dist }
        trail = [from]
      }
      const segments = Math.ceil(step / 4)
      for (let i = 1; i <= segments; i += 1) {
        const t = i / segments
        trail.unshift({ x: from.x + (x - from.x) * t, y: from.y + (y - from.y) * t })
      }
      trail.length = Math.min(trail.length, MAX_POINTS)
      lastMove = performance.now()
    }

    const reset = () => {
      cancelAnimationFrame(raf)
      raf = 0
      active = false
      trail = []
      ctx.clearRect(-CANVAS_SIZE / 2, -CANVAS_SIZE / 2, CANVAS_SIZE, CANVAS_SIZE)
      canvas.style.opacity = '0'
      root.dataset.visible = 'false'
      root.dataset.label = ''
      document.documentElement.classList.remove('has-site-cursor')
    }

    const updateLabel = (target: Element | null) => {
      const key = target?.closest<HTMLElement>('[data-cursor-label]')?.dataset.cursorLabel
      const entry = key ? LABELS[key] : undefined
      const next = entry ? key! : ''
      if (root.dataset.label !== next) {
        root.dataset.label = next
        if (entry) {
          label.textContent = entry.text
          root.style.setProperty('--cursor-label-width', `${entry.width}px`)
        }
      }
      return entry?.width ?? 0
    }

    const frame = (now: number) => {
      raf = 0
      const target = document.elementFromPoint(pointerX, pointerY)
      if (!finePointer.matches || document.hidden || !target) {
        reset()
        return
      }

      root.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const px = Math.round(CANVAS_SIZE * dpr)
      if (canvas.width !== px || canvas.height !== px) {
        canvas.width = px
        canvas.height = px
      }
      const scale = px / CANVAS_SIZE
      ctx.setTransform(scale, 0, 0, scale, (CANVAS_SIZE / 2) * scale, (CANVAS_SIZE / 2) * scale)
      ctx.clearRect(-CANVAS_SIZE / 2, -CANVAS_SIZE / 2, CANVAS_SIZE, CANVAS_SIZE)

      const originX = pointerX + window.scrollX
      const originY = pointerY + window.scrollY
      let animating = false

      if (!active || reducedMotion.matches) {
        trail = [{ x: originX, y: originY }]
        canvas.style.opacity = '0'
      } else {
        trail[0] = { x: originX, y: originY }
        // Allowed trail length shrinks exponentially once the pointer stops
        const allowed = MAX_TRAIL * Math.exp(-Math.max(0, now - lastMove) / 80)
        let length = 0
        for (let i = 1; i < trail.length; i += 1) {
          const a = trail[i - 1]
          const b = trail[i]
          const seg = Math.hypot(b.x - a.x, b.y - a.y)
          if (length + seg > allowed) {
            const k = (allowed - length) / seg
            trail[i] = { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
            trail.length = i + 1
            length = allowed
            break
          }
          length += seg
        }

        if (length > 0.2 && trail.length > 1) {
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          let prev = trail[trail.length - 1]
          for (let i = trail.length - 2; i >= 0; i -= 1) {
            const p = trail[i]
            const before = trail[i - 1]
            const mid = before ? { x: (p.x + before.x) / 2, y: (p.y + before.y) / 2 } : p
            const t = (trail.length - 1 - i) / (trail.length - 1)
            ctx.globalAlpha = t
            ctx.strokeStyle = mixColor(1 - t)
            ctx.lineWidth = TRAIL_WIDTH * Math.sqrt(t)
            ctx.beginPath()
            ctx.moveTo(prev.x - originX, prev.y - originY)
            ctx.quadraticCurveTo(p.x - originX, p.y - originY, mid.x - originX, mid.y - originY)
            ctx.stroke()
            prev = mid
          }
          // Twinkling sparkles near the end of the tail
          const strength = Math.min(length / 40, 1)
          const twinkle = 0.6 + 0.4 * Math.sin(now / 70)
          const marks: [number, number][] = [
            [trail.length - 1, 7],
            [Math.floor((trail.length - 1) * 0.82), 4.5],
            [Math.floor((trail.length - 1) * 0.65), 3],
          ]
          for (const [idx, size] of marks) {
            const sp = trail[idx]
            drawSparkle(ctx, sp.x - originX, sp.y - originY, size * (0.7 + 0.5 * twinkle), strength * twinkle)
          }
          canvas.style.opacity = `${Math.min(length / 12, 1) * 0.9}`
          animating = true
        } else {
          trail.length = 1
          canvas.style.opacity = '0'
        }
      }

      // Keep the label pill inside the viewport
      const labelWidth = updateLabel(target)
      if (labelWidth) {
        const left = pointerX + DOT_RADIUS + 1 - labelWidth
        const top = pointerY - 29
        const clampedLeft = Math.min(Math.max(8, left), Math.max(8, window.innerWidth - labelWidth - 8))
        const clampedTop = Math.min(Math.max(8, top), Math.max(8, window.innerHeight - 25 - 8))
        root.style.setProperty('--cursor-label-offset-x', `${clampedLeft - left}px`)
        root.style.setProperty('--cursor-label-offset-y', `${clampedTop - top}px`)
      }

      root.dataset.visible = 'true'
      document.documentElement.classList.add('has-site-cursor')
      active = true
      if (animating) raf = requestAnimationFrame(frame)
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !finePointer.matches) {
        reset()
        return
      }
      pointerX = e.clientX
      pointerY = e.clientY
      if (!reducedMotion.matches) {
        for (const c of e.getCoalescedEvents?.() ?? []) {
          addPoint(c.clientX + window.scrollX, c.clientY + window.scrollY)
        }
        addPoint(pointerX + window.scrollX, pointerY + window.scrollY)
      }
      schedule()
    }
    const refresh = () => {
      if (active) schedule()
    }
    const onScroll = () => {
      if (active && !reducedMotion.matches) addPoint(pointerX + window.scrollX, pointerY + window.scrollY)
      refresh()
    }
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset()
    }
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') reset()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') reset()
    }
    const onVisibility = () => {
      if (document.hidden) reset()
    }

    finePointer.addEventListener('change', reset)
    reducedMotion.addEventListener('change', refresh)
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerMove, { passive: true })
    document.addEventListener('pointerout', onPointerOut)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointercancel', reset)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('resize', refresh)
    window.addEventListener('blur', reset)

    return () => {
      reset()
      finePointer.removeEventListener('change', reset)
      reducedMotion.removeEventListener('change', refresh)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerMove)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointercancel', reset)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('blur', reset)
    }
  }, [])

  return createPortal(
    <div className="site-cursor" ref={rootRef} aria-hidden="true">
      <canvas className="site-cursor__smear" ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <span className="site-cursor__label" ref={labelRef} />
      <span className="site-cursor__dot" />
    </div>,
    document.body,
  )
}
