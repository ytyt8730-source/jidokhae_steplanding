import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Accordion } from './ui/Accordion'

const faqs = [
  {
    question: '직장인이라 바쁜데 괜찮을까요?',
    answer:
      '물론이죠! 지독해 스탭 활동은 업무가 아니라 취미의 연장선입니다. 모임은 주 1회, 스탭 미팅은 월 1~2회 정도로 부담 없이 참여할 수 있어요. 바쁜 주에는 간단히 역할만 수행하면 됩니다. 오히려 일상에 활력을 주는 루틴이 될 거예요.',
  },
  {
    question: '디자인/기획 경험이 없어도 되나요?',
    answer:
      '열정만 있다면 OK! 전문 경험보다 중요한 건 책을 사랑하는 마음과 함께하고 싶은 의지예요. 기존 스텝들이 친절하게 온보딩해드리고, 템플릿과 가이드도 준비되어 있어요. 처음이라도 금방 적응할 수 있습니다.',
  },
  {
    question: '혜택은 바로 적용되나요?',
    answer:
      "네! 선발 즉시 모든 혜택이 적용됩니다. 활동비 지원부터 도서 할인, 운영진 회식까지 지독해의 '진짜' 식구가 되어 누려보세요.",
  },
]

function FAQ() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-neon text-sm font-semibold tracking-widest uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-text-secondary text-lg">
            궁금한 점이 있으신가요? 여기서 답을 찾아보세요.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqs} />
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-text-muted text-sm">
            더 궁금한 점이 있다면 언제든 연락주세요!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
