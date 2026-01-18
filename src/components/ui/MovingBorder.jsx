import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

export function MovingBorder({
  children,
  duration = 2000,
  rx = '16px',
  ry = '16px',
  className,
  containerClassName,
  borderClassName,
  as: Component = 'button',
  ...otherProps
}) {
  const pathRef = useRef(null)
  const progress = useMotionValue(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength()
    if (length) {
      const pxPerMs = length / duration
      progress.set((time * pxPerMs) % length)
    }
  })

  const x = useTransform(progress, (val) => {
    const path = pathRef.current
    if (!path) return 0
    return path.getPointAtLength(val).x
  })

  const y = useTransform(progress, (val) => {
    const path = pathRef.current
    if (!path) return 0
    return path.getPointAtLength(val).y
  })

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <Component
      className={cn(
        'relative overflow-hidden p-[2px] bg-transparent',
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: rx }}
      >
        <svg
          className="absolute h-full w-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect
            ref={pathRef}
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
          />
        </svg>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'inline-block',
            transform,
          }}
        >
          <div
            className={cn(
              'h-20 w-20 bg-[radial-gradient(#FF6B00_40%,transparent_60%)] opacity-80',
              borderClassName
            )}
          />
        </motion.div>
      </div>
      <div
        className={cn(
          'relative z-10 bg-dark-card backdrop-blur-xl',
          className
        )}
        style={{ borderRadius: `calc(${rx} - 2px)` }}
      >
        {children}
      </div>
    </Component>
  )
}

export function GlowingButton({
  children,
  className,
  containerClassName,
  ...props
}) {
  return (
    <MovingBorder
      containerClassName={cn('rounded-2xl', containerClassName)}
      className={cn(
        'flex items-center justify-center gap-3 px-8 py-4 text-white font-semibold text-lg',
        className
      )}
      rx="16px"
      ry="16px"
      duration={3000}
      {...props}
    >
      {children}
    </MovingBorder>
  )
}

export default MovingBorder
