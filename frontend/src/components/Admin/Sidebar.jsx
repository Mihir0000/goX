import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosArrowForward } from 'react-icons/io';

const Sidebar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <nav class="navbar sticky-top">
                <div class="container-fluid">
                    <button
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            marginLeft: 20,
                            paddingTop: '30px',
                            float: 'left',
                            color: 'white',
                        }}
                        onClick={handleShow}
                    >
                        <GiHamburgerMenu
                            style={{ width: '20px', height: '20px' }}
                        />
                    </button>
                </div>
            </nav>

            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="start"
                style={{ backgroundColor: 'black', width: '10%' }}
            >
                <Offcanvas.Header style={{ width: '10%' }}>
                    <Offcanvas.Title>
                        <button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                            }}
                            onClick={handleClose}
                        >
                            <IoIosArrowForward />
                        </button>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ width: '10%' }}>
                    <div className="sidebar pe-4 pb-3">
                        <button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
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
                                        src="img/user.jpg"
                                        alt=""
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    />
                                    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                                </div>
                                <div className="ms-3">
                                    <h6 className="mb-0">Jhon Doe</h6>
                                    <span>Admin</span>
                                </div>
                            </div>
                            <div className="navbar-nav w-100">
                                <a
                                    href="/admin_dashboard"
                                    className="nav-item nav-link active"
                                >
                                    <i className="fa fa-tachometer-alt me-2"></i>
                                    Dashboard
                                </a>
                                <a
                                    href="widget.html"
                                    className="nav-item nav-link"
                                >
                                    <i className="fa fa-th me-2"></i>Widgets
                                </a>
                                <a
                                    href="/admin_dashboard/controls"
                                    className="nav-item nav-link"
                                >
                                    <i className="fa fa-keyboard me-2"></i>
                                    Controls
                                </a>
                                <a
                                    href="table.html"
                                    className="nav-item nav-link"
                                >
                                    <i className="fa fa-table me-2"></i>Tables
                                </a>
                                <a
                                    href="chart.html"
                                    className="nav-item nav-link"
                                >
                                    <i className="fa fa-chart-bar me-2"></i>
                                    Charts
                                </a>
                            </div>
                        </nav>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;
