import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import Sidebar from '../sharedModule/Sidebar';
import './driver.css';
import swal from 'sweetalert';

const ActiveTrip = () => {
    const [activeTrip, setActiveTrip] = useState();
    const userEmail = localStorage.getItem('email');
    useEffect(() => {
        axios
            .get('http://localhost:5000/driver/activeTrip', {
                params: { userEmail },
            })
            .then((data) => {
                setActiveTrip(data?.data?.driverOntheWayTrip);
            })
            .catch((err) => {
                swal(err.message);
            });
    }, []);

    return (
        <div className="active_trip_body">
            <Sidebar />
            <Header />
            <div className="trip_card">
                <div className="card trip_card1">
                    {activeTrip.length === 0 ? (
                        <div className="my-3 text-dark text-center">
                            No Active Trip right now
                        </div>
                    ) : (
                        <div className="card-body trip_card_body">
                            <p className="m-0">
                                <strong>Trip ID : </strong>
                                <span>{activeTrip[0]?.id}</span>
                            </p>
                            <p className="m-0">
                                <strong>Passenger Name : </strong>
                                <span>{activeTrip[0]?.userName}</span>
                            </p>
                            <p className="m-0">
                                <strong>Passenger Email : </strong>
                                <span>{activeTrip[0]?.userEmail}</span>
                            </p>
                            <p className="m-0">
                                <strong>PickUp : </strong>
                                <span>{activeTrip[0]?.source}</span>
                            </p>
                            <p className="m-0">
                                <strong>Drop : </strong>
                                <span>{activeTrip[0]?.destination}</span>
                            </p>
                            <p className="m-0">
                                <strong>Distance : </strong>
                                <span>{activeTrip[0]?.distance} Km</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveTrip;
