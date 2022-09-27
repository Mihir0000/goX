import React, { useEffect, useState } from "react";
import Sidebar from "../sharedModule/Sidebar";
import { Header } from "../header/Header";
import "./driver.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import addNotification, { Notifications } from "react-push-notification";

const DriverDash = () => {
  const [bookedTrip, setBookedTrip] = useState(null);
  const [cancelTrip, setCancelTrip] = useState("");
  const [otp, setOtp] = useState("");
  const [otp2, setOtp2] = useState("");
  const [confirmOtp1, setConfirmOtp1] = useState("");
  const [confirmOtp2, setConfirmOtp2] = useState("");
  const [tick, setTick] = useState(false);

  const driverName = localStorage.getItem("email");
  useEffect(() => {
    let idx = 0;
    let req = setInterval(async () => {
      await axios
        .get("http://localhost:5000/driver/trip", { params: { idx } })
        .then(async (data) => {
          if (data.data.userEmail === driverName) {
            await axios
              .get("http://localhost:5000/driver/bookedTrip")
              .then((data) => {
                setBookedTrip(data?.data[0]);
              })
              .catch((err) => {
                toast(err.response.data.message);
              });
          } else {
            setBookedTrip(null);
          }
        });
      idx++;
    }, 5000);
    setTimeout(() => {
      clearInterval(req);
      setBookedTrip(null);
    }, 69000);
  }, [driverName]);

  const Notification = () => {
    if (bookedTrip !== null) {
      addNotification({
        title: "GoX",
        subtitle: 'Someone has booked a ride near you',
        message: 'Someone has booked a ride near you',
        duration:3000,
        native: true,
      });
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("tripId");
    if (id) {
      axios
        .get("http://localhost:5000/singleTripDetails", { params: { id } })
        .then((data) => {
          setCancelTrip(data.data.tripStatus);
          setConfirmOtp1(data?.data?.otp1);
          setConfirmOtp2(data?.data?.otp2);
        })
        .catch((err) => {
          toast(err.response.data.message);
        });
    }
  });

  const checkNewTrip = () => {
    localStorage.removeItem("tripId");
    localStorage.removeItem("accept");
    window.location.reload();
  };

  const tripAccept = async (TripId) => {
    localStorage.setItem("tripId", TripId);
    setTick(false);
    await axios
      .put("http://localhost:5000/driver/confirmTrip", {
        id: TripId,
        assignDriver: driverName,
      })
      .then((data) => {
        localStorage.setItem("accept", data.data.acceptStatus);
        window.location.reload();
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };
  const pickup = async () => {
    setTick(false);
    await axios
      .put("http://localhost:5000/driver/onTheWay", {
        id: localStorage.getItem("tripId"),
      })
      .then((data) => {
        localStorage.removeItem("accept");
        localStorage.setItem("pickup", data.data.onTheWay);
        window.location.reload();
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };
  const drop = async () => {
    await axios
      .put("http://localhost:5000/driver/endTrip", {
        id: localStorage.getItem("tripId"),
      })
      .then((data) => {
        localStorage.removeItem("pickup");
        localStorage.removeItem("tripId");
        window.location.reload();
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };

  const verify1 = () => {
    if (!otp) {
      toast("Enter OTP first");
    } else if (otp !== confirmOtp1) {
      toast("Wrong OTP");
    } else {
      toast("OTP verified");
      setTick(true);
    }
  };
  const verify2 = () => {
    if (!otp2) {
      toast("Enter OTP first");
    } else if (otp2 !== confirmOtp2) {
      toast("Wrong OTP");
    } else {
      toast("OTP verified");
      setTick(true);
    }
  };

  return (
    <div className="driver_dashboard">
      <Sidebar />
      <Header />
      <Notifications onClick={Notification()} />
      {localStorage.getItem("accept") === "true" && cancelTrip !== "cancel" ? (
        <div className="currentTrip">
          <h6>Your Passenger is waiting at pickup location...</h6>
          <p>
            Enter Verification Code before picking your passenger up. You will
            get the OTP from your passenger
          </p>
          <div className="d-flex justify-content-center p-2 mb-4">
            <OtpInput
              placeholder="none"
              value={otp}
              onChange={setOtp}
              numInputs={4}
              isInputNum={true}
              inputStyle="inputStyle"
              separator={<span>-</span>}
              isDisabled={tick}
            />
            {tick ? (
              <div className="d-flex justify-content-center">
                <Button disabled>Verified</Button>

                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_wc1axoqt.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  autoplay
                />
              </div>
            ) : (
              <Button onClick={verify1}>Verify OTP</Button>
            )}
          </div>
          <button className="btn btn-info me-2 text-white">
            <Link className="text-white" to="/activeTrip">
              See details of this trip
            </Link>
          </button>
          <button className="btn btn-success" disabled={!tick} onClick={pickup}>
            Pickup complete
          </button>
        </div>
      ) : localStorage.getItem("pickup") ? (
        <div className="currentTrip">
          <h6>Have a great journey...</h6>
          <div className="d-flex justify-content-center p-2">
            <OtpInput
              placeholder="none"
              value={otp2}
              onChange={setOtp2}
              numInputs={4}
              isInputNum={true}
              inputStyle="inputStyle"
              separator={<span>-</span>}
              isDisabled={tick}
            />
            {tick ? (
              <div className="d-flex justify-content-center">
                <Button disabled>Verified</Button>

                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_wc1axoqt.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  autoplay
                />
              </div>
            ) : (
              <Button onClick={verify2}>Verify OTP</Button>
            )}
          </div>
          <button className="btn btn-info me-2">
            <Link className="text-white" to="/activeTrip">
              See details of this trip
            </Link>
          </button>
          <button className="btn btn-success" disabled={!tick} onClick={drop}>
            Trip Complete
          </button>
        </div>
      ) : bookedTrip?.length === 0 ? (
        <div>No Booking Request Right Now</div>
      ) : cancelTrip === "cancel" ? (
        <div>
          <div className="text-white"> This trip is cancelled.</div>
          <Button onClick={checkNewTrip}>Check New Trip</Button>
        </div>
      ) : (
        <div className="d_div">
          {bookedTrip == null && (
            <div className=" justify-content-between m-auto text-white">
              <p>No Trip is Available right now.</p>
            </div>
          )}
          {bookedTrip !== null && (
            <div>
              <div className="driver_notification justify-content-between m-auto">
                <p>{bookedTrip?.userName}</p>
                <h6>from {bookedTrip?.source}</h6>
                <i className="fa-solid fa-arrow-left-long"></i>
                <h5>{bookedTrip?.distance}km</h5>
                <i className="fa-solid fa-arrow-right-long"></i>
                <h6>to {bookedTrip?.destination}</h6>
                <button
                  className="d_btn btn-info text-white"
                  onClick={() => tripAccept(bookedTrip?.id)}
                >
                  Accept
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDash;
