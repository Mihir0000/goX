import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Bnav } from "../nav/Bnav";
import "./ride.css";
// import LocationPicker from 'react-location-picker';

export const Ride1 = () => {
  const services = [
    {
      Name: "Car Pool",
      des: "For maximum 4 people",
    },
    {
      Name: "Luxary Car",
      des: "A luxary car for maximum 4 people",
    },
    {
      Name: "Car Prime",
      des: "For maximum 6 people",
    },
    {
      Name: "Bike",
      des: "Bike service for one person",
    },
  ];
  const [inputState, setInputState] = useState({
    userEmail: localStorage.getItem("email"),
    source: "",
    destination: "",
    distance: "",
    carType: "",
  });

  // console.log(inputState, "inputState");
  // const [location, setLocation] = useState({
  //   address: "",
  //   position: {
  //     lat: 0,
  //     lng: 0
  //   }
  // })


  const [error, setError] = useState({});
  let name, value;
  const handleChange = (event) => {
    // event.persist();
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  const serviceChange = (e) => {




    setInputState({
      userEmail: localStorage.getItem("email"),
      source: inputState.source,
      destination: inputState.destination,
      distance: inputState.distance,
      carType:  e.target.value,
    });
      // console.log(inputState);
  }

  console.log( "dfdf",inputState);
  const validation = () => {
    let error = {};
    if (!inputState.source) {
      error.source = "Please Enter pickup location";
    }
    if (!inputState.destination) {
      error.destination = "Please Enter drop location";
    }
    if (!inputState.carType) {
      error.carType = "Select a car type";
    }
    if (!inputState.distance) {
      error.distance = "please confirm pickup and drop location";
    }

    return error;
  };

  const navigate = useNavigate();
  const bookingHandler = (event) => {
    event.preventDefault();
    let ErrorList = validation();
    setError(validation());
    if (Object.keys(ErrorList).length !== 0) {
    } else {
      axios
        .post("http://localhost:5000/trip", inputState, {
          // headers: {
          //   "Content-Type": "application/json",
          // },
        })
        .then((res) => {
          // console.log("Axios res: ", res);
          swal("Ride Booked !", "Happy Journey", "success");
          setInputState({
            source: "",
            destination: "",
            distance: "",
            carType: "",
          });
          navigate("/bookings");
        })
        .catch((err) => {
          console.log(err);
          swal("wrong email or password");
        });
    }
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
        distance: randomNumberInRange(1, 500),
      });
    } else {
      swal("Please Enter pickup and drop location");
    }
  };
  console.log(inputState.distance);

  return (
    <div className="ride_body" style={{height:"100vh"}}>
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
              <button onClick={distanceHandler}>
                Confirm Pickup and Drop Location
              </button>
              <p>
                Total Distance:{inputState.distance}km
                {/* <input
                className="location_input"
                type="text"
                name="distance"
                value={inputState.distance}
                placeholder="Drop Location"
                variant="standard"
                /> */}
              </p>
            </div>
            <div className="car_type">
              {services?.map((e, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="carType"
                    value={e.Name}
                    onChange={serviceChange}
                  />
                  {e.Name}
                </label>
              ))}
            </div>
          </div>
          <br />
          <Button
            className="ride_btn"
            type="submit"
            value="Submit"
            onClick={bookingHandler}
          >
            Confirm
          </Button>
        </form>
      </div>
      <Bnav />
    </div>
  );
};
