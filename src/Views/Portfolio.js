import React from 'react'
import Card from './Layout/Card/Card'
import Navbar from './Layout/Navbar/Navbar'
import DeveloperImage from './Custom/DeveloperImage'
import MeanImage from './../Assets/mean-stack.png'
import MernImage from './../Assets/mern-stack.png'
import JavaImage from './../Assets/java.png'
import HandcuffsImage from './../Assets/handcuffs.png'
import { Carousel } from 'primereact/carousel';
import './Portfolio.css'
import LandingText from './Custom/LandingText'

export default function Portfolio() {
  const itemTemplate = (item) => {
    return <Card cardHeaderImageSquare={item.image} verticalAlignedSubHeading = {item.title} verticalAlignedContent = {item.content}/>
}
  const projects = [
    {
      title: "TBML Implementation",
      content: "Implemented the state bank's trade based anti money laundering module leading banks in Pakistan and in China",
      image: HandcuffsImage
    },
    {
      title: "Connected 4 Life",
      content: "Developed the backend of a healthcare application that is based on emergency rescue services."
    },
    {
      title: "Human Capital Management",
      content: "Built the architecture of a Human Resource management system in Java Springboot"
    },
    {
      title: "Attendance Portal",
      content: "Developed a full stack app for attendance management for a local client"
    }
  ]

  const technologies = [
  {
    title: "MEAN Stack",
    content: "I develop awesome designs using Angular, integrate them with nodejs and connect them to Mongo or MySQL databases.",
    image: MeanImage
  },
  {
    title: "Java",
    content: "For complex logic and sustainable backend, and for scalable products, I develop in Java Springboot.",
    image: JavaImage
  },
  {
    title: "MERN Stack",
    content: "For light weight applications having greater focus on UI/UX, I develop in React",
    image: MernImage
  }
  ]

  return (
    <>
      <div className='navbar-container'><Navbar/></div>
      <div className='cards'>
            <Card image={<DeveloperImage/>}/>
            <Card backgroundColor="#dcffe4" verticalAlignedContent={<LandingText/>} />
            {technologies.map(item=> <Card cardHeaderImageWide={item.image} verticalAlignedSubHeading={item.title} verticalAlignedContent={item.content}/>)}
      </div>
      <Carousel value={projects} itemTemplate={itemTemplate} circular={true} numVisible={3} numScroll={3} header={<h2>Projects</h2>}></Carousel>
    </>
  )
}
