import React, { useState } from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { toast } from "react-toastify";
import "./form.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const validateEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const validPassword = RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}$/);
  const validVehicle = RegExp(
    /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
  );

  const [inputState, setInputState] = useState({
    userName: "",
    userEmail: "",
    password: "",
    role: "user",
    carModelName: "",
    carNo: "",
    carColor: "",
  });
  const [error, setError] = useState({});
  const [confirm, setConfirm] = useState();
  let name, value;
  const handleChange = (event) => {
    event.persist();
    name = event.target.name;
    value = event.target.value;
    setInputState({ ...inputState, [name]: value });
    setConfirm(event.target.value);
  };

  const handleRoleChange = (e) => {
    setInputState({
      userName: inputState.userName,
      userEmail: inputState.userEmail,
      password: inputState.password,
      role: e.target.value,
      carModelName: inputState.carModelName,
      carNo: inputState.carNo,
      carColor: inputState.carColor,
    });
  };

  const validation = () => {
    let error = {};
    if (!inputState.userName) {
      error.userName = "Username is required";
    } else if (inputState.userName.length < 3) {
      error.userName = "At least 3 characters";
    } else if (/\d/.test(inputState.userName)) {
      error.userName = "Please enter a valid Username";
    }
    if (!inputState.userEmail) {
      error.userEmail = "Email is required";
    } else if (!validateEmail.test(inputState.userEmail)) {
      error.userEmail = "Invalid Email";
    }
    if (!inputState.password) {
      error.password = "Enter password";
    }
    // else if (!validPassword.test(inputState.password)) {
    //   error.password =
    //     "atleast 1 uppercase 1 lowercase and 1 number minimum 8 characters";
    // }
    if (!confirm) {
      error.confirm = "Confirm password";
    } else if (inputState.password !== confirm && confirm.length > 0) {
      error.confirm = "password doesn't match";
    }
    if (inputState.role === "driver") {
      if (!inputState.carModelName) {
        error.carModelName = "Enter Model Name of your vehicle";
      }
      if (!inputState.carColor) {
        error.carColor = "Enter Color of your vehicle";
      }
      if (!inputState.carNo) {
        error.carNo = "Enter your vehicle number";
      // } else if (!validVehicle.test(inputState.carNo)) {
        // error.carNo = "Enter a valid Indian Vehicle Number";
      }
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
      axios
        .post("http://localhost:5000/register", inputState, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          swal("Good job!", "Your Registration is successful", "success");
          setInputState({
            userName: "",
            userEmail: "",
            password: "",
            role: "user",
            carModelName: "",
            carNo: "",
            carColor: "",
          });
          setConfirm("");
          navigate("/login");
        })
        .catch((err) => {
          toast(err.response.data.message);
        });
    }
  };

  return (
    <>
      <div className="flex">
        <div className="logo_bg">
          <div className="Registration">
            <form className="form">
              <h4 className="text-center">SignUp</h4>

              <input
                className="input"
                type="text"
                name="userName"
                value={inputState.userName}
                onChange={handleChange}
                placeholder="Enter a username"
                variant="standard"
              />
              <br />
              <span className="error">{error.userName}</span>
              <br />
              <input
                className="input"
                type="email"
                name="userEmail"
                value={inputState.userEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                variant="standard"
              />
              <br />
              <span className="error">{error.userEmail}</span>
              <br />

              <input
                className="input"
                type="password"
                name="password"
                value={inputState.password}
                onChange={handleChange}
                placeholder="Create Password"
                variant="standard"
              />
              <br />
              <span className="error">{error.password}</span>
              <br />
              <input
                className="input"
                type="password"
                name="cPassword"
                value={inputState.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                variant="standard"
              />
              <br />
              <span className="error">{error.confirm}</span>
              <br />
              <div>
                <label>
                  <b className="text-white">Role :</b>
                </label>
                <select className="role px-3 py-1" onChange={handleRoleChange}>
                  <option value="user">User</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              {inputState.role === "driver" && (
                <div className="d-block">
                  <input
                    className="input"
                    type="text"
                    name="carModelName"
                    value={inputState.carModelName}
                    onChange={handleChange}
                    placeholder="Vehicle Model Name"
                    variant="standard"
                  />
                  <br />
                  <span className="error">{error.carModelName}</span>
                  <br />
                  <input
                    className="input"
                    type="text"
                    name="carColor"
                    value={inputState.carColor}
                    onChange={handleChange}
                    placeholder="Vehicle Color"
                    variant="standard"
                  />
                  <br />
                  <span className="error">{error.carColor}</span>
                  <br />
                  <input
                    className="input"
                    type="text"
                    name="carNo"
                    value={inputState.carNo}
                    onChange={handleChange}
                    placeholder="Vehicle Number"
                    variant="standard"
                  />
                  <br />
                  <span className="error">{error.carNo}</span>
                  <br />
                </div>
              )}

              <br />
              <Button
                className="logBtn"
                onClick={submitHandler}
                variant="contained"
                type="submit"
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
            <h2>Please Login to get access into goX</h2>
          </div>
        </div>
      </div>
    </>
  );
}
