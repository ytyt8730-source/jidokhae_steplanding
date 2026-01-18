/**
 * Common Framer Motion animation variants
 * 일관된 애니메이션을 위한 공통 variants 정의
 */

// Fade In Up (가장 많이 사용)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Fade In (단순 페이드)
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}

// Scale Up (호버/등장)
export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
}

// Stagger Container
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Stagger Item
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Hover Effects
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 }
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(255, 107, 0, 0.3)',
    borderColor: 'rgba(255, 107, 0, 0.5)'
  }
}

// Spring Physics
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
}

// Smooth Transition
export const smoothTransition = {
  duration: 0.3,
  ease: 'easeInOut'
}

/**
 * useInView 옵션 프리셋
 */
export const inViewOptions = {
  once: true,
  margin: '-100px'
}

/**
 * 순차 등장 딜레이 계산
 * @param {number} index - 아이템 인덱스
 * @param {number} baseDelay - 기본 딜레이 (초)
 * @returns {number} 계산된 딜레이
 */
export function getStaggerDelay(index, baseDelay = 0.1) {
  return index * baseDelay
}
