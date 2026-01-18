import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export function SparklesCore({
  id = 'sparkles',
  className,
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = '#FFF',
  particleColors = ['#FFF', '#FF6B00', '#FFB366'],
}) {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles = []
    const colors = particleColors.length > 0 ? particleColors : [particleColor]

    // Create particles
    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      })
    }

    let animationFrameId

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width
        if (particle.x > dimensions.width) particle.x = 0
        if (particle.y < 0) particle.y = dimensions.height
        if (particle.y > dimensions.height) particle.y = 0

        // Twinkle effect
        particle.twinklePhase += particle.twinkleSpeed
        const twinkle = (Math.sin(particle.twinklePhase) + 1) / 2
        const currentOpacity = particle.opacity * (0.3 + twinkle * 0.7)

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = currentOpacity
        ctx.fill()

        // Add glow effect for orange particles
        if (particle.color === '#FF6B00' || particle.color === '#FFB366') {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          )
          gradient.addColorStop(0, `rgba(255, 107, 0, ${currentOpacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(255, 107, 0, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions, maxSize, minSize, particleColor, particleColors, particleDensity])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      width={dimensions.width}
      height={dimensions.height}
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ background }}
    />
  )
}

export default SparklesCore
