import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";
import "./booking.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

export const Booking = () => {
  const [bookingData, setBookingData] = useState();
  const changeDate = (time) => {
    const d1 = new Date(time);
    const result = d1.getTime();
    let todate = new Date(result).getDate();
    let tomonth = new Date(result).getMonth() + 1;
    let toyear = new Date(result).getFullYear();
    let h = new Date(result).getHours();
    let m = new Date(result).getMinutes();
    let s = new Date(result).getSeconds();
    let original_date =
      todate + "/" + tomonth + "/" + toyear + " " + h + ":" + m + ":" + s;
    return original_date;
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    axios
      .get(`http://localhost:5000/trip/singleUser`, {
        params: { userEmail },
      })
      .then((res) => {
        setBookingData(res?.data);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  }, []);

  return (
    <div className="booking_body">
      <div className="booking_body2">
        <Header />
        <div id="booking_info">
          {bookingData?.allTrip?.length !== 0 ? (
            <>
              <h5 className="pt-5 text-white">Booking Details</h5>
              <hr />
              <br />
              <Box
                sx={{ flexGrow: 1 }}
                style={{ overflowY: "scroll", height: "80vh" }}
              >
                <Grid container spacing={2}>
                  {bookingData?.allTrip?.map((e, index) => (
                    <Grid item xs={4} key={index}>
                      <div className="booking">
                        {e?.tripStatus !== "endTrip" &&
                        e?.tripStatus !== "cancel" ? (
                          <div
                            style={{
                              float: "right",
                            }}
                          >
                            <lottie-player
                              src="https://assets1.lottiefiles.com/packages/lf20_qa602yhl.json"
                              background="transparent"
                              speed="1"
                              style={{
                                width: "40px",
                                height: "40px",
                                marginLeft: "10px",
                              }}
                              loop
                              autoplay
                            ></lottie-player>
                          </div>
                        ) : (
                          e?.tripStatus === "cancel" && (
                            <div
                              style={{
                                float: "right",
                              }}
                            >
                              <lottie-player
                                src="https://assets7.lottiefiles.com/private_files/lf30_rp0vziqi.json"
                                background="transparent"
                                speed="1"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginLeft: "10px",
                                }}
                                // loop
                                autoplay
                              ></lottie-player>
                            </div>
                          )
                        )}
                        <p>
                          <strong>Booked At: </strong>{" "}
                          {changeDate(e?.createdAt)}
                        </p>
                        <p>
                          <strong>From :</strong> {e?.source}
                        </p>
                        <p>
                          <strong>To :</strong> {e?.destination}
                        </p>
                        <p>
                          <strong>Distance :</strong> {e?.distance}km
                        </p>
                        <p>
                          <strong>Ride Preferred:</strong> {e?.carType}
                        </p>
                        <p>
                          <strong>Amount:</strong> ₹ {e?.amount}
                        </p>
                        <p>
                          <strong>Ride Status :</strong> {e?.tripStatus}
                        </p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          ) : (
            <div style={{ height: "80vh" }}>
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
    </div>
  );
};
