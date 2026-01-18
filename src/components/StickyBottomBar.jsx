import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Share2, Check, ArrowRight } from 'lucide-react'

const TARGET_DATE = new Date('2026-01-25T23:59:59+09:00').getTime()
const GOOGLE_FORM_URL = 'https://forms.gle/WdTMC4QseoCPmP288'

function StickyBottomBar() {
  const [daysLeft, setDaysLeft] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function calculateDays() {
      const now = new Date().getTime()
      const difference = TARGET_DATE - now
      return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)))
    }

    setDaysLeft(calculateDays())

    const timer = setInterval(() => {
      setDaysLeft(calculateDays())
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
      title: '지독해 2026 스텝 모집',
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

          <div className="glass-dark border-t border-dark-border px-4 py-4 safe-bottom">
            <div className="max-w-lg mx-auto flex items-center gap-3">
              {/* Contact Button */}
              <motion.a
                href="tel:010-8470-8730"
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-dark-elevated border border-dark-border hover:border-neon/30 transition-colors"
              >
                <Phone className="w-5 h-5 text-text-secondary" />
              </motion.a>

              {/* Share Button */}
              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-dark-elevated border border-dark-border hover:border-neon/30 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-5 h-5 text-success" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Share2 className="w-5 h-5 text-text-secondary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Apply Button with Glow */}
              <motion.a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 group relative overflow-hidden rounded-xl"
              >
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon via-neon-light to-neon rounded-xl opacity-70 group-hover:opacity-100 blur-sm transition-opacity animate-pulse-glow" />

                <div className="relative flex items-center justify-center gap-3 bg-neon text-white font-semibold py-4 px-6 rounded-xl">
                  <span>지원하기</span>
                  <span className="flex items-center gap-1.5 text-sm bg-white/20 px-2.5 py-1 rounded-lg font-bold">
                    D-{daysLeft}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
