import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function WobbleCard({
  children,
  containerClassName,
  className,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.02, 1.02, 1)`
          : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
        transition: 'transform 0.1s ease-out',
      }}
      className={cn(
        'relative rounded-3xl overflow-hidden',
        containerClassName
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,107,0,0.15),rgba(255,107,0,0))] sm:mx-0 sm:rounded-3xl overflow-hidden"
        style={{
          boxShadow: isHovering
            ? '0 25px 50px -12px rgba(255, 107, 0, 0.25)'
            : 'none',
        }}
      >
        <div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.02, 1.02, 1)`
              : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
            transition: 'transform 0.1s ease-out',
          }}
          className={cn('h-full', className)}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export default WobbleCard
