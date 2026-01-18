import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  )
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="group relative">
      {/* Glow effect on hover/open */}
      <div
        className={cn(
          'absolute -inset-0.5 bg-gradient-to-r from-neon/20 to-neon-light/10 rounded-2xl blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        )}
      />

      <div className="relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden transition-colors group-hover:border-neon/20">
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
        >
          <span className="text-white font-medium text-lg pr-4">
            {item.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-colors',
                isOpen ? 'text-neon' : 'text-text-muted'
              )}
            />
          </motion.div>
        </button>

        {/* Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="pt-2 border-t border-dark-border">
                  <p className="text-text-secondary leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Accordion
