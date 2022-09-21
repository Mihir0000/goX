import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";

const BookingStatus = () => {
  const [status, setStatus] = useState();
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    axios
      .get(`http://localhost:5000/trip/singleUser`, {
        params: { userEmail },
      })
      .then((res) => {
        setStatus(res?.data);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  }, []);

  console.log(status);

  return (
    <div className="booking_status_body p-5">
      <Header />
      <div className="m-5 p-5 d-flex justify-content-center">
        {status?.allTrip[0]?.tripStatus !== "endTrip" ? (
          <div className="m-5 p-5 booking_status">
            {status?.allTrip[0]?.tripStatus === "booked" ? (
              <div>
                <lottie-player
                  src="https://assets9.lottiefiles.com/packages/lf20_cyn8dgwy.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "180px",
                    height: "180px",
                    marginLeft: "30%",
                  }}
                  // loop
                  autoplay
                ></lottie-player>
                <p>Ride Booked</p>
                <p>
                  Connecting your booking to your nearest driver. wait for a
                  while...
                </p>
              </div>
            ) : status?.allTrip[0]?.tripStatus === "startTrip" ? (
              <div>
                <p>
                  {status?.allTrip[0]?.assignDriver} has accepted your booking
                  request
                </p>
                <p>Driver is reaching your pickup point</p>
              </div>
            ) : status?.allTrip[0]?.tripStatus === "onTheWay" && (
              <div>
                <p>Our driver has picked you up. Hope you are comfortable</p>
                <h6>Have a great journey</h6>
              </div>
            )}
          </div>
        ) :
        <div className="m-5 p-5 booking_status">"Your last trip has been ended."</div> 
        }
      </div>
      <Bnav />
    </div>
  );
};

export default BookingStatus;
