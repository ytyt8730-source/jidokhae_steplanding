import { cn } from '../../lib/utils'

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  highlight = false,
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border p-6 group transition-all duration-300 hover:border-neon/30',
        highlight && 'md:col-span-1 ring-1 ring-neon/20',
        className
      )}
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top accent line for highlight */}
      {highlight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-neon to-neon-light rounded-b-full" />
      )}

      <div className="relative z-10">
        {header && <div className="mb-4">{header}</div>}
        {icon && <div className="mb-4">{icon}</div>}
        <div className="text-center">
          <h3 className={cn(
            'text-4xl sm:text-5xl font-bold mb-2',
            highlight ? 'text-neon text-glow' : 'text-white'
          )}>
            {title}
          </h3>
          <p className="text-text-secondary text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BentoGrid
