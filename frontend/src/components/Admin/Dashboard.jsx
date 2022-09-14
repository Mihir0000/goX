import React, { useState, useEffect } from "react";
import "./admin.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  // console.log(dashboardData, "dashboardData");
  const [lastTrips, setLastTrips] = useState();
  console.log(lastTrips, "lastTrips");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/information`)
      .then((res) => {
        console.log(res);
        setDashboardData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/admin/last10Trip`)
      .then((res) => {
        console.log(res);
        setLastTrips(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const revenew =
    dashboardData?.totalBookedPrice - dashboardData?.totalBookedPrice / 10;
  console.log(revenew);

  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="dashboard_content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-line fa-3x text-warning"></i>
                <div className="ms-3">
                  <p className="mb-2">Total Sale</p>
                  <h6 className="mb-0">
                    Rs. {dashboardData?.totalBookedPrice}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-bar fa-3x text-warning"></i>
                <div className="ms-3">
                  <p className="mb-2">Total Bookings</p>
                  <h6 className="mb-0">Rs. {dashboardData?.totalTrips}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-area fa-3x text-warning"></i>
                <div className="ms-3">
                  <p className="mb-2">Total Users</p>
                  <h6 className="mb-0">{dashboardData?.totalUsers}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-pie fa-3x text-warning"></i>
                <div className="ms-3">
                  <p className="mb-2">Total Revenew</p>
                  <h6 className="mb-0">Rs. {revenew}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Salse</h6>
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
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                  </tr> */}
                  {lastTrips?.map((e) => (
                    <tr>
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
