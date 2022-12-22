import React, { useEffect, useState } from 'react'
import Card from './Layout/Card/Card'
import DeveloperImage from './Custom/DeveloperImage'
import c4life from './../Assets/c4life.jpg'
import hcm from './../Assets/hcm.jpg'
import tbaml from './../Assets/tbaml.jpg'
import './Portfolio.css'
import './Layout/Navbar/Navbar.css'
import LandingText from './Custom/LandingText'
import TabViewSkills from './Custom/TabViewSkills'
import {Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from 'react-scroll';
import Icon from './Layout/Icons/Icon';
import { db } from '../utils/firebase'
import { ref, set, child, get} from 'firebase/database'

export default function Portfolio() {

  const [liked, setLiked] = useState(false)
  const [heartCounter, setHeartCounter] = useState(0)

  useEffect(()=>{
    const dbRef = ref(db);
    get(child(dbRef, `likeCounter`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setHeartCounter(snapshot.val().heart)
      }
    }).catch((error) => {
      console.error(error);
    });
  })


  const projects = [
    {
      title: "Trade Based Anti-Money Laundering",
      content: "Helped local and international banks automate the process of screening trade transactions to detect Money Laundering and Fraud",
      technologies: [".NET", "Java Springboot", "Angular", "Oracle SQL"],
      technologyIcons: [
        <Icon technologyIcon="true" name="csharp" title="" />,
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
        <Icon technologyIcon="true" name="spring" title="" />
      ]
    },
    {
      title: "Attendance Portal",
      content: "Developed a full stack app for attendance management for a local client"
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
                onClick={()=> {
              
                  set(ref(db, 'likeCounter'), {
                    heart: heartCounter+1
                  });
                  setHeartCounter(heartCounter+1)
                  }}
                ><button className='clearFormatting'>{heartCounter}❤️</button></Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className='cards' id="me">
        <Card verticalAlignedContent={<LandingText />} />
        <Card image={<DeveloperImage />} />
      </div>
      <div className='cards' id="technology">
        <Card verticalAlignedFullHeightHeading="Tools & Technology" />
        <Card verticalAlignedContent={<TabViewSkills />} />
      </div>
      <div id="work">
        <div className='sectionHeaderContainer'>
          <h1 className='sectionHeader' >Projects</h1>
        </div>
        <div className='cards'>
          <Card heading={projects[1].title} description={projects[1].content} technologyIcons={projects[1].technologyIcons}  />
          <Card fullWidthImage={c4life} dropShadow="true" />
          <Card heading={projects[2].title} description={projects[2].content} technologyIcons={projects[2].technologyIcons} />
          <Card fullWidthImage={hcm} dropShadow="true" />
          <Card heading={projects[0].title} description={projects[0].content} technologyIcons={projects[0].technologyIcons} />
          <Card fullWidthImage={tbaml} dropShadow="true" />
        </div>
      </div>
    </div>
  )
}
