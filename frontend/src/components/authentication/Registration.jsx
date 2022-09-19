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

  const [inputState, setInputState] = useState({
    userName: "",
    userEmail: "",
    password: "",
    role: "user",
    // confirmPassword:""
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
          });
          setConfirm("");
          navigate("/login");
        })
        .catch((err) => {
          toast(err.message);
        });
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
                type="text"
                name="userName"
                value={inputState.userName}
                onChange={handleChange}
                fullWclassNameth
                placeholder="Enter a username"
                sx={{
                  wclassNameth: "80%",
                  margin: "40px 0",
                }}
                variant="standard"
              />
              <br />
              <span className="err">{error.userName}</span>
              <br />
              <input
                className="input"
                type="email"
                name="userEmail"
                value={inputState.userEmail}
                onChange={handleChange}
                fullWclassNameth
                placeholder="Enter your email"
                sx={{
                  wclassNameth: "80%",
                  margin: "40px 0",
                }}
                variant="standard"
              />
              <br />
              <span className="err">{error.userEmail}</span>
              <br />

              <input
                className="input"
                type="password"
                name="password"
                value={inputState.password}
                onChange={handleChange}
                fullWclassNameth
                sx={{ wclassNameth: "80%" }}
                placeholder="Create Password"
                variant="standard"
              />
              <br />
              <span className="err">{error.password}</span>
              <br />
              <input
                className="input"
                type="password"
                name="cPassword"
                value={inputState.confirmPassword}
                onChange={handleChange}
                fullWclassNameth
                sx={{ wclassNameth: "80%" }}
                placeholder="Confirm Password"
                variant="standard"
              />
              <br />
              <span className="err">{error.confirm}</span>
              <br />
              <div>
                <label>
                  <b>Role :</b>
                </label>
                <select className="role px-3 py-1" onChange={handleRoleChange}>
                  <option value="user">User</option>
                  <option value="driver">Driver</option>
                </select>
              </div>

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
            <h2>Please Login to get access into goX</h2>
          </div>
        </div>
      </div>
    </>
  );
}
