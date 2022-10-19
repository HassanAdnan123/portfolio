import React from 'react'
import Card from './Layout/Card/Card'
import Navbar from './Layout/Navbar'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <>
        <div className='navbar-container'> <Navbar/> </div>
            <Card image={ null } heading="Project One" content={ <p> I have worked on several projects </p> } />
            <Card image={ null } heading="Project Two" content={ <p> I have worked on several projects </p> } />
            <Card image={ null } heading="Project Three" content={ <p> I have worked on several projects </p> } />
    </>
    
  )
}
