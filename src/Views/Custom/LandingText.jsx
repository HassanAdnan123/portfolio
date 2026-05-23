import { useState, useEffect } from 'react'
import './LandingText.css'

function useTypewriter(texts, { typeSpeed = 50, eraseSpeed = 28, pauseMs = 2600 } = {}) {
    const [displayText, setDisplayText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const [phase, setPhase] = useState('typing')

    useEffect(() => {
        const text = texts[textIndex]
        if (phase === 'typing') {
            if (displayText.length < text.length) {
                const t = setTimeout(() => setDisplayText(text.slice(0, displayText.length + 1)), typeSpeed)
                return () => clearTimeout(t)
            } else {
                const t = setTimeout(() => setPhase('erasing'), pauseMs)
                return () => clearTimeout(t)
            }
        }
        if (phase === 'erasing') {
            if (displayText.length > 0) {
                const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), eraseSpeed)
                return () => clearTimeout(t)
            } else {
                setTextIndex(i => (i + 1) % texts.length)
                setPhase('typing')
            }
        }
    }, [displayText, phase, textIndex, texts, typeSpeed, eraseSpeed, pauseMs])

    return displayText
}

const PHRASES = [
    'Through clean code and strategic thinking, I build products that scale.',
    'Full-Stack developer with a passion for Java, Spring Boot & React.',
    'Turning complex requirements into elegant, scalable solutions.',
    'Building from idea to production — end to end.',
]

export default function LandingText({ mode }) {
    const text = useTypewriter(PHRASES)
    return (
        <span className={`tagline-typewriter tagline-typewriter-${mode}`}>
            {text}<span className="cursor-blink">_</span>
        </span>
    )
}
