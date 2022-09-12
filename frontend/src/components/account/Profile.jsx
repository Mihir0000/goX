import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bnav } from "../nav/Bnav";
import "./profile.css";

export const Profile = () => {

  const [userData, setUserData] = useState()
  console.log(userData, "userData");

  useEffect(() => {
    const userEmail = localStorage.getItem("email")
    axios
      .get(`http://localhost:5000/me`, { params: { userEmail } })
      .then((res) => {
        console.log(res);
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="profile_body">
      <Container>
      <Bnav />
        <div className="shadow-lg p-3 mb-5 bg-white rounded profile_section ">
          <h4 id="account_heading">Account Information</h4>

          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/user.png"
            />
            {/* Name: {localStorage.getItem("username")} */}
            Name: {userData?.userName}
          </div>
          {/* <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/male.png"
            />
            Gender: {localStorage.getItem("gender")}
          </div> */}
          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/order-delivered.png"
            />
            Role: {userData?.role}
          </div>
          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/birthday-cake.png"
            />
            Email: {userData?.userEmail}
          </div>

        </div>
      </Container>
      
    </div>
  );
};
