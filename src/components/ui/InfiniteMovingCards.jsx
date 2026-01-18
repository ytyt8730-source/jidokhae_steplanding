import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}) {
  const containerRef = useRef(null)
  const scrollerRef = useRef(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  function getDirection() {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards')
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse')
      }
    }
  }

  function getSpeed() {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[300px] sm:w-[350px] max-w-full relative rounded-2xl flex-shrink-0 group"
          >
            <div className="relative h-full">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon/30 to-neon-light/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

              {/* Card */}
              <div className="relative h-full bg-dark-card border border-dark-border rounded-2xl px-6 py-5 group-hover:border-neon/30 transition-colors">
                {/* Quote */}
                <p className="text-text-secondary leading-relaxed text-[15px] mb-4">
                  "{item.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-dark-elevated flex items-center justify-center text-sm">
                    {item.emoji}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-text-muted text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes scroll {
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear infinite var(--animation-direction, forwards);
        }
      `}</style>
    </div>
  )
}

export default InfiniteMovingCards
