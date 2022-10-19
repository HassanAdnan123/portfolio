import React from 'react'
import Card from './Layout/Card/Card'
import Navbar from './Layout/Navbar/Navbar'
import DeveloperImage from './Custom/DeveloperImage'
import './Portfolio.css'
import LandingText from './Custom/LandingText'

export default function Portfolio() {
  return (
    <>
      <div className='navbar-container'><Navbar/></div>
      <div className='cards'>
            <Card image={<DeveloperImage/>}/>
            <Card className="my-auto" content={<LandingText/>} />
            <Card heading="MEAN, MERN & PERN are my favorite technology stacks!" 
                  content={ 
                            <p> MySQL / Postgres, Express, Angular / React and Node are
                                my relatively strong suites.
                            </p> 
                          } />
      </div>
    </>
  )
}
