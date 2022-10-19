import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='d-flex justify-content-center '>
         <div className='navbar-buttons'>
            <button className='active'>About Hassan</button>
              <span className='separator'>•</span>
            <button>Work</button>
              <span className='separator'>•</span>
            <button>Contact</button>
        </div>
    </div>
  )
}
