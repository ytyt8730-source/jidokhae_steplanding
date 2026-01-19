import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Share2, Check, ArrowRight } from 'lucide-react'
import { TARGET_DATE, GOOGLE_FORM_URL, CONTACT_PHONE } from '../lib/constants'

function StickyBottomBar() {
  const [daysLeft, setDaysLeft] = useState(0)
  const [isExpired, setIsExpired] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function calculateDays() {
      const now = new Date().getTime()
      const difference = TARGET_DATE - now

      if (difference <= 0) {
        return { days: 0, expired: true }
      }

      // Math.floor to match Hero countdown exactly
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        expired: false
      }
    }

    const result = calculateDays()
    setDaysLeft(result.days)
    setIsExpired(result.expired)

    const timer = setInterval(() => {
      const result = calculateDays()
      setDaysLeft(result.days)
      setIsExpired(result.expired)
    }, 60000)

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  async function handleShare() {
    const shareData = {
      title: '지독해 2026 스탭 모집',
      text: '책으로 연결되는 곳, 지독해 운영진에 도전하세요!',
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Gradient fade */}
          <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-dark to-transparent pointer-events-none" />

          <div className="bg-black/70 backdrop-blur-md border-t border-white/10 px-4 py-4 safe-bottom">
            <div className="max-w-lg mx-auto flex flex-row items-center gap-2">
              {/* Contact Button */}
              <motion.a
                href={`tel:${CONTACT_PHONE}`}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-dark-elevated border border-dark-border hover:border-neon/30 transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary" />
              </motion.a>

              {/* Share Button */}
              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-dark-elevated border border-dark-border hover:border-neon/30 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Apply Button with Gradient & Pulsing Glow */}
              <motion.a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 group relative overflow-hidden rounded-xl shadow-lg shadow-orange-500/50 animate-pulse-glow"
              >
                <div className="relative flex flex-row items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm sm:text-base py-3 sm:py-4 px-3 sm:px-6 rounded-xl">
                  <span className="whitespace-nowrap">합류하기 🚀</span>
                  <span className="whitespace-nowrap flex items-center text-xs sm:text-sm bg-white/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg font-bold">
                    {isExpired ? 'Ended' : daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyBottomBar
