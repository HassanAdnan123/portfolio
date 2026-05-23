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
import { blogs, socialHandles, textContent } from './data'
import personalImage from '../Assets/personal-image.png'

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
  const [liked, setLiked]                   = useLocalStorage('liked', false)
  const [mode, setMode]                     = useLocalStorage('mode', 'dark')
  const [scrolled, setScrolled]             = useState(false)

  const toggleDarkMode = () => setMode(m => m === 'light' ? 'dark' : 'light')

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

    const unsubHeart = onValue(heartRef, snap => {
      setHeartCounter(snap.val() || 0)
    }, err => console.error('Error fetching like count:', err))

    const unsubExp = onValue(experiencesRef, snap => {
      setExperiences(snap.val())
    }, err => console.error('Error fetching experiences:', err))

    return () => { unsubHeart(); unsubExp() }
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

          <Navbar.Toggle
            aria-controls="navbar-collapse"
            className="border-0"
          >
            <span className={`menu-${mode}`}>☰</span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto align-items-center">
              {[
                { to: 'me',         label: 'About'    },
                { to: 'technology', label: 'Tools'    },
                { to: 'work',       label: 'Work'     },
                { to: 'blogs',      label: 'Blogs'    },
                { to: 'contact',    label: 'Contact'  },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  activeClass="active"
                  className={`nav-link navbar-buttons nav-link-${mode}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {label}
                </Link>
              ))}

              <Link
                className={liked ? 'nav-link navbar-buttons disabled' : 'nav-link navbar-buttons'}
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

              <DarkModeToggle darkMode={isDark} onToggle={toggleDarkMode} width={30} height={10} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ── HERO ── */}
      <section className={`hero hero-${mode}`} id="me">

        {/* Green atmospheric glow */}
        <div className="hero-glow" />

        {/* Display text — z-index 1, sits behind the photo */}
        <div className="hero-right">
          <span className="display-name">HASSAN</span>
          <span className="display-name dim">ADNAN</span>
          <span className="display-title">FULL-STACK</span>
          <span className="display-title">DEVELOPER</span>
        </div>

        {/* Profile photo — z-index 2 */}
        <div className="hero-photo-wrapper">
          <img
            src={personalImage}
            alt="Hassan Adnan"
            className="hero-photo"
          />
          <div className="hero-vignette" />
        </div>

        {/* Left content — z-index 3, always on top */}
        <div className="hero-left">
          <span className="hero-mobile-title">FULL-STACK DEVELOPER</span>
          <div className="hero-left-text">
            <LandingText mode={mode} />
          </div>
          <Link to="contact" smooth={true} duration={500} offset={-70}>
            <button className={`hero-cta${isDark ? '' : ' hero-cta-light'}`}>
              LET'S CONNECT <span className="cta-dot">•</span>
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className={`scroll-text scroll-text-${mode}`}>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── TOOLS & TECHNOLOGY ── */}
      <div className="blockCard" id="technology">
        <Card verticalAlignedContent={<TabViewSkills mode={mode} />} mode={mode} />
      </div>

      {/* ── WORK / PROJECTS ── */}
      <div id="work">
        <div className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}>
          <h1 className="sectionHeader">{textContent.sectionHeaders.projects}</h1>
        </div>
        <div className="cards">
          {Object.values(experiences).map((item) => {
            const technologyIcons = item.technologyIcons.map((iconName) => (
              <Icon key={iconName} technologyIcon="true" name={iconName} title="" />
            ))
            return (
              <Card
                key={item.id}
                heading={item.title}
                description={item.content}
                technologyIcons={technologyIcons}
                mode={mode}
              />
            )
          })}
        </div>
      </div>

      {/* ── BLOGS ── */}
      <div id="blogs">
        <div className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}>
          <h1 className="sectionHeader">{textContent.sectionHeaders.blogs}</h1>
        </div>
        <div className="cards">
          {blogs.map((item) => {
            const technologyIcons = item.technologyIcons.map((iconName) => (
              <Icon key={iconName} technologyIcon="true" name={iconName} title="" />
            ))
            return (
              <a
                key={item.id}
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
            )
          })}
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact">
        <div className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}>
          <h1 className="sectionHeader">{textContent.sectionHeaders.contact}</h1>
        </div>
        <div className="cards">
          <Form mode={mode} />
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
