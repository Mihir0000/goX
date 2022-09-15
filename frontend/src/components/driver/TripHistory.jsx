import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Sidebar from "../sharedModule/Sidebar";

const TripHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allTrips, setAllTrips] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    axios.get("http://localhost:5000/trip/AllTrip").then((data) => {
      setAllTrips(data.data.allTrip);
    });
  }, []);
  // console.log(allTrips);
  const label = ["Trip ID", "Passenger Name", "from", "to", "Amount", "Details"];

  return (
    <div className="all_users" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="user_table">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#72a3b334",
            color: "whitesmoke",
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
                {allTrips?.map((trip, index) => {
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
                        {trip.userEmail}
                      </TableCell>
                      <TableCell align="center" className="tablecell">
                        {trip.distance} Km
                      </TableCell>
                      <TableCell align="center">₹ {trip.amount}</TableCell>
                      <TableCell align="center">
                        <Button variant="warning" onClick={handleShow}>
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
            count={
              allTrips.length / rowsPerPage <= 1
                ? 1
                : Math.ceil(allTrips.length / rowsPerPage)
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
