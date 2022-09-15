import React from "react";
import Sidebar from "../sharedModule/Sidebar";
import { Header } from "../header/Header";
import "./driver.css";

const DriverDash = () => {
  return (
    <div className="driver_dashboard">
      <Sidebar />
      <Header />
      <div className="d_div">
        <div className="driver_notification justify-content-between m-auto">
          <p>Mihir Baidya</p>
          <h6>from Kolkata</h6>
          <i class="fa-solid fa-arrow-left-long"></i>
          <h5>350km</h5>
          <i class="fa-solid fa-arrow-right-long"></i>
          <h6>to Darjeeling</h6>
          <button className="d_btn">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default DriverDash;
