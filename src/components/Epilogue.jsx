import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Feather } from 'lucide-react'

// 리더의 편지 내용 - 이곳에서 쉽게 수정 가능합니다
const LEADER_LETTER = `안녕하세요, 단무지입니다.

3년 전, 단 4개의 별이 모여 시작했습니다.
그 작은 빛들이 모여 어느새 1,980명의 독서가가 거쳐가고, 지금은 250명이 매주 반짝이는 거대한 궤도가 되었습니다.

우리는 모두 각자의 외로운 행성에서 살아가지만,
책이라는 중력을 통해 '지독해'라는 우주에서 만났으니까요.

혼자 읽으면 그저 활자일 뿐이지만, 함께 나누면 그것은 누군가의 밤을 밝히는 이정표가 되더라고요.
저는 2026년, 이 별들이 더 밝게 빛나도록 판을 깔아보려 합니다.

거창한 능력은 필요 없습니다.
좋은 문장을 보면 나누고 싶어 안달이 나는 마음, 어색해하는 신입 회원에게 먼저 웃어줄 수 있는 다정함,
그거면 됩니다.

저 단무지와 도반, 우와 팀장님도 당신 옆에서 함께 뒹굴고 웃으며 함께 만들어가겠습니다.
준비된 재미를 그저 즐기는 게 아니라, 우리가 함께 왁자지껄 떠들며 세상에 없던 재미를 '같이' 지어보고 싶습니다.

우리의 이야기가 더 근사해질 수 있도록,
마지막 퍼즐 조각이 되어주세요.`

const SIGNATURE = '- 지독해 리더, 단무지 드림'

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

        {/* Final CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="https://forms.gle/WdTMC4QseoCPmP288"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            {/* Pulsing glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 animate-pulse transition-opacity" />

            {/* Button */}
            <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg py-5 px-10 rounded-xl shadow-2xl shadow-orange-500/30">
              <span>지독해 합류하기 🚀</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Epilogue
