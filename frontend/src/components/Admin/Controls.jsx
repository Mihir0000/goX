import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../sharedModule/Sidebar";
import { Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { Header } from "../header/Header";
import { toast } from "react-toastify";

const Controls = () => {
  const basePriceRef = useRef();
  const rainRef = useRef();
  const frostRef = useRef();
  const rainParcentRef = useRef();
  const frostParcentRef = useRef();
  const [basePrice, setBasePrice] = useState();
  const [frost, setFrost] = useState(false);
  const [rain, setRain] = useState(false);
  const [rainParcent, setRainParcent] = useState(0);
  const [frostParcent, setFrostParcent] = useState(0);
  const [carInfo, setCarInfo] = useState();
  const [carType, setCarType] = useState()

  const carTypeChange = (e) => {
    setBasePrice(e.target.value);
    console.log(carInfo);
  };
  const basePriceChange = (e) => {
    setBasePrice(e?.target.value)
    
  }
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

  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [format, setFormat] = useState();

  function showTime() {
    let date = new Date();
    let hours = date.getHours(); //0-23
    let minutes = date.getMinutes(); //0-59
    let seconds = date.getSeconds(); //0-59

    setFormat(convertFormat(hours));
    hours = checkTime(hours);

    setHour(addZero(hours));
    setMinute(addZero(minutes));
    setSecond(addZero(seconds));
  }
  function convertFormat(time) {
    let format = "AM";
    if (time >= 12) {
      format = "PM";
    }
    return format;
  }

  function checkTime(time) {
    if (time > 12) {
      time = time - 12;
    }
    if (time === 0) {
      time = 12;
    }
    return time;
  }

  function addZero(time) {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  }

  setInterval(showTime, 1000);

  const today = new Date();
  const date = today.getDate();
  const month = monthNames[today.getMonth()];
  const rainChange = (e) => {
    e.target.checked ? setRain(true) : setRain(false);
  };
  const frostChange = (e) => {
    e.target.checked ? setFrost(true) : setFrost(false);
  };
  const rainParcentHandle = () => {
    setRainParcent(rainParcentRef.current.value);
  };
  const frostParcentHandle = () => {
    setFrostParcent(frostParcentRef.current.value);
  };
  const setPrice = () => {
    const userEmail = localStorage.getItem("email");
    const basePrice = basePriceRef.current.value;
    if (basePrice < 1) {
      toast("Base Price cannot set negetive or Zero");
      return;
    }
    const isRain = rainRef.current.checked;
    const isFrost = frostRef.current.checked;
    const data = {
      userEmail,
      basePrice,
      rain: isRain,
      frost: isFrost,
      rainParcent,
      frostParcent,
      carType,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/admin/setPrice", data)
      .then((data) => {
        console.log(data);
        swal("Price Set Successfullly");
        setBasePrice("");
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/admin/setPrice").then((data) => {
      setCarInfo(data.data.carInfo);
      setRain(data.data.rain);
      setFrost(data.data.frost);
      setRainParcent(data.data.rainParcent);
      setFrostParcent(data.data.frostParcent);
    });
  }, []);
  // console.log(carInfo);

  return (
    <div className="controls_container">
      <Sidebar />
      <Header />
      <div className="mb-3">
        <h3>Hey! Do You want to update todays price?</h3>
      </div>
      <div className="control_card container">
        {/* weather card */}

        <div className="w_card">
          <p className="time-font mb-0 ml-4  mt-5">
            {hour} : {minute} : {second}{" "}
            <span className="sm-font">{format}</span>
          </p>
          <p className="ml-4 mb-4">
            {month} {date}
          </p>
        </div>

        {/* End weather card */}

        <div className="controls">
          <div className="d-flex justify-content-between pb-5 mt-2">
            <h5>Is today Frosty?</h5>
            <div>
              <input
                type="number"
                className="rainFrostInput"
                ref={frostParcentRef}
                onChange={frostParcentHandle}
                value={frostParcent}
                disabled={!frost}
              />
              <span> %</span>
            </div>
            <Form.Check
              type="switch"
              id="custom-switc"
              ref={frostRef}
              value={frost}
              checked={frost}
              onChange={frostChange}
            />
          </div>
          <div className="d-flex justify-content-between pb-5">
            <h5>Is Today Rainy?</h5>

            <div>
              <input
                type="number"
                className="rainFrostInput"
                onChange={rainParcentHandle}
                ref={rainParcentRef}
                value={rainParcent}
                disabled={!rain}
              />
              <span> %</span>
            </div>
            <Form.Check
              type="switch"
              id="custom-switch"
              ref={rainRef}
              value={rain}
              checked={rain}
              onChange={rainChange}
            />
          </div>
          <div className="pb-5 base_price">
            <h5>Today's Base Price</h5>

            <div className="d-flex justify-content-between mt-3 cartype_price">
              <select className="px-3 py-1 " onChange={carTypeChange}>
                <option selected>Car Types</option>
                {carInfo?.map((e, index) => (
                  <option value={e?.basePrice} key={index}>
                    {e?.carType}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="number"
                  min="1"
                  ref={basePriceRef}
                  className="basePriceInput"
                  onChange={basePriceChange}
                  value={basePrice}
                />
                ₹/km
              </div>
            </div>
            <button>Add Car Type</button>
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
