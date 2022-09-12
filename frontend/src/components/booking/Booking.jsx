import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";
import "./booking.css";

export const Booking = () => {

  const [bookingData, setBookingData] = useState()
  console.log(bookingData?.allTrip);

  useEffect(() => {
    const userEmail = localStorage.getItem("email")
    axios
      .get(`http://localhost:5000/trip/singleUser`, { params: { userEmail } })
      .then((res) => {
        console.log(res);
        setBookingData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div id="booking_body">
      <Header/>
      <Bnav />
      <div id="booking_info">
        {bookingData?.allTrip !== null ? (
          <>
            <h5>Booking Details</h5><hr /><br />
            {bookingData?.allTrip?.map((e) => (
              <div className="booking">
                <p>{e?.createdAt}</p>
                <p>from {e?.source}</p>
                <br />
                <p>to {e?.destination}</p>
                <br />
                <br />
                <p>Ride Preferred: {e?.carType}</p>
              </div>
            ))}

          </>

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
      
    </div>
  );
};
