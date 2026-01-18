import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, BookOpen, Users, Award, Check } from 'lucide-react'

const benefits = [
  {
    id: 'bean',
    icon: Sparkles,
    title: '참가콩 무료',
    description: '의무 참여 시 참가비가 면제됩니다',
    highlight: true,
  },
  {
    id: 'book',
    icon: BookOpen,
    title: '도서 30~50% 할인',
    description: '스텝 전용 도서 구매 할인 혜택',
    highlight: false,
  },
  {
    id: 'party',
    icon: Users,
    title: '운영진 전용 회식 & MT',
    description: '팀 빌딩 활동과 네트워킹 기회',
    highlight: false,
  },
  {
    id: 'leadership',
    icon: Award,
    title: '함께 성장하는 리더십 경험',
    description: '직접 모임을 기획하고 운영하며 얻는 값진 경험과 네트워킹',
    highlight: false,
  },
]

function Benefits() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark-card">
      <div className="max-w-4xl mx-auto px-6">
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
            스텝이 되면?
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            함께하는 분들께 드리는 특별한 혜택
          </p>
        </motion.div>

        {/* Benefits List */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex items-center gap-5 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:bg-dark-elevated ${
                  benefit.highlight ? 'bg-dark-elevated' : 'bg-transparent'
                }`}
              >
                {/* Highlight indicator */}
                {benefit.highlight && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-neon rounded-r-full shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  benefit.highlight
                    ? 'bg-neon text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                    : 'bg-dark-elevated text-neon group-hover:bg-neon group-hover:text-white'
                }`}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {benefit.description}
                  </p>
                </div>

                {/* Check Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  benefit.highlight
                    ? 'bg-neon/20 text-neon'
                    : 'bg-dark-elevated text-text-muted group-hover:bg-neon/20 group-hover:text-neon'
                }`}>
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </motion.div>
            )
          })}
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
