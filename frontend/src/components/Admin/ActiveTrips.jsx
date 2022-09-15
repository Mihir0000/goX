import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Sidebar from "../sharedModule/Sidebar";
import axios from "axios";
import { Header } from "../header/Header";

const ActiveTrips = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTrip, setActiveTrip] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/bookedTrip")
      .then((data) => {
        setActiveTrip(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const label = [
    "TripID",
    "UserEmail",
    "Distance",
    "Amount",
    "Selected Driver",
    "Trip Status",
  ];
  return (
    <div className="all_users">
      <Sidebar />
      <Header />
      <div className="user_table">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#72a3b334",
            color: "whitesmoke",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
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
                {activeTrip
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((trip, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{trip.id}</TableCell>
                        <TableCell align="center">{trip.userEmail}</TableCell>
                        <TableCell align="center">{trip.distance} Km</TableCell>
                        <TableCell align="center">₹ {trip.amount}</TableCell>
                        <TableCell align="center">
                          {trip?.assignDriver}
                        </TableCell>
                        <TableCell align="center">{trip.tripStatus}</TableCell>
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
              activeTrip?.length / rowsPerPage <= 1
                ? 1
                : activeTrip?.length / rowsPerPage
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default ActiveTrips;
