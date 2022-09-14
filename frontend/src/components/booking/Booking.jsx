import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";
import "./booking.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
    <div id="booking_body" style={{height:"100vh"}}>
      <Header />
      
      <div id="booking_info">
        {bookingData?.allTrip?.length !== 0 ? (
          <>
            <h5>Booking Details</h5><br />
            

              <Box sx={{ flexGrow: 1 }} style={{overflowY: "scroll", height:"70vh"}}>
                <Grid container spacing={2}>
                {bookingData?.allTrip?.map((e) => (
                  <Grid item xs={4}>
                    <div className="booking">
                      <p>{e?.createdAt}</p>
                      <p>from {e?.source}</p>
                      <br />
                      <p>to {e?.destination}</p>
                      <p>{e?.distance}km</p>
                      <br />
                      <br />
                      <p>Ride Preferred: {e?.carType}</p>
                    </div>
                  </Grid>
))}
                </Grid>
              </Box>


            

          </>

        ) : (
          <div style={{height:"80vh"}}>
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
