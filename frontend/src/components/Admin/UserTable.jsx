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
import Sidebar from "../sharedModule/Sidebar";
import ChangeRole from "./ChangeRole";
import { Header } from "../header/Header";

const UserTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [allUsers, setAllUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const label = [
    "userId",
    "userName",
    "userEmail",
    "Current Role",
    "Change Role",
  ];

    useEffect(() => {
        axios
            .get(`http://localhost:5000/admin/allUsers`)
            .then((res) => {
                console.log(res.data);
                setAllUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="all_users" style={{ minHeight: '100vh' }}>
            <Sidebar />
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
                                {allUsers?.map((user, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell
                                                align="center"
                                                className="tablecell"
                                            >
                                                {user.userId}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className="tablecell"
                                            >
                                                {user.userName}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className="tablecell"
                                            >
                                                {user.userEmail}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className="tablecell"
                                            >
                                                {user.role}
                                            </TableCell>
                                            <TableCell align="center">
                                                <ChangeRole
                                                    userId={user.userId}
                                                />
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
                            allUsers?.length / rowsPerPage <= 1
                                ? 1
                                : Math.ceil(allUsers?.length / rowsPerPage)
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

export default UserTable;
