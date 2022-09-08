import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Bnav } from "../nav/Bnav";
import "./ride.css";

export const Ride2 = () => {
  const [inputState, setInputState] = useState({
    from: "",
    to: "",
  });
  const [count, setCount] = useState(0);
  const inc=()=>{
    setCount(count+1);
  }
  const dec=()=>{
    if(count>0)
    setCount(count-1);
  }
  const [error, setError] = useState({});
  console.log("error", error);
  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  const validation = () => {
    let error = {};
    if (!inputState.from) {
      error.from = "Enter Pickup Location";
    }
    if (!inputState.to) {
      error.to = "Enter drop location";
    }

    return error;
  };

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    let ErrorList = validation();
    setError(validation());
    if (Object.keys(ErrorList).length !== 0) {
    } else {
      swal("Ride Booked !", "Happy Journey", "success");
      localStorage.setItem("from", inputState.from);
      localStorage.setItem("to", inputState.to);
      localStorage.setItem("person", count);
      navigate("/bookings");
    }
  };

  return (
    <div className="ride_body">
      <div className="ride_logo">
        <form className="ride_form">
          <h5>Enter Details</h5>
          {/* <div>
            <button onClick={inc}>+</button>
            {count}
            <button onClick={dec}>-</button>
          </div> */}
          <input
            className="location_input"
            type="text"
            name="from"
            value={inputState.from}
            onChange={handleChange}
            fullWclassNameth
            placeholder="Pickup Location"
            sx={{
              wclassNameth: "80%",
              margin: "40px 0",
            }}
            variant="standard"
          />
          <p className="error">{error.from}</p>

          <input
            className="location_input"
            type="text"
            name="to"
            value={inputState.password}
            onChange={handleChange}
            fullWclassNameth
            sx={{ wclassNameth: "80%" }}
            placeholder="Drop Location"
            variant="standard"
          />
          <p className="error">{error.to}</p>

          <br />

          <Button
            className="ride2_btn"
            type="submit"
            value="Submit"
            onClick={submitHandler}
          >
            Book
          </Button>
        </form>
      </div>
      <Bnav />
    </div>
  );
};
