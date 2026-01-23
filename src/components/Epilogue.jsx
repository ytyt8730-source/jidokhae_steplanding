import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Sparkles, ChevronUp } from 'lucide-react'
import { GOOGLE_FORM_URL } from '../lib/constants'

// Starlight Highlight - Enhanced with better glow
const Highlight = ({ children }) => (
  <span className="text-lime-300 font-semibold drop-shadow-[0_0_10px_rgba(190,242,100,0.5)] drop-shadow-md">
    {children}
  </span>
)

// Letter Content
const LETTER_CONTENT = {
  trigger: {
    main: '당신이 이곳에 닿은 것은, 단순한 우연이 아닙니다.',
    sub: '📩 지독해의 초대장 열어보기',
  },
  header: 'To. 2026년, 새로운 궤도를 함께할 당신에게',
  signature: 'From. 당신을 기다리는 지독해 올림',
}

// Letter paragraphs with highlights - Each as separate element for stagger
const LETTER_PARAGRAPHS = [
  <p key={0}>우주에는 수많은 별이 있지만, 서로 연결될 때 비로소 <Highlight>'별자리'</Highlight>라는 이름을 갖게 됩니다.</p>,
  <p key={1}>안녕하세요, 지독해입니다.<br />3년 전, 단 4개의 작은 빛으로 시작했던 우리는<br />어느새 1,980명의 이야기가 교차하는 <Highlight>거대한 궤도</Highlight>가 되었습니다.</p>,
  <p key={2}>우리는 알고 있습니다.<br />누구나 혼자서도 충분히 빛나는 사람이라는 것을요.<br />하지만 어떤 성장은 혼자가 아닌, <Highlight>'함께'</Highlight>일 때만 가능합니다.</p>,
  <p key={3}>혼자 읽으면 나만의 지식이 되지만,<br />함께 나누면 서로의 세상을 넓히는 <Highlight>영감</Highlight>이 됩니다.<br />지독해는 그 확장의 순간을 함께할 파트너로 당신을 기다리고 있습니다.</p>,
  <p key={4}>화려한 스펙이나 경력? 그런 건 중요하지 않습니다.<br />우리가 찾는 건 <Highlight>'함께의 가치'</Highlight>를 아는 태도입니다.</p>,
  <p key={5}>좋은 문장을 보면 나누고 싶은 마음,<br />타인의 이야기에 귀 기울일 줄 아는 <Highlight>다정함</Highlight>.<br />그것이 우리가 생각하는 최고의 능력입니다.</p>,
  <p key={6}>단무지, 도반, 우와, 때구, 우제, 당근. 든든한 동료들이 당신 곁에서 함께하겠습니다.<br />2026년, 우리와 함께 <Highlight>더 넓은 궤도</Highlight>를 그려보지 않으시겠습니까?</p>,
]

// ═══════════════════════════════════════════════════════════════
// ANIMATION VARIANTS - Cinematic Slow Motion
// ═══════════════════════════════════════════════════════════════

// Letter container - Opens slowly, then reveals children with long stagger
const letterContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      // SLOW MOTION: Wait 0.5s, then 1.5s between each paragraph
      delayChildren: 0.5,
      staggerChildren: 1.5,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.5 }
  }
}

// Each paragraph/item - Slow fade in with float up
const paragraphVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2, // Slow 1.2s fade
      ease: [0.16, 1, 0.3, 1],
    }
  }
}

// Trigger button exit - Smooth fade out before letter opens
const triggerExitVariants = {
  initial: { opacity: 1, scale: 1, y: 0 },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    filter: 'blur(8px)',
    transition: {
      duration: 0.5, // Smooth 0.5s exit
      ease: 'easeOut'
    }
  }
}

function Epilogue() {
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Handle button click with tactile feedback
  const handleOpenLetter = () => {
    setIsLetterOpen(true)
  }

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 bg-dark relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-zinc-950 to-dark" />

        {/* Floating light orbs */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-lime-500/[0.03] rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-emerald-500/[0.02] rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 z-10">
        {/* ═══════════════════════════════════════════════════════════════
            TRIGGER BUTTON - Fixed visibility, breathing glow, tactile click
        ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {!isLetterOpen && (
            <motion.div
              key="trigger"
              variants={triggerExitVariants}
              initial="initial"
              animate="initial"
              exit="exit"
              className="flex flex-col items-center text-center"
            >
              {/* Main trigger text */}
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-extralight text-white/80 mb-12 leading-relaxed tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {LETTER_CONTENT.trigger.main}
              </motion.p>

              {/* Glass Capsule Trigger Button - FIXED */}
              <motion.button
                onClick={handleOpenLetter}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} // Tactile click feedback
                className="group relative z-20 cursor-pointer"
              >
                {/* Breathing glow ring - Always visible */}
                <motion.div
                  className="absolute -inset-2 rounded-full opacity-70"
                  animate={{
                    boxShadow: [
                      '0 0 20px 5px rgba(132,204,22,0.15)',
                      '0 0 35px 10px rgba(163,230,53,0.25)',
                      '0 0 20px 5px rgba(132,204,22,0.15)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Glass Capsule Button */}
                <motion.div
                  className="relative flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-10 py-5 border border-lime-500/40"
                  animate={{
                    borderColor: ['rgba(132,204,22,0.4)', 'rgba(163,230,53,0.7)', 'rgba(132,204,22,0.4)'],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Mail className="w-5 h-5 text-lime-400" />
                  <span className="text-lg font-medium text-white/90 select-none">
                    {LETTER_CONTENT.trigger.sub}
                  </span>
                  <Sparkles className="w-4 h-4 text-lime-400/60" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════════
            LETTER CONTAINER - Cinematic Slow Motion Text Reveal
        ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {isLetterOpen && (
            <motion.div
              key="letter"
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Premium Glass Card */}
              <div className="relative bg-gradient-to-b from-gray-900/80 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_-10px_rgba(132,204,22,0.15)]">

                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-lime-500/20 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-lime-500/20 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-lime-500/20 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-lime-500/20 rounded-br-3xl" />

                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-lime-500/[0.02] via-transparent to-transparent pointer-events-none" />

                {/* Letter Header with Gradient Text */}
                <motion.div variants={paragraphVariants} className="mb-10 relative">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-wide bg-gradient-to-r from-lime-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
                    {LETTER_CONTENT.header}
                  </h2>
                  <motion.div
                    className="mt-5 h-px w-32 bg-gradient-to-r from-lime-500/60 via-emerald-400/40 to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>

                {/* Letter Body - SLOW Staggered Reveal (1.5s per paragraph) */}
                <div className="space-y-7 text-white/75 text-base sm:text-lg leading-[1.95] font-light">
                  {LETTER_PARAGRAPHS.map((paragraph, idx) => (
                    <motion.div
                      key={idx}
                      variants={paragraphVariants}
                    >
                      {paragraph}
                    </motion.div>
                  ))}
                </div>

                {/* Signature - Appears after all paragraphs */}
                <motion.div
                  variants={paragraphVariants}
                  className="mt-14 pt-8 border-t border-white/5"
                >
                  <p className="text-center text-gray-400/80 text-base sm:text-lg italic tracking-widest font-light">
                    {LETTER_CONTENT.signature}
                  </p>
                </motion.div>

                {/* CTA Button - Appears last */}
                <motion.div
                  variants={paragraphVariants}
                  className="mt-12 flex justify-center"
                >
                  <motion.a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group cursor-pointer"
                  >
                    {/* Soft glow behind button */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-orange-600/30 via-amber-500/40 to-orange-600/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Gradient Button */}
                    <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white font-semibold text-base py-4 px-10 rounded-full shadow-lg shadow-orange-500/20 transition-all duration-300">
                      <span>지독해 합류하기</span>
                      <span className="text-lg">🚀</span>
                    </div>
                  </motion.a>
                </motion.div>

                {/* Collapse Button */}
                <motion.button
                  variants={paragraphVariants}
                  onClick={() => setIsLetterOpen(false)}
                  className="mt-10 w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300 cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>편지 접기</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Epilogue
