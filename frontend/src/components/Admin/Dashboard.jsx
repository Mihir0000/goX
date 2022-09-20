import React, { useState, useEffect } from 'react';
import './admin.css';
import Sidebar from '../sharedModule/Sidebar';
import axios from 'axios';
import { Header } from '../header/Header';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState();
    const [lastTrips, setLastTrips] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/admin/information`)
            .then((res) => {
                setDashboardData(res?.data);
            })
            .catch((err) => {
                toast(err.message);
            });

        axios
            .get(`http://localhost:5000/admin/last10Trip`)
            .then((res) => {
                setLastTrips(res?.data);
            })
            .catch((err) => {
                toast(err.message);
            });
    }, []);

    const revenew = dashboardData?.totalBookedPrice / 10;

    return (
        <div className="dashboard" style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Header />
            <div className="dashboard_content">
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-line fa-3x text-warning"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Sale</p>
                                    <h6 className="mb-0">
                                        Rs.{' '}
                                        {parseFloat(
                                            dashboardData?.totalBookedPrice
                                        ).toFixed(2)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-warning"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Bookings</p>
                                    <h6 className="mb-0">
                                        {dashboardData?.totalTrips}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-area fa-3x text-warning"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Users</p>
                                    <h6 className="mb-0">
                                        {dashboardData?.totalUsers}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-pie fa-3x text-warning"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Revenew</p>
                                    <h6 className="mb-0">
                                        Rs. {parseFloat(revenew).toFixed(2)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid pt-4 px-4">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Last 10 Trips</h6>
                            {/* <a href="">Show All</a> */}
                        </div>
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th scope="col">Trip ID</th>
                                        <th scope="col">User Email</th>
                                        <th scope="col">Pickup Location</th>
                                        <th scope="col">Drop Location</th>
                                        <th scope="col">Distance(km)</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lastTrips?.map((e, index) => (
                                        <tr key={index}>
                                            <td>{e?.id}</td>
                                            <td>{e?.userEmail}</td>
                                            <td>{e?.source}</td>
                                            <td>{e?.destination}</td>
                                            <td>{e?.distance}</td>
                                            <td>{e?.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
