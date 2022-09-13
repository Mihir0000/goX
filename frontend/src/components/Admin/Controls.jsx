import React, { useRef } from 'react';
import Sidebar from './Sidebar';
import { Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const Controls = () => {
    const basePriceRef = useRef();
    const rainRef = useRef();
    const frostRef = useRef();
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
    // const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const setPrice = () => {
        const userEmail = localStorage.getItem('email');
        const basePrice = basePriceRef.current.value;
        const isRain = rainRef.current.checked;
        const isFrost = frostRef.current.checked;
        console.log(userEmail, basePrice, isRain, isFrost);
        const data = { userEmail, basePrice, isRain, isFrost };
        axios
            .post('http://localhost:5000/admin/setPrice', data)
            .then(() => {
                console.log('Set Successfullly');
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
            <div>
                <div>
                    <h3>Hey! Do You want to update todays price?</h3>
                </div>
                <div class="form-check form-switch">
                    {/* <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                    />
                    <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                    >
                        Rainy
                    </label> */}
                </div>
                <Container>
                    <Row>
                        <Col className="col-4">
                            <div>
                                <h5>Today's Base Price?</h5>
                                <input type="number" ref={basePriceRef} />
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div>
                                <h5>Is Today Rainy?</h5>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    ref={rainRef}
                                />
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div>
                                <h5>Is today Frosty?</h5>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    ref={frostRef}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <button className="setPriceBtn" onClick={setPrice}>
                            Set Price
                        </button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Controls;
