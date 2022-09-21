import React, { useEffect, useState } from 'react';
import Sidebar from '../sharedModule/Sidebar';
import { Header } from '../header/Header';
import './driver.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DriverDash = () => {
  const [bookedTrip, setBookedTrip] = useState(null);
  // const [driver, setDriver] = useState();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/driver/bookedTrip")
  //     .then((data) => {
  //       setBookedTrip(data?.data);
  //     })
  //     .catch((err) => {
  //       toast(err.response.data.message);
  //     });
  // }, []);
  const driverName = localStorage.getItem('email');
  useEffect(() => {
    let idx = 0;
    let req = setInterval(async () => {
      await axios
        .get('http://localhost:5000/driver/trip', { params: { idx } })
        .then(async (data) => {
          if (data.data.userEmail === driverName) {
            await axios
              .get('http://localhost:5000/driver/bookedTrip')
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
      console.log(idx);
    }, 5000);
    setTimeout(() => {
      clearInterval(req);
      console.log('cleared');
      setBookedTrip(null);
    }, 69000);
  }, [driverName]);

  const tripAccept = async (TripId) => {
    localStorage.setItem('tripId', TripId);
    await axios
      .put('http://localhost:5000/driver/confirmTrip', {
        id: TripId,
        assignDriver: driverName,
      })
      .then((data) => {
        localStorage.setItem('accept', data.data.acceptStatus);
        window.location.reload();
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };
  const pickup = async () => {
    await axios
      .put('http://localhost:5000/driver/onTheWay', {
        id: localStorage.getItem('tripId'),
      })
      .then((data) => {
        localStorage.removeItem('accept');
        localStorage.setItem('pickup', data.data.onTheWay);
        window.location.reload();
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };
  const drop = async () => {
    await axios
      .put('http://localhost:5000/driver/endTrip', {
        id: localStorage.getItem('tripId'),
      })
      .then((data) => {
        localStorage.removeItem('pickup');
        localStorage.removeItem('tripId');
        window.location.reload();
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };

  return (
    <div className="driver_dashboard">
      <Sidebar />
      <Header />
      {localStorage.getItem('accept') === 'true' ? (
        <div className="currentTrip">
          <h6>Your Passenger is waiting at pickup location...</h6>
          <button>
            <Link to="/activeTrip">See details of this trip</Link>
          </button>
          <button onClick={pickup}>Pickup complete</button>
        </div>
      ) : localStorage.getItem('pickup') ? (
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
          {bookedTrip == null && (
            <div className=" justify-content-between m-auto text-white">
              <p>No Trip is Available right now.</p>
            </div>
          )}
          {bookedTrip !== null && (
            <div className="driver_notification justify-content-between m-auto">
              <p>{bookedTrip?.userName}</p>
              <h6>from {bookedTrip?.source}</h6>
              <i className="fa-solid fa-arrow-left-long"></i>
              <h5>{bookedTrip?.distance}km</h5>
              <i className="fa-solid fa-arrow-right-long"></i>
              <h6>to {bookedTrip?.destination}</h6>
              <button
                className="d_btn"
                onClick={() => tripAccept(bookedTrip?.id)}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDash;
