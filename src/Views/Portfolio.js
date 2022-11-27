import React from 'react'
import Card from './Layout/Card/Card'
import Navbar from './Layout/Navbar/Navbar'
import DeveloperImage from './Custom/DeveloperImage'
import c4life from './../Assets/c4life.jpg'
import hcm from './../Assets/hcm.jpg'
import tbaml from './../Assets/tbaml.jpg'
import './Portfolio.css'
import LandingText from './Custom/LandingText'
import TabViewSkills from './Custom/TabViewSkills'

export default function Portfolio() {

  const projects = [
    {
      title: "Trade Based Anti-Money Laundering",
      content: "Helped local and international banks automate the process of screening trade transactions to detect Money Laundering and Fraud",
      technologies: [".NET", "Java Springboot", "Angular", "Oracle SQL"]
    },
    {
      title: "Connected 4 Life",
      content: "Improved the response-time of monitoring devices on a healthcare application that provides emergency rescue to heart attack patients",
      technologies: ["Firebase", "Java Springboot", "Angular", "AWS MQTT"]
    },
    {
      title: "Human Capital Management",
      content: "Built the backend architecture and frontend of a HR Management System that is a one-stop solution for employers",
      technologies: ["Angular", "Java Springboot"]
    },
    {
      title: "Attendance Portal",
      content: "Developed a full stack app for attendance management for a local client"
    }
  ]

  return (
    <div className='portfolioContainer'>
      <div className='navbar-container'>
        <Navbar/>
      </div>
      <div className='cards'>
            <Card image={<DeveloperImage/>}/>
            <Card verticalAlignedContent={<LandingText/>} />
            <Card verticalAlignedFullHeightHeading="Tools & Technologies" />
            <Card verticalAlignedContent={<TabViewSkills/>}/>
      </div>
      <div className='sectionHeaderContainer'>
            <h1 className='sectionHeader'>Projects</h1>
      </div>
      <div className='cards'>
            <Card heading={projects[1].title} description={projects[1].content} technologies={projects[1].technologies}/>
            <Card fullWidthImage={c4life} />
            <Card heading={projects[2].title} description={projects[2].content} technologies={projects[2].technologies} />
            <Card fullWidthImage={hcm} />
            <Card heading={projects[0].title} description={projects[0].content} technologies={projects[0].technologies} />
            <Card fullWidthImage={tbaml} />
      </div>
    </div>
  )
}
