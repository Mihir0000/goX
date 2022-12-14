import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";

const BookingStatus = () => {
  const [status, setStatus] = useState();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    axios
      .get(`http://localhost:5000/trip/singleUser`, {
        params: { userEmail },
      })
      .then((res) => {
        setStatus(res?.data);
        setOtp1(res?.data?.allTrip[0]?.otp1);
        setOtp2(res?.data?.allTrip[0]?.otp2);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  });

  console.log(status);

  const navigate = useNavigate();
  const CancelTrip = (id) => {
    axios
      .put(`http://localhost:5000/cancelTrip`, { id })
      .then((res) => {
        swal("Your Ride Has Been Cancelled");
        navigate("/");
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };

  return (
    <div className="booking_status_body p-5">
      <Header />
      <div className="m-5 p-5 d-flex justify-content-center">
        {status?.allTrip[0]?.tripStatus !== "endTrip" ? (
          <div className="p-5 booking_status">
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
                />
                <p>Ride Booked</p>
                <p>
                  Connecting your booking to your nearest driver. wait for a
                  while...
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => CancelTrip(status?.allTrip[0]?.id)}
                >
                  Cancel
                </button>
              </div>
            ) : status?.allTrip[0]?.tripStatus === "startTrip" ? (
              <div>
                <lottie-player
                  src="https://assets9.lottiefiles.com/private_files/lf30_hsabbeks.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "180px",
                    height: "180px",
                    marginLeft: "30%",
                  }}
                  loop
                  autoplay
                />
                <p>
                  <strong className="text-capitalize">{status?.allTrip[0]?.driverName}</strong> has accepted your booking
                  request
                </p>
                <div className="d-flex px-1 justify-content-between"><p>{status?.allTrip[0]?.carColor} {status?.allTrip[0]?.carModelName}</p><b>{status?.allTrip[0]?.carNo}</b></div>
                <p>Driver is reaching your pickup point</p>
                <p>OTP : {otp1}</p>
                <p>Confirm this OTP when your driver will pick you up</p>
                <button
                  className="btn btn-danger"
                  onClick={() => CancelTrip(status?.allTrip[0]?.id)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              status?.allTrip[0]?.tripStatus === "onTheWay" && (
                <div>
                  <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_it6c3dgk.json"
                    background="transparent"
                    speed="1"
                    style={{
                      width: "180px",
                      height: "180px",
                      marginLeft: "30%",
                    }}
                    loop
                    autoplay
                  />
                  <p>Our driver has picked you up. Hope you are comfortable</p>
                  <h6>Have a great journey</h6>
                  <p>OTP: {otp2}</p>
                  <p>
                    Confirm this OTP when driver will drop in your destination
                  </p>
                </div>
              )
            )}
          </div>
        ) : status?.allTrip[0]?.tripStatus === "cancel" ? (
          <div className="m-5 p-5 booking_status">
            "Your last trip has been cancelled."
          </div>
        ) : (
          <div className="m-5 p-5 booking_status">
            "Your last trip has been ended."
          </div>
        )}
      </div>
      <Bnav />
    </div>
  );
};

export default BookingStatus;
