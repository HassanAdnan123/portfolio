import React, { useEffect, useState } from 'react'
import Card from './Layout/Card/Card'
import DeveloperImage from './Custom/DeveloperImage'
// import c4life from './../Assets/c4life.jpg'
// import hcm from './../Assets/hcm.jpg'
// import tbaml from './../Assets/tbaml.jpg'
import './Portfolio.css'
import './Layout/Navbar/Navbar.css'
import LandingText from './Custom/LandingText'
import TabViewSkills from './Custom/TabViewSkills'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import Icon from './Layout/Icons/Icon';
import { db } from '../utils/firebase'
import { ref, set, child, get } from 'firebase/database'
import Form from './Layout/Form/Form'

export default function Portfolio() {

  const [heartCounter, setHeartCounter] = useState(0)

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `likeCounter`)).then((snapshot) => {
      if (snapshot.exists()) {
        setHeartCounter(snapshot.val().heart)
      }
    }).catch((error) => {
      console.error(error);
    });
  },[])

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const feedbackCardText = 'If you have an awesome idea, let\'s put my development skills and your creativeness on the table'
  +' and build a great application together! 🙌'

  const socialsText = 'You can find me here as well:'


  const projects = [
    {
      title: "Trade Based Anti-Money Laundering",
      content: "Helped local and international banks automate the process of screening trade transactions to detect Money Laundering and Fraud",
      technologies: [".NET", "Java Springboot", "Angular", "Oracle SQL"],
      technologyIcons: [
        <Icon technologyIcon="true" name="dotnet" title="" />,
        <Icon technologyIcon="true" name="angular" title="" />,
        <Icon technologyIcon="true" name="spring" title="" />,
        <Icon technologyIcon="true" name="oracle" title="" />
      ]
    },
    {
      title: "Emergency Response System (Web-App)",
      content: "Improved the response-time of monitoring devices on a healthcare application that provides emergency rescue to heart attack patients",
      technologies: ["Firebase", "Java Springboot", "Angular", "AWS MQTT"],
      technologyIcons: [
        <Icon technologyIcon="true" name="firebase" title="" />,
        <Icon technologyIcon="true" name="angular" title="" />,
        <Icon technologyIcon="true" name="aws" title="" />
      ]
    },
    {
      title: "Employee Management System",
      content: "Built the backend architecture and frontend of a HR Management System that is a one-stop solution for employers",
      technologies: ["Angular", "Java Springboot"],
      technologyIcons: [
        <Icon technologyIcon="true" name="angular" title="" />,
        <Icon technologyIcon="true" name="spring" title="" />,
        <Icon technologyIcon="true" name="postgres" title="" />
      ]
    },
    {
      title: "Maallim Attendance Portal",
      content: "Developed an attendance management system for a local client which extracts attendance and converts to timetable-based data from biometric device.",
      technologies: ["Angular", "Firebase"],
      technologyIcons: [
        <Icon technologyIcon="true" name="angular" title=""/>,
        <Icon technologyIcon="true" name="firebase" title="" />,
        <Icon technologyIcon="true" name="nodejs" title="" />,
        <Icon technologyIcon="true" name="mysql" title="" />
      ]
    }
  ]

  const blogs = [
    {
      title: "Microservices: When and why they are used",
      linkToPost: "https://www.linkedin.com/posts/hassan-adnanpk_development-microservice-twitter-activity-6999265353289592832-OFUz?utm_source=share&utm_medium=member_desktop",
      content: "Working principle under the hood of microservices that make them so resilient in comparison to single-module based apps (Monoliths)",
      technologyIcons: [
        <Icon technologyIcon="true" name="spring" title="" />
      ]
    },
    {
      title: "Foundation of Javascript: Event Loop",
      linkToPost: "https://www.linkedin.com/posts/hassan-adnanpk_javascript-eventloop-singlethreaded-activity-6886600934038790144-M5Iz?utm_source=share&utm_medium=member_desktop",
      content: "An interesting piece of information about how javascript can handle multitasking despite of it being a single-threaded language.",
      technologyIcons: [
        <Icon technologyIcon="true" name="js" title="" />
      ]
    }
  ]

  const socialHandles = [
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/hassan-adnanpk/",
      icon: 'linkedin'
    },
    {
      title: "Twitter",
      link: "https://twitter.com/luminous_diode",
      icon: 'twitter'
    },
    {
      title: "Github",
      link: "https://github.com/HassanAdnan123",
      icon: 'github'
    }

  ]




  return (
    <div className='portfolioContainer'>
      <div className='navbar-container'>
        <Navbar className='navbar-settings' bg="light" variant="light" fixed="top">
          <Container className='nav-container'>
            <Nav className="m-auto ">
              <Link href="#me"
                to="me"
                activeClass="active"
                className="nav-link navbar-buttons"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}> About Me </Link>
              <Link href="#technology"
                to="technology"
                activeClass="active"
                className="nav-link navbar-buttons"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}> Tools </Link>
              <Link href="#work"
                to="work"
                activeClass="active"
                className="nav-link navbar-buttons"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500} > Projects </Link>
              <Link href="#blogs"
                to="blogs"
                activeClass="active"
                className="nav-link navbar-buttons"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500} >Blogs</Link>
              <Link href="#contact"
                to="contact"
                activeClass="active"
                className="nav-link navbar-buttons"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500} >Contact</Link>
              <Link
                className="nav-link navbar-buttons"
                onClick={() => {

                  set(ref(db, 'likeCounter'), {
                    heart: heartCounter + 1
                  });
                  setHeartCounter(heartCounter + 1)
                }}
              ><button className='clearFormatting'>{heartCounter}❤️</button></Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className='cards' id="me">
        <Card className='topCard' verticalAlignedContent={<LandingText />} />
        <Card image={<DeveloperImage />} />
      </div>
      <div className='blockCard' id="technology">
        {/* <Card verticalAlignedFullHeightHeading="Tools & Technology" /> */}
        <Card verticalAlignedContent={<TabViewSkills />} />
      </div>
      <div id="work">
        <div className='sectionHeaderContainer'>
          <h1 className='sectionHeader' >See what I've built..</h1>
        </div>
        <div className='cards'> {
          projects.map((item)=> {
            return <Card heading={item.title} description={item.content} technologyIcons={item.technologyIcons} />
          })
        }
          {/* <Card heading={projects[0].title} description={projects[0].content} technologyIcons={projects[1].technologyIcons} />
          <Card fullWidthImage={c4life} dropShadow="true" />
          <Card heading={projects[1].title} description={projects[1].content} technologyIcons={projects[2].technologyIcons} />
          <Card fullWidthImage={hcm} dropShadow="true" />
          <Card heading={projects[2].title} description={projects[2].content} technologyIcons={projects[0].technologyIcons} />
          <Card fullWidthImage={tbaml} dropShadow="true" />
          <Card heading={projects[3].title} description={projects[0].content} technologyIcons={projects[0].technologyIcons} /> */}
        </div>
      </div>
      <div id="blogs">
        <div className='sectionHeaderContainer'>
          <h1 className='sectionHeader' >I also write about tech..</h1>
        </div>
        <div className='cards'>{
          blogs.map((item)=> {
            return <button className='clickableBlog' onClick={()=> openInNewTab(item.linkToPost)}>
                      <Card isBlogPost={true} heading={item.title} description={item.content} technologyIcons={item.technologyIcons} /> 
                  </button>
          })}
        </div>
      </div>
      <div id="contact">
        <div className='sectionHeaderContainer'>
          <h1 className='sectionHeader' >Let's have ☕</h1>
        </div>
        <div className='cards'>
          <Card heading={''} 
                description={feedbackCardText} 
                bottomAlignedDescription={
                  <>
                    {socialsText}
                    <br/>
                    {socialHandles.map((socialHandle)=>{
                      return <button className='socials' onClick={()=> openInNewTab(socialHandle.link)}>
                        <Icon technologyIcon="true" name={'sc-'+socialHandle.icon} title="" />
                      </button>
                    })}
                  </>
                } 
          />
          <Form/>
        </div>
      </div>
      <div id="footer">
        <p className='footerContent'> Made in React with ❤️ by <button className='author' onClick={()=> openInNewTab('https://www.linkedin.com/in/hassan-adnanpk/')}> Hassan Adnan </button> </p>
      </div>
    </div>
  )
}
