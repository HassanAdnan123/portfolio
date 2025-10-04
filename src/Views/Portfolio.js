import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Card from './Layout/Card/Card'
import DeveloperImage from './Custom/DeveloperImage'
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
import { projects, blogs, socialHandles, textContent } from './data'

const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [value, setValue] = useState(() => {
    // Check if a value exists in local storage
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update the value in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


export default function Portfolio() {

  const [heartCounter, setHeartCounter] = useState(0)
  const [experiences, setExperiences] = useState({})
  const [liked, setLiked] = useLocalStorage('liked', false);

  // Use localStorage for dark mode persistence
  const [mode, setMode] = useLocalStorage('mode', 'light');

  // Toggle function to switch between dark and light modes
  const toggleDarkMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const setLikedInLocalStorage = (event) => {
    setLiked(true);
  };

  useEffect(() => {
    // Subscribe to real-time like count updates
    const heartRef = ref(db, 'likeCounter/heart');
    const experiencesRef = ref(db, 'experiences');
    const unsubscribeHeart = onValue(heartRef, (snapshot) => {
      setHeartCounter(snapshot.val() || 0);
    }, (error) => {
      console.error('Error fetching like count:', error);
    });

    const unsubscribeExperiences = onValue(experiencesRef, (snapshot) => {
      setExperiences(snapshot.val());
      //console.log(experiences);
    }, (error) => {
      console.error('Error fetching experiences:', error);
    });

    return () => {
      unsubscribeHeart();
      unsubscribeExperiences();
    };
  }, [])

  const openInNewTab = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);







  return (
    <div className={`portfolioContainer ${mode}`}>
      <div className='navbar-container'>
        <Navbar className='navbar-settings' bg={mode} variant={mode} fixed="top" expand="md">
          <Container className={`nav-container nav-container-${mode}`}>
                <Navbar.Toggle aria-controls="navbar-collapse" aria-label="Toggle navigation"
              className={mode === 'dark' ? 'navbar-toggler-icon-dark' : 'navbar-toggler-icon-light'}
            > <span className={`menu-${mode}`} aria-hidden="true">☰</span> </Navbar.Toggle>
            <Navbar.Collapse id="navbar-collapse">
              <Nav className="m-auto ">
                <Link href="#me"
                  to="me"
                  activeClass="active"
                  className={`nav-link navbar-buttons nav-link-${mode}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}> About Me </Link>
                <Link href="#technology"
                  to="technology"
                  activeClass="active"
                  className={`nav-link navbar-buttons nav-link-${mode}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}> Tools </Link>
                <Link href="#work"
                  to="work"
                  activeClass="active"
                  className={`nav-link navbar-buttons nav-link-${mode}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500} > Projects </Link>
                <Link href="#blogs"
                  to="blogs"
                  activeClass="active"
                  className={`nav-link navbar-buttons nav-link-${mode}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500} >Blogs</Link>
                <Link href="#contact"
                  to="contact"
                  activeClass="active"
                  className={`nav-link navbar-buttons nav-link-${mode}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500} >Contact</Link>
                <Link disabled={liked}
                  className={liked ? "nav-link navbar-buttons disabled" : "nav-link navbar-buttons"}
                  onClick={() => {
                    setLikedInLocalStorage()
                    
                    runTransaction(ref(db, 'likeCounter/heart'), (current) => (current || 0) + 1)
                      .then(({ snapshot }) => {
                        setHeartCounter(snapshot.val());
                      })
                      .catch((error) => {
                        console.error('Error updating like count:', error);
                      });
                  }}>
                  <button type="button" disabled={liked} className={liked ? `clearFormatting-${mode} likeDisabled` : `clearFormatting-${mode} likeEnabled`}>{heartCounter}❤️</button>
                </Link>
                <DarkModeToggle darkMode={mode !== 'light'} onToggle={toggleDarkMode} width={30} height={10} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className='cards' id="me">
        <Card className='topCard' verticalAlignedContent={<LandingText />} mode={mode} />
        <Card image={<DeveloperImage />} mode={mode} />
      </div>
      <div className='blockCard' id="technology">
        {/* <Card verticalAlignedFullHeightHeading="Tools & Technology" /> */}
        <Card verticalAlignedContent={<TabViewSkills mode={mode} />} mode={mode} />
      </div>
      <div id="work">
        <div className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}>
          <h1 className='sectionHeader' >{textContent.sectionHeaders.projects}</h1>
        </div>
        <div className='cards'> {
          Object.values(experiences).map((item) => {
            const technologyIcons = item.technologyIcons.map((iconName) => (
              <Icon key={iconName} technologyIcon="true" name={iconName} title="" />
            ));
            return <Card key={item.id} heading={item.title} description={item.content} technologyIcons={technologyIcons} mode={mode} />
          })
        }
        </div>
      </div>
      <div id="blogs">
        <div className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}>
          <h1 className='sectionHeader' >{textContent.sectionHeaders.blogs}</h1>
        </div>
        <div className='cards'>{
          blogs.map((item) => {
            const technologyIcons = item.technologyIcons.map((iconName) => (
              <Icon key={iconName} technologyIcon="true" name={iconName} title="" />
            ));
            return <a key={item.id} className='clickableBlog' href={item.linkToPost} target='_blank' rel='noopener noreferrer'>
              <Card isBlogPost={true} heading={item.title} description={item.content} technologyIcons={technologyIcons} mode={mode} />
            </a>
          })}
        </div>
      </div>
      <div id="contact">
        <div className={`sectionHeaderContainer sectionHeaderContainer-${mode}`}>
          <h1 className='sectionHeader' >{textContent.sectionHeaders.contact}</h1>
        </div>
        <div className='cards'>
          <Form mode={mode} />
          <Card heading={''}
            description={textContent.feedbackCard}
            bottomAlignedDescription={
              <>
                {textContent.socialsText}
                <br />
                {socialHandles.map((socialHandle) => {
                  return <a
                    key={socialHandle.id}
                    className='socials'
                    href={socialHandle.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Visit ${socialHandle.title}`}
                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    <Icon technologyIcon="true" name={'sc-' + socialHandle.icon} title="" />
                  </a>
                })}
              </>
            }
            mode={mode}
          />
        </div>
      </div>
      <div id="footer">
        <p className={`footerContent footer-${mode}`}> Made in React with ❤️ by
          <button type="button" className='author' onClick={() => openInNewTab('https://www.linkedin.com/in/hassan-adnanpk/')}> Hassan Adnan </button>
        </p>
      </div>
    </div>
  )
}
