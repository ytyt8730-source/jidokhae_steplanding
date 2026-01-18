import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardCheck, Lightbulb, Megaphone, ArrowUpRight } from 'lucide-react'
import { WobbleCard } from './ui/WobbleCard'

const roles = [
  {
    id: 'organizer',
    title: '진행 스탭',
    subtitle: 'Performer',
    icon: ClipboardCheck,
    copy: '어차피 매주 나오는 모임, 혜택받고 다니세요.',
    longCopy: '출석 체크부터 공간 세팅까지. 모임이 매끄럽게 흘러가도록 뒤에서 받쳐주는 든든한 지원군.',
    tags: ['출석왕', '정리정돈', '꼼꼼함'],
    borderColor: 'border-orange-500',
    glowColor: 'shadow-orange-500/20',
    iconBg: 'bg-orange-500/20 border-orange-500/30',
    size: 'large',
  },
  {
    id: 'questioner',
    title: '기획 스탭 · 토론',
    subtitle: 'Questioner',
    icon: Lightbulb,
    copy: '나라면 이런 질문을 던졌을 텐데!',
    longCopy: '책 속 깊은 질문을 발굴하고, 대화의 물꼬를 트는 토론의 촉진자.',
    tags: ['질문수집가', '토론덕후'],
    borderColor: 'border-yellow-500',
    glowColor: 'shadow-yellow-500/20',
    iconBg: 'bg-yellow-500/20 border-yellow-500/30',
    size: 'medium',
  },
  {
    id: 'storyteller',
    title: '기획 스탭 · 홍보',
    subtitle: 'Storyteller',
    icon: Megaphone,
    copy: '지독해 진짜 좋은데, 왜 모르지?',
    longCopy: '우리의 이야기를 세상에 전하고, 새로운 멤버들을 불러모으는 스토리텔러.',
    tags: ['인스타장인', '기록가'],
    borderColor: 'border-emerald-500',
    glowColor: 'shadow-emerald-500/20',
    iconBg: 'bg-emerald-500/20 border-emerald-500/30',
    size: 'medium',
  },
]

function RoleCard({ role, index }) {
  const Icon = role.icon

  return (
    <WobbleCard
      containerClassName={`h-full ${
        role.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`relative h-full bg-black/60 backdrop-blur-md ${role.borderColor} border rounded-3xl p-6 sm:p-8 flex flex-col shadow-lg ${role.glowColor} ${
        role.size === 'large' ? 'min-h-[320px] sm:min-h-[400px]' : 'min-h-[280px]'
      }`}>
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

        {/* Icon */}
        <div className={`relative w-14 h-14 ${role.iconBg} border rounded-2xl flex items-center justify-center mb-6`}>
          <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="relative flex-grow">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{role.title}</h3>
              <p className="text-gray-400 text-sm">{role.subtitle}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="text-neon font-medium text-lg mt-4 mb-2">
            "{role.copy}"
          </p>

          <p className="text-gray-200 leading-relaxed mb-6">
            {role.longCopy}
          </p>
        </div>

        {/* Tags */}
        <div className="relative flex flex-wrap gap-2 mt-auto">
          {role.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </WobbleCard>
  )
}

function RecruitmentRoles() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="roles" ref={sectionRef} className="py-24 sm:py-32 bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block text-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Open Positions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            어떤 역할이 있나요?
          </h2>
        </motion.div>

        {/* Storytelling Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            당신의 <span className="text-neon font-medium">사소한 습관</span>이
            <br className="sm:hidden" /> 우리의 <span className="text-white font-medium">큰 힘</span>이 됩니다.
          </p>
        </motion.div>

        {/* Bento-style Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={role.size === 'large' ? 'lg:col-span-1 lg:row-span-1' : ''}
            >
              <RoleCard role={role} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted text-sm">
            어떤 역할이든, 함께하는 것 자체가 우리에겐 큰 의미예요 ✨
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default RecruitmentRoles
