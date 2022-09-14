import React from "react";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";
import './driver.css'

const DriverDash = () => {
  return (
    <div className="driver_dashboard">
        <Header/>
        <div className="d_div">
        <div className="driver_notification justify-content-between">
        <p>Mihir Baidya</p>
        <h6>from Kolkata</h6>
        <i class="fa-solid fa-arrow-left-long"></i>
        <h5>350km</h5>
        <i class="fa-solid fa-arrow-right-long"></i>
        <h6>to Darjeeling</h6>
        <button className="d_btn">Accept</button>
      </div>
        </div>
      <Bnav/>
    </div>
  );
};

export default DriverDash;
