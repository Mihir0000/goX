import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Bnav } from "../nav/Bnav";
import "./ride.css";

export const Ride1 = () => {
  const [ischecked1, setischecked1] = useState(false);
  const [ischecked2, setischecked2] = useState(false);
  const [ischecked3, setischecked3] = useState(false);
  const [ischecked4, setischecked4] = useState(false);
  const [ischecked5, setischecked5] = useState(false);
  const [ischecked6, setischecked6] = useState(false);
  const [ischecked7, setischecked7] = useState(false);
  console.log("ischecked", ischecked1, ischecked2, ischecked3);

  useEffect(() => {
    if (ischecked1 === true) {
      localStorage.setItem("checked1", "Taxi");
    } else if (ischecked1 === false) {
      localStorage.removeItem("checked1");
    }
    if (ischecked2 === true) {
      localStorage.setItem("checked2", "Cab Pool");
    } else if (ischecked2 === false) {
      localStorage.removeItem("checked2");
    }
    if (ischecked3 === true) {
      localStorage.setItem("checked3", "Cab XL");
    } else if (ischecked3 === false) {
      localStorage.removeItem("checked3");
    }
    if (ischecked4 === true) {
      localStorage.setItem("checked4", "Luxary Car");
    } else if (ischecked4 === false) {
      localStorage.removeItem("checked4");
    }
    if (ischecked5 === true) {
      localStorage.setItem("checked5", "Intercity");
    } else if (ischecked5 === false) {
      localStorage.removeItem("checked5");
    }
    if (ischecked6 === true) {
      localStorage.setItem("checked6", "Bike");
    } else if (ischecked6 === false) {
      localStorage.removeItem("checked6");
    }
    if (ischecked7 === true) {
      localStorage.setItem("checked7", "Ride Sharing");
    } else if (ischecked7 === false) {
      localStorage.removeItem("checked7");
    }
  }, [
    ischecked1,
    ischecked2,
    ischecked3,
    ischecked4,
    ischecked5,
    ischecked6,
    ischecked7,
  ]);

  return (
    <div className="ride_body">
      <div className="ride_logo">
        <form className="ride_form">
          <h5>Select Preferable Ride</h5>
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle1"
            name="ischecked"
            value="Taxi"
            onChange={() => {
              setischecked1(!ischecked1);
            }}
          />
          <label for="vehicle1" className="ride_label">
            Taxi
          </label>
          <br />
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle2"
            name="ischecked"
            value="Ola/Uber"
            onChange={() => {
              setischecked2(!ischecked2);
            }}
          />
          <label for="vehicle2" className="ride_label">
            Cab Pool
          </label>
          <br />
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle3"
            name="ischecked"
            value="CarPooling"
            onChange={() => {
              setischecked3(!ischecked3);
            }}
          />
          <label for="vehicle3" className="ride_label">
            Cab XL
          </label>
          <br />
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle3"
            name="ischecked"
            value="Auto"
            onChange={() => {
              setischecked4(!ischecked4);
            }}
          />
          <label for="vehicle4" className="ride_label">
            Luxary Car
          </label>
          <br />
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle4"
            name="ischecked"
            value="Toto"
            onChange={() => {
              setischecked5(!ischecked5);
            }}
          />
          <label for="vehicle5" className="ride_label">
            Intercity
          </label>
          <br />
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle5"
            name="ischecked"
            value="Bike"
            onChange={() => {
              setischecked6(!ischecked6);
            }}
          />
          <label for="vehicle3" className="ride_label">
            Bike
          </label>
          <br />
          <input
            className="ride_input"
            type="checkbox"
            id="vehicle6"
            name="ischecked"
            value="Ride Sharing"
            onChange={() => {
              setischecked7(!ischecked7);
            }}
          />
          <label for="vehicle7" className="ride_label">
            Ride Sharing
          </label>
          <br />
          <Button
            href="/location"
            className="ride_btn"
            type="submit"
            value="Submit"
          >
            Next
          </Button>
        </form>
      </div>
      <Bnav />
    </div>
  );
};
