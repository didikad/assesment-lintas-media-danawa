import React from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            Swal.fire({
                icon: "success",
                title: "Logout Successful!",
                showConfirmButton: false,
                timer: 1000,
            }).then(() => {
                window.location.href = '/login';
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Logout Failed!",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
