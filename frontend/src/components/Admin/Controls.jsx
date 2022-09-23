import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../sharedModule/Sidebar';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { Header } from '../header/Header';
import { toast } from 'react-toastify';

const Controls = () => {
  const basePriceRef = useRef();
  const rainRef = useRef();
  const frostRef = useRef();
  const rainParcentRef = useRef();
  const frostParcentRef = useRef();
  const addCarTypeRef = useRef();
  const addCarPriceRef = useRef();
  const addCarDescriptionRef = useRef();
  const [basePrice, setBasePrice] = useState();
  const [frost, setFrost] = useState(false);
  const [rain, setRain] = useState(false);
  const [rainParcent, setRainParcent] = useState(0);
  const [frostParcent, setFrostParcent] = useState(0);
  const [carInfo, setCarInfo] = useState();
  const [carType, setCarType] = useState();
  const [newCar, setNewCar] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newDescription, setNewDescription] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newCarTypeChange = () => {
    setNewCar(addCarTypeRef.current.value);
  };
  const newPriceChange = (e) => {
    setNewPrice(addCarPriceRef.current.value);
  };
  const newDescriptionChange = (e) => {
    setNewDescription(addCarDescriptionRef.current.value);
  };

  const carTypeChange = (e) => {
    for (let i = 0; i < carInfo.length; i++) {
      if (carInfo[i].carType === e.target.value) {
        setBasePrice(carInfo[i].basePrice);
      }
    }
    if (e.target.value === '0') {
      setBasePrice(0);
    }

    setCarType(e.target.value);
  };

  const basePriceChange = (e) => {
    setBasePrice(e?.target.value);
  };
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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
    let format = 'AM';
    if (time >= 12) {
      format = 'PM';
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
      time = '0' + time;
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
    const userEmail = localStorage.getItem('email');
    const basePrice = basePriceRef.current.value;
    if (basePrice < 1) {
      toast('Base Price cannot set negetive or Zero');
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
    axios
      .post('http://localhost:5000/admin/setPrice', data)
      .then((data) => {
        swal('Price Set Successfullly');
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };

  const addCar = async () => {
    const userEmail = localStorage.getItem('email');
    const data = {
      userEmail,
      carType: newCar.toLowerCase(),
      basePrice: newPrice,
      description: newDescription,
    };
    await axios
      .post('http://localhost:5000/admin/addCar', data)
      .then((data) => {
        swal(data.data.message);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/admin/setPrice').then((data) => {
      setCarInfo(data.data.carInfo);
      setRain(data.data.rain);
      setFrost(data.data.frost);
      setRainParcent(data.data.rainParcent);
      setFrostParcent(data.data.frostParcent);
      setBasePrice(0);
    });
  }, []);

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
            {hour} : {minute} : {second}{' '}
            <span className="sm-font">{format}</span>
          </p>
          <p className="ml-4 mb-4">
            {month} {date}
          </p>
          <h5>Kolkata, West Bengal</h5>
          <h2 className='mt-5'>24°C</h2>
          <p>Cloudy</p>
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
              <select className="selectPriceInput" onChange={carTypeChange}>
                <option defaultValue value={0}>
                  Car Types
                </option>
                {carInfo?.map((e, index) => (
                  <option
                    value={e?.carType}
                    key={index}
                    className="text-capitalize"
                  >
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
          </div>
          <div className="d-flex flex-row justify-content-between">
            <button className="setPriceBtn" onClick={setPrice}>
              Set Price
            </button>
            <button className="setPriceBtn" onClick={handleShow}>
              Add Car Type
            </button>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Type of Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="py-4 mx-4">
                <div className="d-flex justify-content-between ">
                  <label>Car Type :</label>
                  <input
                    className="inpt-cont"
                    type="text"
                    required
                    placeholder="Car _/^^\_"
                    ref={addCarTypeRef}
                    onChange={newCarTypeChange}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <label>Base Price Per Km :</label>
                  <input
                    className="inpt-cont"
                    type="Number"
                    required
                    placeholder="Price $$$"
                    ref={addCarPriceRef}
                    onChange={newPriceChange}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <label>Description :</label>
                  <input
                    className="inpt-cont"
                    type="text"
                    required
                    placeholder="Descriptions"
                    ref={addCarDescriptionRef}
                    onChange={newDescriptionChange}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={addCar}>
                Add Car
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Controls;
