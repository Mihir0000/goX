import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from '../sharedModule/Sidebar';
import { Header } from '../header/Header';
import { toast } from 'react-toastify';

const TripHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allTrips, setAllTrips] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [singleTrip, setSingleTrip] = useState();
  const [driverEarning, setDriverEarning] = useState('');

  const handleShow = (trip) => {
    setShow(true);
    setSingleTrip(trip);
  };
  const changeDate = (time) => {
    const d1 = new Date(time);
    const result = d1.getTime();
    let todate = new Date(result).getDate();
    let tomonth = new Date(result).getMonth() + 1;
    let toyear = new Date(result).getFullYear();
    let h = new Date(result).getHours();
    let m = new Date(result).getMinutes();
    let s = new Date(result).getSeconds();
    let original_date =
      todate + '/' + tomonth + '/' + toyear + ' ' + h + ':' + m + ':' + s;
    return original_date;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    axios.get('http://localhost:5000/trip/AllTrip').then((data) => {
      setAllTrips(data.data.allTrip);
    });
  }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    axios
      .get('http://localhost:5000/driver/last24Hrs', { params: { userEmail } })
      .then((data) => {
        console.log(data);
        setDriverEarning(data?.data);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  });

  const label = [
    'Trip ID',
    'Passenger Name',
    'From',
    'To',
    'Distance',
    'Amount',
    'Details',
  ];

  return (
    <div className="all_users" style={{ height: '100%', width: '100vw' }}>
      <Sidebar />
      <Header />

      <div className="g-0 row d-flex px-5 pt-5 justify-content-center">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4 m-1 me-2">
            <i className="fa fa-coins fa-3x text-warning"></i>
            <div className="ms-3">
              <p className="mb-2">Total Earning Today</p>
              <h6 className="mb-0">{driverEarning?.amount}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4 m-1 ml-2">
            <i className="fa fa-chart-bar fa-3x text-warning"></i>
            <div className="ms-3">
              <p className="mb-2">Total Bookings Today</p>
              <h6 className="mb-0">{driverEarning?.trips?.length}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="user_table">
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#72a3b334',
            color: 'whitesmoke',
          }}
        >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {label.map((l, index) => (
                    <TableCell key={index} align="center">
                      {l}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allTrips
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((trip, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center" className="tablecell">
                          {trip.id}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="tablecell text-capitalize"
                        >
                          {trip.userName}
                        </TableCell>
                        <TableCell align="center" className="tablecell">
                          {trip.source}
                        </TableCell>
                        <TableCell align="center" className="tablecell">
                          {trip.destination}
                        </TableCell>
                        <TableCell align="center" className="tablecell">
                          {trip.distance} Km
                        </TableCell>
                        <TableCell align="center" className="tablecell">
                          ??? {trip.amount}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="warning"
                            onClick={() => handleShow(trip)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allTrips.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Trip Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="m-0">
              <strong>Trip ID : </strong>
              <span>{singleTrip?.id}</span>
            </p>
            <p className="m-0">
              <strong>Passenger Name : </strong>
              <span>{singleTrip?.userName}</span>
            </p>
            <p className="m-0">
              <strong>Passenger Email : </strong>
              <span>{singleTrip?.userEmail}</span>
            </p>
            <p className="m-0">
              <strong>PickUp : </strong>
              <span>{singleTrip?.source}</span>
            </p>
            <p className="m-0">
              <strong>Drop : </strong>
              <span>{singleTrip?.destination}</span>
            </p>
            <p className="m-0">
              <strong>Distance : </strong>
              <span>{singleTrip?.distance} Km</span>
            </p>
            <p className="m-0">
              <strong>Amount : </strong>
              <span>{singleTrip?.amount}</span>
            </p>
            <p className="m-0">
              <strong>Car Type : </strong>
              <span>{singleTrip?.carType}</span>
            </p>
            <p className="m-0">
              <strong>Time : </strong>
              <span>{changeDate(singleTrip?.createdAt)}</span>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TripHistory;
