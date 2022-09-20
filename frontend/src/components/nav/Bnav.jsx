import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { toast } from 'react-toastify';

export const Bnav = () => {
    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        axios
            .get(`http://localhost:5000/me`, { params: { userEmail } })
            .then((res) => {
                localStorage.setItem('name', res.data.user.userName);
            })
            .catch((err) => {
                toast(err.message);
            });
    }, []);

    return (
        <>
            <div id="bnav" className="justify-content-between">
                <Link to="/profile">
                    <button className="nav_button">Account</button>
                </Link>
                <Link to="/">
                    <button className="nav_button">Home</button>
                </Link>
                <Link to="/bookings">
                    <button className="nav_button">Bookings</button>
                </Link>
                {/* {userData?.role === 'admin' ? <Link to="/admin_dashboard" target="_blank"><button className='nav_button'>Admin Dashbord</button></Link> : userData?.role === 'driver' ? <Link to="/driver_dashboard"><button className='nav_button'>Driver Dashbord</button></Link> : ""} */}
            </div>
        </>
    );
};
