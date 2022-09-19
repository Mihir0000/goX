import React, { useEffect, useState } from "react";
import Sidebar from "../sharedModule/Sidebar";
import { Header } from "../header/Header";
import "./driver.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DriverDash = () => {
  const [bookedTrip, setBookedTrip] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/driver/bookedTrip")
      .then((data) => {
        setBookedTrip(data?.data);
      })
      .catch((err) => {
        toast(err.message);
      });
  }, []);

  const driverName = localStorage.getItem("email");

  const tripAccept = async (TripId) => {
    localStorage.setItem("tripId", TripId);
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
        toast(err.message);
      });
  };
  const pickup = async () => {
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
        toast(err.message);
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
        toast(err.message);
      });
  };

  return (
    <div className="driver_dashboard">
      <Sidebar />
      <Header />
      {localStorage.getItem("accept") === "true" ? (
        <div className="currentTrip">
          <h6>Your Passenger is waiting at pickup location...</h6>
          <button>
            <Link to="/activeTrip">See details of this trip</Link>
          </button>
          <button onClick={pickup}>Pickup complete</button>
        </div>
      ) : localStorage.getItem("pickup") ? (
        <div className="currentTrip">
          <h6>Have a great journey...</h6>
          <button>
            <Link to="/activeTrip">See details of this trip</Link>
          </button>
          <button onClick={drop}>Trip Complete</button>
        </div>
      ) : bookedTrip?.length === 0 ? (
        <div>No Booking Request Right Now</div>
      ) : (
        <div className="d_div">
          {bookedTrip?.map((e, index) => (
            <div
              className="driver_notification justify-content-between m-auto"
              key={index}
            >
              <p>{e?.userName}</p>
              <h6>from {e?.source}</h6>
              <i className="fa-solid fa-arrow-left-long"></i>
              <h5>{e?.distance}km</h5>
              <i className="fa-solid fa-arrow-right-long"></i>
              <h6>to {e?.destination}</h6>
              <button className="d_btn" onClick={() => tripAccept(e?.id)}>
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDash;
