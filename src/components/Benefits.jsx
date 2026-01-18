import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const benefits = [
  {
    id: 'activity',
    emoji: '💰',
    title: '정기모임 참가비, 얼마나 지원되나요?',
    summary: '클릭해서 확인하기',
    details: [
      '매주 모임을 챙기는 스탭님들의 부담을 0으로!',
      { label: '진행 스탭', value: '전액 무료' },
      { label: '기획 스탭', value: '50% 지원' },
    ],
  },
  {
    id: 'book',
    emoji: '📚',
    title: '책값 걱정 없이 마음껏 읽으세요',
    summary: '클릭해서 확인하기',
    details: [
      '지독해 멤버 특권! 도서 구매 시 30~50% 할인 적용.',
    ],
  },
  {
    id: 'growth',
    emoji: '🚀',
    title: '돈 주고도 못 사는 성장의 기회',
    summary: '클릭해서 확인하기',
    details: [
      '운영진 전용 네트워킹 (MT/회식)',
      '실전 커뮤니티 리더십 경험',
    ],
  },
]

function BenefitCard({ benefit, isOpen, onToggle, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      {/* Card Container */}
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isOpen
            ? 'bg-dark-elevated border-neon/30 shadow-[0_0_30px_rgba(255,107,0,0.1)]'
            : 'bg-dark-card border-dark-border hover:border-dark-border/80 hover:bg-dark-elevated/50'
        }`}
      >
        {/* Header - Always Visible */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-5 sm:p-6 text-left cursor-pointer"
        >
          {/* Emoji */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
              isOpen ? 'bg-neon/20 scale-110' : 'bg-dark-elevated group-hover:bg-dark-elevated/80'
            }`}
          >
            {benefit.emoji}
          </div>

          {/* Title & Summary */}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
            <p className="text-text-muted text-sm truncate">{benefit.summary}</p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen ? 'bg-neon/20 text-neon' : 'bg-dark-elevated text-text-muted group-hover:text-white'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {/* Details - Expandable */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                {/* Divider */}
                <div className="w-full h-px bg-dark-border mb-4" />

                {/* Details List */}
                <ul className="space-y-3">
                  {benefit.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neon mt-2" />
                      {typeof detail === 'string' ? (
                        <span className="text-gray-300 text-sm leading-relaxed">{detail}</span>
                      ) : (
                        <div className="text-sm">
                          <span className="text-neon font-medium">{detail.label}:</span>{' '}
                          <span className="text-gray-300">{detail.value}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Benefits() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark-card">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            스탭이 되면?
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            함께하는 분들께 드리는 특별한 혜택
          </p>
        </motion.div>

        {/* Accordion Benefits List */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              isOpen={openId === benefit.id}
              onToggle={() => handleToggle(benefit.id)}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Extra Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm">
            * 혜택은 활동 기간 및 참여도에 따라 달라질 수 있습니다
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits
