import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { padding } from "@mui/system";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  return (
    <div className="sticky-top">
      <nav className="navbar">
        <div className="container-fluid">
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginLeft: 20,
              paddingTop: "30px",
              float: "left",
              color: "white",
            }}
            onClick={handleShow}
          >
            <GiHamburgerMenu style={{ width: "20px", height: "20px" }} />
          </button>
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        style={{ backgroundColor: "black", width: "10%" }}
      >
        <Offcanvas.Header style={{ width: "10%" }}>
          <Offcanvas.Title>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={handleClose}
            >
              <IoIosArrowForward />
            </button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ width: "10%" }}>
          <div className="sidebar pe-4 pb-3">
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={handleClose}
            >
              <IoIosArrowForward />
            </button>
            <nav className="navbar bg-secondary navbar-dark">
              <a href="/" className="navbar-brand mx-4 mb-3">
                <h3 className="text-warning">goX</h3>
              </a>
              <div className="d-flex align-items-center ms-4 mb-4">
                <div className="position-relative">
                  <img
                    className="rounded-circle"
                    src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-User-basic-web-ui-elements-others-inmotus-design-2.png"
                    alt=""
                    style={{
                      width: "45px",
                      height: "45px",
                      border:"2px solid black",
                      padding:"3px"
                    }}
                  />
                  <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 text-capitalize">{name}</h6>
                  <span className="text-capitalize">{role}</span>
                </div>
              </div>
              <div className="navbar-nav w-100">
                {role === "admin" ? (
                  <Link
                    to="/admin_dashboard"
                    className="nav-item nav-link active"
                  >
                    <i className="fa fa-tachometer-alt me-2" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/driver_dashboard"
                    className="nav-item nav-link active"
                  >
                    <i className="fa fa-tachometer-alt me-2" />
                    Dashboard
                  </Link>
                )}
                {role === "admin" ? (
                  <Link to="/admin/active_trip" className="nav-item nav-link">
                    <i className="fa fa-th me-2" />
                    Active Trips
                  </Link>
                ) : (
                  <Link to="/activeTrip" className="nav-item nav-link">
                    <i className="fa fa-th me-2" />
                    Active Trip
                  </Link>
                )}
                {role === "admin" && (
                  <Link
                    to="/admin_dashboard/controls"
                    className="nav-item nav-link"
                  >
                    <i className="fa fa-keyboard me-2" />
                    Change Price
                  </Link>
                )}
                {role === "admin" ? (
                  <Link to="/all_users" className="nav-item nav-link">
                    <i className="fa fa-table me-2" />
                    All Users
                  </Link>
                ) : (
                  <Link to="/trip_history" className="nav-item nav-link">
                    <i className="fa fa-table me-2" />
                    Trip History
                  </Link>
                )}
                {role === "admin" && (
                  <Link to="/admin/allTrips" className="nav-item nav-link">
                    <i className="fa fa-keyboard me-2" />
                    All Trips
                  </Link>
                )}

                <Link to="/profile" className="nav-item nav-link">
                  <i className="fa fa-chart-bar me-2"></i>
                  My Profile
                </Link>
              </div>
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
