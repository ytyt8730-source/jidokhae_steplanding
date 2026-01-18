import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET_DATE = new Date('2026-01-25T23:59:59+09:00').getTime()

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const now = new Date().getTime()
    const difference = TARGET_DATE - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isExpired: false
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-dark-card border border-dark-border">
        <span className="text-white text-lg font-medium">모집이 마감되었습니다</span>
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: '일', key: 'days' },
    { value: timeLeft.hours, label: '시간', key: 'hours' },
    { value: timeLeft.minutes, label: '분', key: 'minutes' },
    { value: timeLeft.seconds, label: '초', key: 'seconds' },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-text-muted text-sm tracking-widest uppercase">
        마감까지
      </span>
      <div className="flex items-center gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.key} className="flex items-center gap-2 sm:gap-4">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-neon/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative bg-dark-card border border-dark-border rounded-xl px-4 py-4 sm:px-6 sm:py-5 min-w-[70px] sm:min-w-[90px] overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-neon/5 to-transparent" />

                {/* Number */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={unit.value}
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative block text-3xl sm:text-5xl font-bold text-white tabular-nums text-center"
                    style={{
                      textShadow: '0 0 20px rgba(255, 107, 0, 0.5), 0 0 40px rgba(255, 107, 0, 0.3)',
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Label */}
              <span className="block text-text-muted text-xs sm:text-sm mt-2 text-center font-medium">
                {unit.label}
              </span>
            </div>

            {/* Separator */}
            {index < timeUnits.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-neon text-2xl sm:text-3xl font-light mb-6"
                style={{ textShadow: '0 0 10px rgba(255, 107, 0, 0.5)' }}
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountdownTimer
