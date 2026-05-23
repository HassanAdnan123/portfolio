import { useState, useEffect } from 'react'
import './../Portfolio.css'
import './LandingText.css'

function useTypewriter(texts, { typeSpeed = 50, eraseSpeed = 50, multiTextDelay = 5000 } = {}) {
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
                const t = setTimeout(() => setPhase('erasing'), multiTextDelay)
                return () => clearTimeout(t)
            }
        }

        if (phase === 'erasing') {
            if (displayText.length > 0) {
                const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), eraseSpeed)
                return () => clearTimeout(t)
            } else {
                setTextIndex((i) => (i + 1) % texts.length)
                setPhase('typing')
            }
        }
    }, [displayText, phase, textIndex, texts, typeSpeed, eraseSpeed, multiTextDelay])

    return displayText
}

const TYPEWRITER_TEXTS = [
    '\u00A0I\'m a Full-Stack Developer.👨‍💻',
    'I hate bugs 🪲 both real and in software 🥲',
    'My dream is to write 100% clean code. 🥰',
    'Java & Javascript are my forte ❤️'
]

export default function LandingText() {
    const text = useTypewriter(TYPEWRITER_TEXTS, { typeSpeed: 50, eraseSpeed: 50, multiTextDelay: 5000 })

    return (
        <div>
            <h1 className='landingText'>
                <code> &lt;code&gt; </code>
                <br />
                <div className='indentedText'>
                    Hi! 👋 I am Hassan,
                    <span className='landingText' style={{ fontFamily: 'IBM Plex Sans', fontSize: '42px' }}>
                        {text}<span style={{ color: 'grey' }}>|</span>
                    </span>
                </div>
                <code> &lt;/code&gt; </code>
            </h1>
        </div>
    )
}
