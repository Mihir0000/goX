import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Header } from "../header/Header";
import { Bnav } from "../nav/Bnav";
import "./ride.css";
import { toast } from "react-toastify";

export const Ride = () => {
  const [inputState, setInputState] = useState({
    userEmail: localStorage.getItem("email"),
    source: "",
    destination: "",
    distance: 0,
    carType: "",
  });

  const [cars, setCars] = useState([]);
  const [admin, setAdmin] = useState();
  const [error, setError] = useState({});
  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };

  const validation = () => {
    let error = {};
    if (!inputState.source) {
      error.source = "Please Enter pickup location";
    }
    if (!inputState.destination) {
      error.destination = "Please Enter drop location";
    }
    // if (!inputState.carType) {
    //   error.carType = "Select a car type";
    // }
    // if (!inputState.distance) {
    //   error.distance = "please confirm pickup and drop location";
    // }

    return error;
  };

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const distanceHandler = (event) => {
    event.preventDefault();
    if (inputState.source && inputState.destination) {
      setInputState({
        userEmail: localStorage.getItem("email"),
        source: inputState.source,
        destination: inputState.destination,
        distance: randomNumberInRange(1, 200),
      });
      axios
        .get("http://localhost:5000/admin/setPrice")
        .then((data) => {
          setCars(data?.data?.carInfo);
        })
        .catch((err) => {
          toast(err.response.data.message);
        });
    } else {
      toast("Please Enter pickup and drop location");
    }
  };

  const navigate = useNavigate();
  const bookingHandler = (event) => {
    event.preventDefault();
    let ErrorList = validation();
    setError(validation());
    if (Object.keys(ErrorList).length !== 0 || inputState.distance === 0) {
      
        toast("please confirm pickup and drop location");
      
    } else {
      axios
        .post("http://localhost:5000/trip", inputState, {
        })
        .then((res) => {
          swal("Ride Booked !", "Happy Journey", "success");
          setInputState({
            source: "",
            destination: "",
            distance: "",
            carType: "",
          });
          navigate("/booking_status");
        })
        .catch((err) => {
          toast("Select your prefereble car type");
        });
    }
  };


  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/totalData")
      .then((data) => {
        setAdmin(data.data[0]);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  }, []);

  const calculatePrice = (basePrice) => {
    const isRainPrice = admin.rain ? (basePrice * admin.rainParcent) / 100 : 0;
    const isFrostPrice = admin.frost
      ? (basePrice * admin.frostParcent) / 100
      : 0;
    const day = new Date().getDay();
    const isWeekend = day === 0 || day === 6 ? basePrice * 0.3 : 0;
    const price = parseFloat(
      inputState.distance * (basePrice + isRainPrice + isFrostPrice + isWeekend)
    ).toFixed(0);
    return price;
  };

  const handleCarClick = (carType) => {
    setInputState({
      userEmail: localStorage.getItem("email"),
      source: inputState.source,
      destination: inputState.destination,
      distance: inputState.distance,
      carType: carType,
    });
  };
  return (
    <div className="ride_body">
      <Header />
      <div className="ride_logo">
        <form className="ride_form">
          <h5>Select Preferable Ride</h5>
          <div>
            <div className="location">
              <input
                className="location_input"
                type="text"
                name="source"
                value={inputState.source}
                onChange={handleChange}
                placeholder="Pickup Location"
                variant="standard"
              />

              <p className="error">{error.source}</p>
              <input
                className="location_input"
                type="text"
                name="destination"
                value={inputState.destination}
                onChange={handleChange}
                placeholder="Drop Location"
                variant="standard"
              />
              <p className="error">{error.destination}</p>
              <br />
            </div>
            <div>
              {inputState.distance === 0 ? (
                <button className="confirmPickup" onClick={distanceHandler}>
                  Confirm Pickup and Drop Location
                </button>
              ) : (
                <p className="text-center">
                  Total Distance:{` ${inputState.distance} Km`}
                </p>
              )}
            </div>
            <div className="car_type row">
              {cars?.map((e, index) => (
                <div
                  key={index}
                  className={
                    "row p-2 m-1 carCard " +
                    (inputState.carType === e?.carType ? "active" : "")
                  }
                  onClick={() => handleCarClick(e?.carType)}
                >
                  <div className="d-flex justify-content-between px-3 py-1">
                    <div>
                      <span className="car_name text-capitalize">
                        {e?.carType}
                      </span>
                      <p className="car_des">{e?.description}</p>
                    </div>
                    <h6>
                      <b>₹{calculatePrice(e?.basePrice)}</b>
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              className="ride_btn"
              type="submit"
              value="Submit"
              onClick={bookingHandler}
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
      <Bnav />
    </div>
  );
};
