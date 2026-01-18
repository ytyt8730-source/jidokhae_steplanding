import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'

const reviews = [
  {
    quote: '혼자 읽을 땐 몰랐던 문장을 발견했어요.',
    name: '새싹 멤버',
    role: '6개월차',
    emoji: '📖',
  },
  {
    quote: '매주 일요일이 기다려지는 이유!',
    name: '열혈 멤버',
    role: '1년차',
    emoji: '☀️',
  },
  {
    quote: '지독해 덕분에 1년에 50권을 읽었어요.',
    name: '독서광 멤버',
    role: '2년차',
    emoji: '🎯',
  },
  {
    quote: '좋은 사람들과 나누는 대화가 내 영감의 원천.',
    name: '열혈 멤버',
    role: '1년차',
    emoji: '💡',
  },
  {
    quote: '책 읽는 습관이 삶을 바꿨어요.',
    name: '새싹 멤버',
    role: '8개월차',
    emoji: '✨',
  },
  {
    quote: '여기서 만난 사람들이 진짜 보물이에요.',
    name: '고인물 멤버',
    role: '3년차',
    emoji: '💎',
  },
  {
    quote: '모임 후 느끼는 뿌듯함이 중독성 있어요.',
    name: '새싹 멤버',
    role: '4개월차',
    emoji: '🔥',
  },
  {
    quote: '같은 책도 다르게 읽는 게 신기해요.',
    name: '열혈 멤버',
    role: '1년차',
    emoji: '🌈',
  },
]

function VibeCheck() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center px-6 mb-12"
        >
          <span className="inline-block text-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Vibe Check
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            멤버들의 <span className="text-neon">생생한</span> 이야기
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            지독해와 함께한 순간들
          </p>
        </motion.div>

        {/* Infinite Scrolling Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InfiniteMovingCards
            items={reviews}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
        </motion.div>

        {/* Second row - opposite direction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4"
        >
          <InfiniteMovingCards
            items={[...reviews].reverse()}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default VibeCheck
