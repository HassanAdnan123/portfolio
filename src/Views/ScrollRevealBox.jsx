import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollRevealBox({
  children,
  yFrom = 45,
  xFrom = 0,
  inputStart = 'start 0.9',
  inputEnd = 'start 0.4',
  className,
  id,
  style,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [inputStart, inputEnd],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [yFrom, 0])
  const x = useTransform(scrollYProgress, [0, 1], [xFrom, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, ...style }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  )
}
