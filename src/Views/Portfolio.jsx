import React, { useEffect, useState, useCallback } from 'react'
import Card from './Layout/Card/Card'
import './Portfolio.css'
import './Layout/Navbar/Navbar.css'
import LandingText from './Custom/LandingText'
import TabViewSkills from './Custom/TabViewSkills'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import Icon from './Layout/Icons/Icon';
import { db } from '../utils/firebase'
import { ref, runTransaction, onValue } from 'firebase/database'
import Form from './Layout/Form/Form'
import DarkModeToggle from './Layout/Toggles/DarkModeToggle'
import { socialHandles, textContent } from './data'
import personalImage from '../Assets/personal-image.png'
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from 'framer-motion'
import ScrollRevealBox from './ScrollRevealBox'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default function Portfolio() {
  const [heartCounter, setHeartCounter]     = useState(0)
  const [experiences, setExperiences]       = useState({})
  const [blogs, setBlogs]                   = useState([])
  const [phrases, setPhrases]               = useState([])
  const [heroTitle, setHeroTitle]           = useState('FULL-STACK DEVELOPER')
  const [liked, setLiked]                   = useLocalStorage('liked', false)
  const [mode, setMode]                     = useLocalStorage('mode', 'dark')
  const [scrolled, setScrolled]             = useState(false)

  const toggleDarkMode = () => setMode(m => m === 'light' ? 'dark' : 'light')

  /* hero + tech crossfade — single scrollY source, no target bounding-box issues */
  const { scrollY } = useScroll()
  const heroContentOpacity     = useTransform(scrollY, [60,  320], [1, 0])
  const scrollIndicatorOpacity = useTransform(scrollY, [0,   80],  [1, 0])
  const techFadeIn             = useTransform(scrollY, [200, 480], [0, 1])
  const techHeadingX           = useTransform(techFadeIn, [0, 1], [-60, 0])

  /* scroll-driven skills tabs + single active-section tracker for all nav links */
  const [techTabIndex, setTechTabIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const techScrollProgress = useMotionValue(0)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const start = 500
    const range = window.innerHeight * 3
    const p = Math.min(1, Math.max(0, (y - start) / range))
    techScrollProgress.set(p)
    setTechTabIndex(Math.min(3, Math.floor(p * 4)))

    // Walk sections bottom-to-top; first one whose top is <= scrollY wins
    let next = y >= 400 && y < window.innerHeight * 5 ? 'technology' : ''
    for (const id of ['work', 'blogs', 'contact']) {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + y
        // contact gets a generous threshold since the page may not scroll past its top
        const threshold = id === 'contact' ? window.innerHeight * 0.55 : 80
        if (y >= top - threshold) next = id
      }
    }
    setActiveSection(next)
  })

  /* disable browser scroll restoration + navbar blur-on-scroll */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* firebase listeners */
  useEffect(() => {
    const heartRef       = ref(db, 'likeCounter/heart')
    const experiencesRef = ref(db, 'experiences')
    const blogsRef       = ref(db, 'blogs')
    const phrasesRef     = ref(db, 'landingPhrases')
    const heroTitleRef   = ref(db, 'heroTitle')

    const unsubHeart = onValue(heartRef, snap => {
      setHeartCounter(snap.val() || 0)
    }, err => console.error('Error fetching like count:', err))

    const unsubExp = onValue(experiencesRef, snap => {
      setExperiences(snap.val())
    }, err => console.error('Error fetching experiences:', err))

    const unsubBlogs = onValue(blogsRef, snap => {
      const val = snap.val()
      if (val) setBlogs(Object.values(val))
    }, err => console.error('Error fetching blogs:', err))

    const unsubPhrases = onValue(phrasesRef, snap => {
      const val = snap.val()
      if (val) setPhrases(Object.values(val))
    }, err => console.error('Error fetching landing phrases:', err))

    const unsubHeroTitle = onValue(heroTitleRef, snap => {
      if (snap.val()) setHeroTitle(snap.val())
    }, err => console.error('Error fetching hero title:', err))

    return () => { unsubHeart(); unsubExp(); unsubBlogs(); unsubPhrases(); unsubHeroTitle() }
  }, [])

  const openInNewTab = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const isDark = mode !== 'light'

  return (
    <div className={`portfolioContainer ${mode}`}>

      {/* ── NAVBAR ── */}
      <Navbar
        className={`navbar-settings${scrolled ? ' navbar-scrolled' : ''}`}
        fixed="top"
        expand="md"
      >
        <Container fluid className="nav-container-custom">
          <Navbar.Brand className={`nav-brand nav-brand-${mode}`}>
            Hassan Adnan
          </Navbar.Brand>

          {/* Mobile-only heart — always visible next to hamburger */}
          <button
            type="button"
            disabled={liked}
            className={`d-md-none mobile-heart-btn ms-auto ${liked ? `clearFormatting-${mode} likeDisabled` : `clearFormatting-${mode} likeEnabled`}`}
            onClick={() => {
              if (liked) return
              setLiked(true)
              runTransaction(ref(db, 'likeCounter/heart'), c => (c || 0) + 1)
                .then(({ snapshot }) => setHeartCounter(snapshot.val()))
                .catch(err => console.error('Error updating like count:', err))
            }}
          >
            {heartCounter}&nbsp;
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#e05555" style={{ verticalAlign: 'middle', marginBottom: '2px' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <div className="d-md-none">
            <DarkModeToggle darkMode={isDark} onToggle={toggleDarkMode} width={30} height={10} />
          </div>

          <Navbar.Toggle
            aria-controls="navbar-collapse"
            className="border-0"
          >
            <span className={`menu-${mode}`}>☰</span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto align-items-center">
              {[
                { to: 'technology', label: 'Tools'   },
                { to: 'work',       label: 'Work'    },
                { to: 'blogs',      label: 'Blogs'   },
                { to: 'contact',    label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link navbar-buttons nav-link-${mode}${activeSection === to ? ' active' : ''}`}
                  spy={false}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {label}
                </Link>
              ))}

              <Link
                className={liked ? 'nav-link navbar-buttons disabled d-none d-md-block' : 'nav-link navbar-buttons d-none d-md-block'}
                disabled={liked}
                onClick={() => {
                  if (liked) return
                  setLiked(true)
                  runTransaction(ref(db, 'likeCounter/heart'), c => (c || 0) + 1)
                    .then(({ snapshot }) => setHeartCounter(snapshot.val()))
                    .catch(err => console.error('Error updating like count:', err))
                }}
              >
                <button
                  type="button"
                  disabled={liked}
                  className={liked
                    ? `clearFormatting-${mode} likeDisabled`
                    : `clearFormatting-${mode} likeEnabled`}
                >
                  {heartCounter}&nbsp;
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e05555" style={{ verticalAlign: 'middle', marginBottom: '2px' }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </Link>

              <div className="d-none d-md-flex">
                <DarkModeToggle darkMode={isDark} onToggle={toggleDarkMode} width={30} height={10} />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ── HERO + TECH crossfade (single sticky viewport) ── */}
      <div className="hero-tech-container" id="me">
        <div className="hero-tech-sticky">

          {/* Hero layer — fades out on scroll */}
          <section className={`hero-layer hero hero-${mode}`}>
            <motion.div className="hero-right" style={{ opacity: heroContentOpacity }}>
              <span className="display-name">HASSAN</span>
              <span className="display-name dim">ADNAN</span>
              {heroTitle.split(' ').map((word, i) => (
                <span key={i} className="display-title">{word}</span>
              ))}
            </motion.div>

            <motion.div className="hero-photo-parallax" style={{ opacity: heroContentOpacity }}>
              <motion.div
                className="hero-photo-wrapper"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img src={personalImage} alt="Hassan Adnan" className="hero-photo" />
                <div className="hero-vignette" />
              </motion.div>
            </motion.div>

            <motion.div className="hero-left" style={{ opacity: heroContentOpacity }}>
              <span className="hero-mobile-title">{heroTitle}</span>
              <div className="hero-left-text">
                <LandingText mode={mode} phrases={phrases} />
              </div>
              <Link to="contact" smooth={true} duration={500} offset={-70}>
                <button className={`hero-cta${isDark ? '' : ' hero-cta-light'}`}>
                  LET'S CONNECT <span className="cta-dot">•</span>
                </button>
              </Link>
            </motion.div>

            <motion.div className="hero-scroll" style={{ opacity: scrollIndicatorOpacity }}>
              <span className={`scroll-text scroll-text-${mode}`}>Scroll</span>
              <div className="scroll-chevrons">
                {[0, 1, 2].map(i => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Tech layer — fades in behind hero as it disappears */}
          <motion.div className="tech-layer" style={{ opacity: techFadeIn }}>
            <motion.h2 className="tech-heading" style={{ x: techHeadingX }}>The Toolbox</motion.h2>
            <div className="blockCard">
              <Card
                verticalAlignedContent={
                  <TabViewSkills mode={mode} activeIndex={techTabIndex} scrollProgress={techScrollProgress} />
                }
                mode={mode}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── WORK / PROJECTS ── */}
      <div id="work">
        <ScrollRevealBox
          className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}
          xFrom={-60}
        >
          <h1 className="sectionHeader">{textContent.sectionHeaders.projects}</h1>
        </ScrollRevealBox>
        <div className="cards">
          {Object.values(experiences).map((item) => {
            const technologyIcons = item.technologyIcons.map((iconName) => (
              <Icon key={iconName} technologyIcon="true" name={iconName} title="" />
            ))
            return (
              <ScrollRevealBox key={item.id}>
                <Card
                  heading={item.title}
                  description={item.content}
                  technologyIcons={technologyIcons}
                  mode={mode}
                />
              </ScrollRevealBox>
            )
          })}
        </div>
      </div>

      {/* ── BLOGS ── */}
      <div id="blogs">
        <ScrollRevealBox
          className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}
          xFrom={-60}
        >
          <h1 className="sectionHeader">{textContent.sectionHeaders.blogs}</h1>
        </ScrollRevealBox>
        <div className="cards">
          {blogs.map((item) => {
            const technologyIcons = item.technologyIcons.map((iconName) => (
              <Icon key={iconName} technologyIcon="true" name={iconName} title="" />
            ))
            return (
              <ScrollRevealBox key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <a
                  className="clickableBlog"
                  href={item.linkToPost}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card
                    isBlogPost={true}
                    heading={item.title}
                    description={item.content}
                    technologyIcons={technologyIcons}
                    mode={mode}
                  />
                </a>
              </ScrollRevealBox>
            )
          })}
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact">
        <ScrollRevealBox
          className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}
          xFrom={-60}
        >
          <h1 className="sectionHeader">{textContent.sectionHeaders.contact}</h1>
        </ScrollRevealBox>
        <div className="cards">
          <ScrollRevealBox>
            <Form mode={mode} />
          </ScrollRevealBox>
          <ScrollRevealBox>
            <Card
              heading=""
              description={textContent.feedbackCard}
              bottomAlignedDescription={
                <>
                  {textContent.socialsText}
                  <br />
                  {socialHandles.map((s) => (
                    <a
                      key={s.id}
                      className="socials"
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${s.title}`}
                      style={{ display: 'inline-block', verticalAlign: 'middle' }}
                    >
                      <Icon technologyIcon="true" name={'sc-' + s.icon} title="" />
                    </a>
                  ))}
                </>
              }
              mode={mode}
            />
          </ScrollRevealBox>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div id="footer">
        <p className={`footerContent footer-${mode}`}>
          Made in React with&nbsp;
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#5ba8fa" style={{ verticalAlign: 'middle', marginBottom: '2px' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          &nbsp;by&nbsp;
          <button
            type="button"
            className="author"
            onClick={() => openInNewTab('https://www.linkedin.com/in/hassan-adnanpk/')}
          >
            Hassan Adnan
          </button>
        </p>
      </div>
    </div>
  )
}
