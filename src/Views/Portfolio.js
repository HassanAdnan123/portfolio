import React from 'react'
import Body from './Sub-Components/Body'
import Navbar from './Sub-Components/Navbar'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <div>
        <div className='navbar-container'>
            <Navbar></Navbar>
        </div>
        <div>
            <Body></Body>
        </div>
    </div>
  )
}
