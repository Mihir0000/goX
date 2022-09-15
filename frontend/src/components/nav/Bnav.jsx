import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./nav.css"

export const Bnav = () => {
  const [userData, setUserData] = useState()
  // console.log(userData, "userData");

  useEffect(() => {
    const userEmail = localStorage.getItem("email")
    axios
      .get(`http://localhost:5000/me`, { params: { userEmail } })
      .then((res) => {
        console.log(res);
        setUserData(res.data.user);
        localStorage.setItem('name', userData?.userName)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <div id='bnav' className='justify-content-between'>
        <Link to="/profile"><button className='nav_button'>Account</button></Link>
        <Link to="/"><button className='nav_button'>Home</button></Link>
        <Link to="/bookings"><button className='nav_button'>Bookings</button></Link>
        {/* {userData?.role === 'admin' ? <Link to="/admin_dashboard" target="_blank"><button className='nav_button'>Admin Dashbord</button></Link> : userData?.role === 'driver' ? <Link to="/driver_dashboard"><button className='nav_button'>Driver Dashbord</button></Link> : ""} */}

      </div>
    </>
  );
};
