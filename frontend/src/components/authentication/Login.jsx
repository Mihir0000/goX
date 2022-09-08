import React, { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Login() {
 
  const validateEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  

  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
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
    if (!inputState.email) {
      error.email = "Email is required";
    } else if (!validateEmail.test(inputState.email)) {
      error.email = "InvalclassName Email";
    }
    if (!inputState.password) {
      error.password = "Enter password";
      // } else if (!valclassNamePassword.test(inputState.password)) {
      //   error.password = "atleast 1 uppercase 1 lowercase and 1 number minimum 8 characters";
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
      if (
        localStorage.getItem("email") === inputState.email &&
        localStorage.getItem("password") === inputState.password
      ) {
        swal("Login Successfull !", "Enjoy your Ride", "success");
        sessionStorage.setItem("email", inputState.email);
        sessionStorage.setItem("password", inputState.password);
        navigate("/");
      } else  {
        swal("Email or password doesn't match");
      }
    }
  };

  return (
    <>
      <div className="flex">
        <div className="logo_bg">
          <div className="login">
            <form className="form">
              <h4 className="text-center">Login</h4>

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
                Login
              </Button>
              <br></br>
              <Link to="/signup" className="link">
                Doesn't have an account? SignUp Now
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
