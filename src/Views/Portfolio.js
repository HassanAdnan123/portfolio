import React from 'react'
import Card from './Layout/Card/Card'
import Navbar from './Layout/Navbar/Navbar'
import DeveloperImage from './Custom/DeveloperImage'
import tech_stack from './../Assets/tech_stack.png'
import { Carousel } from 'primereact/carousel';
import './Portfolio.css'
import LandingText from './Custom/LandingText'

export default function Portfolio() {
  const itemTemplate = (item) => {
    return <Card verticalAlignedSubHeading = {item.title} verticalAlignedContent = {item.content}/>
}
  const projects = [
    {title: "TBML Implementation",
    content: "Implemented the state bank's trade based anti money laundering module."},
    {title: "Connected 4 Life",
    content: "Developed the backend of a healthcare application that is based on emergency rescue services."},
    {title: "Human Capital Management",
    content: "Built the architecture of a Human Resource management system in Java Springboot"},
    {title: "Attendance Portal",
    content: "Developed a full stack app for attendance management for a local client"}
  ]

  return (
    <>
      <div className='navbar-container'><Navbar/></div>
      <div className='cards'>
            <Card image={<DeveloperImage/>}/>
            <Card verticalAlignedContent={<LandingText/>} />
            <Card verticalAlignedSubHeading="MEAN, MERN & PERN are my favorite technology stacks!" 
                  verticalAlignedContent={ 
                            <p> MySQL / Postgres, Express, Angular / React and Node are
                                my relatively strong suites.
                            </p> 
                          } />
            <Card fullwidthimageurl={tech_stack}/>
            <Card verticalAlignedMainHeading="Projects"/>
            <Card content= {<Carousel value={projects} itemTemplate={itemTemplate}></Carousel> }/>
      </div>
    </>
  )
}
