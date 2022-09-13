import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { Grid } from "@mui/material";
import { useEffect } from "react";

const Controls = () => {
  const basePriceRef = useRef();
  const rainRef = useRef();
  const frostRef = useRef();
  const [basePrice, setBasePrice] = useState();
  const [weather, setWeather] = useState();
  console.log(weather, "ww");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const date = today.getDate();
  const month = monthNames[today.getMonth()];
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const setPrice = () => {
    const userEmail = localStorage.getItem("email");
    const basePrice = basePriceRef.current.value;
    if (basePrice < 1) {
      console.log("Base Price cannot set negetive or Zero");
      return;
    }
    const isRain = rainRef.current.checked;
    const isFrost = frostRef.current.checked;
    console.log(userEmail, basePrice, isRain, isFrost);
    const data = { userEmail, basePrice, isRain, isFrost };
    axios
      .post("http://localhost:5000/admin/setPrice", data)
      .then(() => {
        console.log("Set Successfullly");
        setBasePrice("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
    params: { lon: "88.3639", lat: "22.572645" },
    headers: {
      "X-RapidAPI-Key": "048a1a5b24msh24b365ebe7904b1p12b4aajsn43e42c3057d4",
      "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      setWeather(response?.data?.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div className="controls_container">
      <Sidebar />

      <div className="mb-3">
        <h3>Hey! Do You want to update todays price?</h3>
      </div>
      <div className="control_card container">
        {/* weather card */}

        <div className="w_card">
          <h2 className="ml-auto mr-4 mt-3 mb-0">{weather?.city_name}</h2>
          <p className="ml-auto mr-4 mb-0 med-font">
            {weather?.weather?.description}
          </p>
          <h1 className="ml-auto mr-4 large-font">{weather?.temp}</h1>
          <p className="time-font mb-0 ml-4 mt-auto">
            {time} <span className="sm-font">AM</span>
          </p>
          <p className="ml-4 mb-4">
            {month} {date}
          </p>
        </div>

        {/* End weather card */}

        <div className="controls">
          <div className="d-flex justify-content-between pb-5 mt-2">
            <h5>Is today Frosty?</h5>
            <Form.Check type="switch" id="custom-switch" ref={frostRef} />
          </div>
          <div className="d-flex justify-content-between pb-5">
            <h5>Is Today Rainy?</h5>
            <Form.Check type="switch" id="custom-switch" ref={rainRef} />
          </div>
          <div className="d-flex justify-content-between pb-5">
            <h5>Today's Base Price?</h5>
            
              <input
                type="number"
                min="1"
                ref={basePriceRef}
                className="basePriceInput"
                value={basePrice}
              />/km
            
          </div>
          <button className="setPriceBtn" onClick={setPrice}>
            Set Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
