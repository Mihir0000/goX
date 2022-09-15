import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
import swal from 'sweetalert';

const ChangeRole = ({ userId }) => {
    const [role, setRole] = useState('');
    // console.log(userId);

    const changeRole = (event) => {
        setRole(event.target.value);
    };

    const updateRole = () => {
        const data = { userId, updateRole: role };
        console.log(data);
        if (role === '') {
            return;
        }
        const config = { headers: { 'Content-Type': 'application/json' } };
        axios
            .put('http://localhost:5000/admin/updateRole', data, config)
            .then(() => {
                swal('Update Successfully!');
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Role</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={role}
                    label="Role"
                    onChange={changeRole}
                >
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'driver'}>Driver</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                className="align-item-center"
                onClick={updateRole}
            >
                Update
            </Button>
        </div>
    );
};

export default ChangeRole;
