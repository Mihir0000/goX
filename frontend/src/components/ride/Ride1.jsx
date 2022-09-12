import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Bnav } from "../nav/Bnav";
import "./ride.css";

export const Ride1 = () => {
  const services = [
    {
      Name: "Car Pool",
      des: "For maximum 4 people"
    },
    {
      Name: "Luxary Car",
      des: "A luxary car for maximum 4 people"
    },
    {
      Name: "Car Prime",
      des: "For maximum 6 people"
    },
    {
      Name: "Bike",
      des: "Bike service for one person"
    },
  ]
  const [inputState, setInputState] = useState({
    userEmail: localStorage.getItem('email'),
    source: "",
    destination: "",
    distance: "",
    carType: "",
  });

  console.log(inputState, 'inputState');
  const [error, setError] = useState({});
  // console.log("error", error);
  let name, value;
  const handleChange = (event) => {
    // event.persist();
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  // const handleCarType = (c) => {

  // }
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
          console.log("Axios res: ", res);
          swal("Ride Booked !", "Happy Journey", "success");
          window.localStorage.setItem("email", inputState.userEmail)
          setInputState({
            userEmail: "",
            password: "",
          });
          navigate("/bookings");
        })
        .catch((err) => {
          console.log(err);
          swal("wrong email or password");
        });
    }
  };



  console.log(services?.Name, "services");
  return (
    <div className="ride_body">
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
                fullWclassNameth
                placeholder="Pickup Location"
                sx={{
                  wclassNameth: "80%",
                  margin: "40px 0",
                }}
                variant="standard"
              />
              <p className="error">{error.source}</p>

              <input
                className="location_input"
                type="text"
                name="destination"
                value={inputState.destination}
                onChange={handleChange}
                fullWclassNameth
                sx={{ wclassNameth: "80%" }}
                placeholder="Drop Location"
                variant="standard"
              />
              <p className="error">{error.destination}</p>
              <br />
            </div>
            <div className="car_type">
              {services?.map((e) => (
                <label>
                  <input type="radio" name="carType" value={e?.Name} onChange={handleChange} />
                  {e?.Name}
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
