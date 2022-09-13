import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export const Bnav = () => {
  const [userData, setUserData] = useState();
  const userEmail = localStorage.getItem("email");
  useEffect(() => {
    axios
      .get("http://localhost:5000/me", userEmail)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div id="bnav">
        <Link to="/profile">
          <button className="nav_button">Account</button>
        </Link>
        <Link to="/">
          <button className="nav_button">Home</button>
        </Link>
        <Link to="/bookings">
          <button className="nav_button">Bookings</button>
        </Link>
        <Link to="/">
          <button className="nav_button">Admin Dashbord</button>
        </Link>
      </div>
    </>
  );
};
