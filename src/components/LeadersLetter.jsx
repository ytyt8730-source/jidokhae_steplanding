import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

const leaders = [
  {
    id: 'doban',
    name: '도반',
    role: 'Performing Leader',
    emoji: '🐻',
    message: '주말에는 연락 안하는 사람이 좋습니다~~^^ 그만큼 부담 갖지 않으셔도 돼용~ 제가 든든하게 받쳐드릴게용~ >_^',
  },
  {
    id: 'wowa',
    name: '우와',
    role: 'Planning Leader',
    emoji: '🎨',
    message: '새로운 시도를 좋아하시는 분 환영하구요, 함께한 모임의 흔적들을 기록하실 분을 찾아요! 우리가 나눈 추억을 기록하다보면, 뭉클하기도 뿌듯하기도 하답니다. 저랑 쿵짝 맞춰서 재밌는 판 벌여봐요.',
  },
]

function LeaderCard({ leader, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <div className="relative bg-zinc-800 border border-zinc-700 rounded-3xl p-8 sm:p-10 overflow-hidden transition-all duration-300 hover:border-neon/40 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20">
        {/* Glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quote Icon */}
        <div className="absolute top-6 right-6 text-neon/10">
          <Quote className="w-16 h-16" fill="currentColor" />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Avatar & Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-600 rounded-2xl flex items-center justify-center text-3xl group-hover:border-neon/50 transition-colors">
                {leader.emoji}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-neon rounded-full border-2 border-zinc-800" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{leader.name}</h3>
              <p className="text-text-muted text-sm">{leader.role}</p>
            </div>
          </div>

          {/* Message */}
          <p className="text-text-secondary text-lg leading-relaxed">
            "{leader.message}"
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function LeadersLetter() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-neon text-sm font-semibold tracking-widest uppercase mb-4">
            From Our Leaders
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            팀장들의 한마디
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            함께할 분들께 전하는 진심 어린 메시지
          </p>
        </motion.div>

        {/* Leader Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {leaders.map((leader, index) => (
            <LeaderCard key={leader.id} leader={leader} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LeadersLetter
