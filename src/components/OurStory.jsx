import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'

const stats = [
  {
    title: '3 Years',
    description: '4명에서 시작한 여정',
    highlight: false,
  },
  {
    title: '1,980+',
    description: '지독해를 거쳐간 독서가들',
    highlight: true,
  },
  {
    title: '250 Crew',
    description: '지금 함께하는 멤버들',
    highlight: false,
  },
]

function OurStory() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            숫자로 보는 지독해
          </h2>
        </motion.div>

        {/* Bento Grid Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <BentoGrid>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <BentoGridItem
                  title={stat.title}
                  description={stat.description}
                  highlight={stat.highlight}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>

        {/* Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-dark-card border border-dark-border rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-transparent to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-neon to-transparent" />

            <div className="relative">
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed">
                이 거대한 흐름을 함께 이끌어갈
                <br />
                <span className="text-neon font-bold text-glow">3명</span>을 찾습니다
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OurStory
