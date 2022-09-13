import React, { useRef } from "react";
import Sidebar from "./Sidebar";
import { Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { Grid } from "@mui/material";

const Controls = () => {
  const basePriceRef = useRef();
  const rainRef = useRef();
  const frostRef = useRef();
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="controls_container">
      <Sidebar />
      <div>
        <h3>
          {month} {date}
        </h3>
      </div>

      <div className="mb-3">
        <h3>Hey! Do You want to update todays price?</h3>
      </div>
      <div className="control_card container">
        {/* weather card */}

        <div className="w_card">
          <h2 className="ml-auto mr-4 mt-3 mb-0">Toronto</h2>
          <p className="ml-auto mr-4 mb-0 med-font">Snow</p>
          <h1 className="ml-auto mr-4 large-font">-20&#176;</h1>
          <p className="time-font mb-0 ml-4 mt-auto">
            08:30 <span className="sm-font">AM</span>
          </p>
          <p className="ml-4 mb-4">Wednesday, 18 October 2019</p>
        </div>

        {/* End weather card */}

        <div className="controls">
          {/* <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} style={{textAlign:"left"}}>
            <h5>Is today Frosty?</h5>
            <h5>Is Today Rainy?</h5>
            <h5>Today's Base Price?</h5>
            </Grid>
            <Grid item xs={6} style={{justifyItems:"right"}}>
            <Form.Check type="switch" id="custom-switch" className="switches" ref={frostRef} />
            <Form.Check type="switch" id="custom-switch" className="switches"ref={rainRef} />
            <input
              type="number"
              ref={basePriceRef}
              className="switches"
            />
            </Grid>
          </Grid> */}
          <div className="d-flex justify-content-between">
            <h5>Is today Frosty?</h5>
            <Form.Check type="switch" id="custom-switch" ref={frostRef} />
          </div>
          <div className="d-flex justify-content-between">
            <h5>Is Today Rainy?</h5>
            <Form.Check type="switch" id="custom-switch" ref={rainRef} />
          </div>
          <div className="d-flex justify-content-between">
            <h5>Today's Base Price?</h5>
            <input
              type="number"
              ref={basePriceRef}
              className="basePriceInput"
            />
          </div>
          <button className="setPriceBtn" onClick={setPrice}>
            Set Price
          </button>
        </div>
      </div>

      {/* <div>
        <Container className="border shadow py-5 bg-white text-muted">
          <Row>
            <Col className="col-4"></Col>
            <Col className="col-4"></Col>
            <Col className="col-4"></Col>
          </Row>
          <div></div>
        </Container>
      </div> */}
    </div>
  );
};

export default Controls;
