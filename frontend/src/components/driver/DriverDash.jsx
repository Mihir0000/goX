import React, { useEffect, useState } from "react";
import Sidebar from "../sharedModule/Sidebar";
import { Header } from "../header/Header";
import "./driver.css";
import axios from "axios";
import { Link } from "react-router-dom";

const DriverDash = () => {
  const [bookedTrip, setBookedTrip] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/driver/bookedTrip")
      .then((data) => {
        setBookedTrip(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(bookedTrip);

  const driverName = localStorage.getItem("email");
  // console.log(TripId,"id");

  const tripAccept = async (TripId) => {
    console.log(TripId);
    await axios
      .put("http://localhost:5000/driver/confirmTrip", {
        id: TripId,
        assignDriver: driverName,
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('accept', data.data.startTripStatus)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="driver_dashboard">
      <Sidebar />
      <Header />
      {localStorage.getItem('accept') === 'true' ? (
        <div className="currentTrip">
          <h6>Your Passenger is waiting at pickup location...</h6>
          <button><Link to='/activeTrip'>See details of this trip</Link></button>
          <button>Pickup complete</button>
        </div>
      ) : (
        <div className="d_div">
          {bookedTrip?.map((e) => (
            <div className="driver_notification justify-content-between m-auto">
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
