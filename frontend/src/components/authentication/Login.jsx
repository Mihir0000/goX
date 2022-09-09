import React, { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

export default function Login() {
  const validateEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const [inputState, setInputState] = useState({
    userEmail: "",
    password: "",
  });
  const [error, setError] = useState({});
  // console.log("error", error);
  let name, value;
  const handleChange = (event) => {
    // event.persist();
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  const validation = () => {
    let error = {};
    if (!inputState.userEmail) {
      error.userEmail = "Email is required";
    } else if (!validateEmail.test(inputState.userEmail)) {
      error.userEmail = "Invalid Email";
    }
    if (!inputState.password) {
      error.password = "Enter password";
      // } else if (!valclassNamePassword.test(inputState.password)) {
      //   error.password = "atleast 1 uppercase 1 lowercase and 1 number minimum 8 characters";
    }

    return error;
  };

  const navigate = useNavigate();
  // console.log(value,"value");

  const submitHandler = (event) => {
    // event.preventDefault();
    let ErrorList = validation();
    setError(validation());
    // navigate("/home");
    if (Object.keys(ErrorList).length !== 0) {
    } else {
      axios
        .post("http://localhost:5000/login", inputState, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("Axios res: ", res);
          // swal("Yayy! Login Successful!", "Enjoy your ride", "success");
          window.localStorage.setItem("email", inputState.userEmail)
          setInputState({
            userEmail: "",
            password: "",
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          swal("wrong email or password");
        });
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
                name="userEmail"
                value={inputState.userEmail}
                onChange={handleChange}
                fullWclassNameth
                placeholder="Email"
                sx={{
                  wclassNameth: "80%",
                  margin: "40px 0",
                }}
                variant="standard"
              />
              <p className="Lerror">{error.userEmail}</p>

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
            <h2>Please Login to get access into goX</h2>
          </div>
        </div>
      </div>
    </>
  );
}
