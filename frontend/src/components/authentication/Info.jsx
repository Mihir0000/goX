import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./form.css";

export const Info = () => {
  const [inputState, setInputState] = useState({
    username: "",
    dob: "",
    address: "",
  });
  const [checked1, setchecked1] = useState(false);
  const [checked2, setchecked2] = useState(false);
  const [error, setError] = useState({});
  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  const validation = () => {
    let error = {};
    if (!inputState.username) {
      error.username = "Please Enter username";
    }
    if (!inputState.dob) {
      error.dob = "Enter your Date of Birth";
    }
    if (!inputState.address) {
      error.address = "Enter your Address";
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
      localStorage.setItem("username", inputState.username);
      localStorage.setItem("dob", inputState.dob);
      // localStorage.setItem("gender", inputState.gender);
      localStorage.setItem("address", inputState.address);
      
      if (checked1 === true) {
        // localStorage.removeItem("gender");
        localStorage.setItem("gender", "Male");
      }
      if (checked2 === true) {
        // localStorage.removeItem("gender");
        localStorage.setItem("gender", "Female");
      }
      swal("Registration Successful", "Login your account now", "success");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (checked1 === true) {
      // localStorage.removeItem("gender");
      localStorage.setItem("gender", "Male");
    }
    if (checked2 === true) {
      // localStorage.removeItem("gender");
      localStorage.setItem("gender", "Female");
    }
  }, [checked1, checked2]);

  return (
    <div className="flex_otp">
      <div className="logo_otp">
        <div className="otp_body">
          <form className="otp_form">
            <p id="heading">Additional Information</p>
            <input
              className="input"
              type="text"
              name="username"
              value={inputState.username}
              onChange={handleChange}
              fullWidth
              placeholder="Username"
              sx={{
                width: "80%",
                margin: "40px 0",
              }}
              variant="standard"
            />
            <p className="Lerror">{error.username}</p>
            <div id="radio">
              <p id="gender_text">Select your Gender</p>
              <label for="gender">Male</label>
              <input
                className="g"
                type="radio"
                name="gender"
                onChange={() => {
                  setchecked1(!checked1);
                }}
              />
              <label for="gender">Female</label>
              <input
                type="radio"
                name="gender"
                className="g"
                onChange={() => {
                  setchecked2(!checked2);
                }}
              />
            </div>
            <input
              className="input"
              type="text"
              name="dob"
              value={inputState.dob}
              onChange={handleChange}
              fullWidth
              placeholder="Date of Birth"
              sx={{
                width: "80%",
                margin: "40px 0",
              }}
              variant="standard"
            />
            <p className="Lerror">{error.dob}</p>
            <input
              className="input"
              type="text"
              name="address"
              value={inputState.address}
              onChange={handleChange}
              fullWidth
              placeholder="Address"
              sx={{
                width: "80%",
                margin: "40px 0",
              }}
              variant="standard"
            />
            <p className="Lerror">{error.address}</p>
            <Button className="otpBtn" onClick={submitHandler}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
