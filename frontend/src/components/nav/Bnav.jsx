import { Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import "./nav.css"

export const Bnav = () => {
  return (
    <>
      <div id='bnav'>
        <Link to="/profile"><button className='nav_button'>Account</button></Link>
        <Link to="/"><button className='nav_button'>Home</button></Link>
        <Link to="/bookings"><button className='nav_button'>Bookings</button></Link>
      </div>
    </>
  )
}
