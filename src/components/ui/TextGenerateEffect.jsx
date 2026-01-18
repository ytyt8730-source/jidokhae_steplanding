import { useEffect, useState } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '../../lib/utils'

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}) {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(' ')

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration,
        delay: stagger(0.1),
      }
    )
  }, [animate, duration, filter])

  return (
    <motion.div ref={scope} className={cn('font-bold', className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
          style={{
            filter: filter ? 'blur(10px)' : 'none',
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function TypewriterEffect({ words, className, cursorClassName }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(word.slice(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words])

  return (
    <span className={cn('inline-block', className)}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className={cn('inline-block w-[4px] h-[1em] bg-neon ml-1 align-middle', cursorClassName)}
      />
    </span>
  )
}

export default TextGenerateEffect
