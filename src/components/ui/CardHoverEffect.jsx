import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

export function HoverEffect({ items, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6', className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-neon/20 to-neon/5 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.content}
          </Card>
        </div>
      ))}
    </div>
  )
}

export function Card({ className, children }) {
  return (
    <div
      className={cn(
        'relative z-20 h-full w-full overflow-hidden rounded-2xl bg-dark-card border border-dark-border p-6 group-hover:border-neon/30 transition-colors duration-300',
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function CardTitle({ className, children }) {
  return (
    <h4 className={cn('text-xl font-bold text-white mb-2', className)}>
      {children}
    </h4>
  )
}

export function CardDescription({ className, children }) {
  return (
    <p className={cn('text-text-secondary leading-relaxed', className)}>
      {children}
    </p>
  )
}

export default HoverEffect
