import { Container } from "@mui/system";
import React from "react";
import { Bnav } from "../nav/Bnav";
import "./profile.css";

export const Profile = () => {
  return (
    <div id="profile_body">
      <Container>
        <div className="shadow-lg p-3 mb-5 bg-white rounded profile_section ">
          <h4 id="account_heading">Account Information</h4>
          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/user.png"
            />
            Name: {localStorage.getItem("username")}
          </div>
          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/male.png"
            />
            Gender: {localStorage.getItem("gender")}
          </div>
          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/birthday-cake.png"
            />
            DOB: {localStorage.getItem("dob")}
          </div>
          <div className="shadow-lg p-3 mb-5 bg-white rounded profile_div">
            <img
              className="profile_icon"
              src="https://img.icons8.com/color/48/000000/order-delivered.png"
            />
            Address: {localStorage.getItem("address")}
          </div>
        </div>
      </Container>
      <Bnav />
    </div>
  );
};
