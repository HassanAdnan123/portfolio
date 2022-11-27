import React from 'react'
import Card from './Layout/Card/Card'
import Navbar from './Layout/Navbar/Navbar'
import DeveloperImage from './Custom/DeveloperImage'
import c4life from './../Assets/c4life.jpg'
import './Portfolio.css'
import LandingText from './Custom/LandingText'
import TabViewSkills from './Custom/TabViewSkills'

export default function Portfolio() {
//   const itemTemplate = (item) => {
//     return <Card cardHeaderImageSquare={item.image} verticalAlignedSubHeading = {item.title} verticalAlignedContent = {item.content}/>
// }
  // const projects = [
  //   {
  //     title: "TBML Implementation",
  //     content: "Implemented the state bank's trade based anti money laundering module leading banks in Pakistan and in China",
  //     image: HandcuffsImage
  //   },
  //   {
  //     title: "Connected 4 Life",
  //     content: "Developed the backend of a healthcare application that is based on emergency rescue services."
  //   },
  //   {
  //     title: "Human Capital Management",
  //     content: "Built the architecture of a Human Resource management system in Java Springboot"
  //   },
  //   {
  //     title: "Attendance Portal",
  //     content: "Developed a full stack app for attendance management for a local client"
  //   }
  // ]

  // const technologies = [
  // {
  //   title: "MEAN Stack",
  //   content: "I develop awesome designs using Angular, integrate them with nodejs and connect them to Mongo or MySQL databases.",
  //   image: MeanImage
  // },
  // {
  //   title: "Java",
  //   content: "For complex logic and sustainable backend, and for scalable products, I develop in Java Springboot.",
  //   image: JavaImage
  // },
  // {
  //   title: "MERN Stack",
  //   content: "For light weight applications having greater focus on UI/UX, I develop in React",
  //   image: MernImage
  // }
  // ]

  return (
    <div className='portfolioContainer'>
      <div className='navbar-container'>
        <Navbar/>
      </div>
      <div className='cards'>
            <Card backgroundColor='yellow' image={<DeveloperImage/>}/>
            <Card verticalAlignedContent={<LandingText/>} />
            <Card verticalAlignedFullHeightHeading="Tools & Technologies" />
            <Card verticalAlignedContent={<TabViewSkills/>}/>
            <Card heading="Connected 4 Life" subheading="Implemented XYZ" />
            <Card fullWidthImage={c4life} />
      </div>
    </div>
  )
}
