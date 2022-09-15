import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

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

    const basePriceChange = (e) => {
        console.log(e.target.value);
        setBasePrice(e.target.value);
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

    const today = new Date();
    const date = today.getDate();
    const month = monthNames[today.getMonth()];
    const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
            console.log('Base Price cannot set negetive or Zero');
            return;
        }
        const isRain = rainRef.current.checked;
        const isFrost = frostRef.current.checked;
        console.log(userEmail, basePrice, isRain, isFrost);
        const data = {
            userEmail,
            basePrice,
            rain: isRain,
            frost: isFrost,
            rainParcent,
            frostParcent,
        };
        axios
            .post('http://localhost:5000/admin/setPrice', data)
            .then(() => {
                swal('Set Successfullly');
                setBasePrice('');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/admin/setPrice').then((data) => {
            setBasePrice(data.data.basePrice);
            setRain(data.data.rain);
            setFrost(data.data.frost);
            setRainParcent(data.data.rainParcent);
            setFrostParcent(data.data.frostParcent);
        });
    }, []);

    return (
        <div className="controls_container" style={{ height: '100vh' }}>
            <Sidebar />

            <div className="mb-3">
                <h3>Hey! Do You want to update todays price?</h3>
            </div>
            <div className="control_card container">
                {/* weather card */}

                <div className="w_card">
                    <p className="time-font mb-0 ml-4  mt-5">
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
                    <div className="d-flex justify-content-between pb-5">
                        <h5>Today's Base Price?</h5>
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
                    <button className="setPriceBtn" onClick={setPrice}>
                        Set Price
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
