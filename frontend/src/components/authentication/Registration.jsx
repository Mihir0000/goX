import React, { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";

import swal from "sweetalert";
import "./form.css";

import { Link, useNavigate } from "react-router-dom";
// import Header from "../header/Header";
import { Paper, input } from "@mui/material";

export default function Registration() {
  
  const validateEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  const validation = () => {
    let error = {};
    if (!inputState.email) {
      error.email = "Email is required";
    }
    if (!inputState.password) {
      error.password = "Enter password";
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
      localStorage.setItem("email", inputState.email);
      localStorage.setItem("password", inputState.password);
      localStorage.setItem("status", true);
      swal(
        "Good job!",
        "A Verification Code has been sent to your email",
        "success"
      );
      navigate("/verification");
    }
  };

  return (
    <>
      <div className="flex">
        <div className="logo_bg">
          <div className="login">
            <form className="form">
              <h4 className="text-center">SignUp</h4>

              <input
                className="input"
                type="email"
                name="email"
                value={inputState.email}
                onChange={handleChange}
                fullWclassNameth
                placeholder="Email"
                sx={{
                  wclassNameth: "80%",
                  margin: "40px 0",
                }}
                variant="standard"
              />
              <p className="Lerror">{error.email}</p>

              <input
                className="input"
                type="password"
                name="password"
                value={inputState.password}
                onChange={handleChange}
                fullWclassNameth
                sx={{ wclassNameth: "80%" }}
                placeholder="Password"
                variant="standard"
              />
              <p className="Lerror">{error.password}</p>

              <br />
              <Button
                className="logBtn"
                onClick={submitHandler}
                variant="contained"
              >
                SignUp
              </Button>
              <br></br>
              <Link to="/login" className="link">
                Already have an account? Login Now
              </Link>
            </form>
          </div>
          <div className="flex2">
            <h2>Please Login to get access into CabService</h2>
          </div>
        </div>
      </div>
    </>
  );
}
