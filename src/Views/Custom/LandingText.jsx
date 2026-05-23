import { useState, useEffect, useRef } from 'react'
import './LandingText.css'

function useTypewriter(texts, { typeSpeed = 50, eraseSpeed = 28, pauseMs = 2600 } = {}) {
    const [displayText, setDisplayText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const [phase, setPhase] = useState('typing')
    const prevTextsRef = useRef(texts)

    // When the source array swaps (e.g. Firebase loads), erase current text first
    useEffect(() => {
        if (prevTextsRef.current !== texts && texts.length > 0) {
            prevTextsRef.current = texts
            setPhase('erasing')
            setTextIndex(texts.length - 1)
        }
    }, [texts])

    useEffect(() => {
        const text = texts[textIndex] ?? ''
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

const FALLBACK_PHRASES = [
    'Brewing something good...',
]

export default function LandingText({ mode, phrases }) {
    const activePhrases = phrases && phrases.length > 0 ? phrases : FALLBACK_PHRASES
    const text = useTypewriter(activePhrases)
    return (
        <span className={`tagline-typewriter tagline-typewriter-${mode}`}>
            {text}<span className="cursor-blink">_</span>
        </span>
    )
}
