import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { Bnav } from '../nav/Bnav';
import './profile.css';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

export const Profile = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    axios
      .get(`http://localhost:5000/me`, { params: { userEmail } })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  }, []);

  return (
    <div id="profile_body">
      {userData?.role !== 'user' && <Sidebar />}
      <Header />
      <Container style={{ height: '100%', paddingTop: '100px' }}>
        <div className="d-flex justify-content-between">
          <i className="fa-solid fa-10x fa-user pro_icon"></i>
          <div className="shadow-lg p-4 mb-4 bg-white rounded profile_section ">
            <h4 id="account_heading">Account Information</h4>

            <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
              <img
                className="profile_icon"
                src="https://img.icons8.com/color/96/000000/customer-skin-type-7.png"
                alt="usericon"
              />
              Name :{' '}
              <strong className="text-capitalize">{userData?.userName}</strong>
            </div>
            <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
              <img
                className="profile_icon"
                alt="role"
                src="https://img.icons8.com/external-basicons-color-danil-polshin/100/000000/external-abstract-abstract-basicons-color-danil-polshin-9.png"
              />
              Role:{' '}
              <strong className="text-capitalize">{userData?.role}</strong>
            </div>
            <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
              <img
                className="profile_icon"
                src="https://img.icons8.com/color/96/000000/new-post.png"
                alt="mailicon"
              />
              Email: <strong>{userData?.userEmail}</strong>
            </div>
          </div>
        </div>
      </Container>
      {userData?.role === 'user' && <Bnav />}
    </div>
  );
};
