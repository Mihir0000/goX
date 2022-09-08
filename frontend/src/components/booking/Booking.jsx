import React from "react";
import { Bnav } from "../nav/Bnav";
import "./booking.css";

export const Booking = () => {
  return (
    <div id="booking_body">
      <div id="booking_info">
        {localStorage.getItem("from") !== null ? (
          <div className="booking">
            <h5>Booking Details</h5>
            <hr />
            Instant Ride
            <br />
            from {localStorage.getItem("from")}
            <br />
            to {localStorage.getItem("to")}
            <br />
            <br />
            Ride Preferred: <hr />
            <div id="chk">
            {localStorage.getItem("checked1")}
            <br />
            {localStorage.getItem("checked2")}
            <br />
            {localStorage.getItem("checked3")}
            <br />
            {localStorage.getItem("checked4")}
            <br />
            {localStorage.getItem("checked5")}
            <br />
            {localStorage.getItem("checked6")}
            <br />
            {localStorage.getItem("checked7")}
            <br />
            </div>
            
          </div>
        ) : (
          <div>
            <div id="booking_lottie">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_mmwivxcd.json"
                background="transparent"
                speed="1"
                style={{ width: "100px", height: "100px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
            <h4>No Booking</h4>
          </div>
        )}
      </div>
      <Bnav />
    </div>
  );
};
