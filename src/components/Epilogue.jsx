import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Feather } from 'lucide-react'

// 리더의 편지 내용 - 이곳에서 쉽게 수정 가능합니다
const LEADER_LETTER = `안녕하세요, 단무지입니다.

지독해를 시작한 건 2021년, 겨울이었습니다.
네 명이서 조용히 시작한 모임이
어느새 수백 명의 독서가들이 거쳐간 커뮤니티가 되었어요.

우리는 단순히 책을 읽는 모임이 아닙니다.
책을 매개로 사람과 사람이 연결되고,
그 연결 속에서 서로의 삶에 작은 변화를 선물하는 곳이죠.

스텝이 된다는 건, 그 변화의 중심에 서는 거예요.
누군가의 일요일을 기다려지게 만들고,
누군가의 1년에 의미 있는 책 한 권을 더해주는 일.

부담 갖지 마세요.
저희가 든든하게 받쳐드릴게요.
즐겁게, 함께, 천천히.

2026년, 당신과 멋진 항해를 떠나고 싶습니다.`

const SIGNATURE = '- 리더 단무지 드림'

function Epilogue() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark relative overflow-hidden">
      {/* Subtle background texture effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6">
        {/* Decorative separator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <Feather className="w-8 h-8 text-neon/60 mb-4" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
        </motion.div>

        {/* Letter content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          {/* Letter body */}
          <p className="font-serif text-gray-300 text-lg sm:text-xl leading-relaxed whitespace-pre-line mb-10">
            {LEADER_LETTER}
          </p>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-serif italic text-gray-400 text-lg"
          >
            {SIGNATURE}
          </motion.p>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default Epilogue
