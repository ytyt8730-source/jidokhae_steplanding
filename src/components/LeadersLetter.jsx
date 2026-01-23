import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Team Members Data - Ready for real photos
const TEAM_MEMBERS = [
  {
    id: 'danmuji',
    name: '단무지',
    role: 'Leader',
    image: '/team/danmuji.jpg', // 실제 이미지 경로
    focusPosition: 'center', // center, top, bottom
    message: '혹시 지독해에서 누군가에게 따뜻한 미소를 지어주신 적이 있나요?! 우리는 바로 \'당신\'을 기다리고 있습니다.',
  },
  {
    id: 'doban',
    name: '도반',
    role: 'Operation Lead',
    image: '/team/doban.jpg',
    focusPosition: 'center',
    message: '주말에는 연락 안하는 사람이 좋습니다~~^^ 그만큼 부담 갖지 않으셔도 돼용~ 제가 든든하게 받쳐드릴게용~ >_^',
  },
  {
    id: 'wowa',
    name: '우와',
    role: 'Planning Lead',
    image: '/team/wowa.jpg',
    focusPosition: 'center',
    message: '함께한 모임의 흔적들을 기록하실 분을 찾아요! 우리가 나눈 추억을 기록하다보면, 뭉클하기도 뿌듯하기도 하답니다. 이 순간을 함께하며 추억 만큼의 마음을 나눌 사람을 찾아요!.',
  },
  {
    id: 'danggeun',
    name: '당근',
    role: 'HR Lead',
    image: '/team/danggeun.jpg',
    focusPosition: 'center',
    message: '[ 헤매는 만큼이 내 땅이다 ! ] 라는 말이 있죠 ? 2026년 색다른 즐거움과 경험을 원하신다면 지금 바로 냉큼 ! 신청하세요 ! 저희와 함께 즐거운 땅따먹기(?) 하실 분을 기다리고 있습니다 🫶🏻',
  },
  {
    id: 'wooje',
    name: '우제',
    role: 'Community Manager',
    image: '/team/wooje.jpg',
    focusPosition: 'center',
    message: '새롭고 특별한 경험을 하고 싶으신분 추천 !! 자신의 성장에도 여러모로 도움이 되니 다양한 활동을 좋아하신다면 도전해보셔도 좋을것 같습니다 😊',
  },
  {
    id: 'ttaegu',
    name: '때구',
    role: 'Content Editor',
    image: '/team/ttaegu.jpg',
    focusPosition: 'center',
    message: '\'지독해 모두가 행복했으면 좋겠다\'라는 목표를 가지고 서로 협력하다가 뒤를 돌아보았더니 사람이 있었고 성장이 있었습니다. 함께 웃고, 울고, 돕고, 격려하고, 그렇게 신뢰가 쌓이며 어제의 나보다 성장하는 것 같습니다. 함께 해요!',
  },
]

// Focus position mapping
const getFocusClass = (position) => {
  switch (position) {
    case 'top': return 'object-top'
    case 'bottom': return 'object-bottom'
    default: return 'object-center'
  }
}

// Fallback initials for placeholder
const getInitials = (name) => name.charAt(0)

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    }
  })
}

function TeamCard({ member, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]">

        {/* Giant Quote Decoration - Artistic Background */}
        <span
          className="absolute -top-4 -right-2 text-[12rem] leading-none font-serif text-orange-500/[0.07] select-none pointer-events-none"
          aria-hidden="true"
        >
          "
        </span>

        {/* Hover Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content Layout: Image Left, Text Right */}
        <div className="relative flex gap-5 sm:gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Image Container with Shadow */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-lg shadow-black/30 ring-1 ring-white/10 group-hover:ring-orange-500/30 transition-all duration-300">
                <img
                  src={member.image}
                  alt={`${member.name} 프로필`}
                  className={`w-full h-full object-cover ${getFocusClass(member.focusPosition)} transition-transform duration-500 group-hover:scale-105`}
                  onError={(e) => {
                    // Fallback to placeholder on error
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback Placeholder (hidden by default) */}
                <div
                  className="w-full h-full bg-gradient-to-br from-orange-600 to-amber-600 items-center justify-center text-white text-2xl sm:text-3xl font-bold hidden"
                  style={{ display: 'none' }}
                >
                  {getInitials(member.name)}
                </div>
              </div>

              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full border-2 border-zinc-900 shadow-lg" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            {/* Name & Role */}
            <div className="mb-3 sm:mb-4">
              <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                {member.name}
              </h3>
              <p className="text-orange-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                {member.role}
              </p>
            </div>

            {/* Message */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              "{member.message}"
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function LeadersLetter() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Team Greetings
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
            운영진의 한마디
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            함께할 분들께 전하는 진심 어린 메시지
          </p>

          {/* Decorative line */}
          <motion.div
            className="mt-8 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.header>

        {/* Team Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LeadersLetter
