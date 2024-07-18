import React from 'react';
import ReactDOM from 'react-dom';
import LogoutButton from './Logout';

function Dashboard() {
    const goToProfile = () => {
        window.location.href = '/profile';
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card w-50">
                <LogoutButton />
                <div className="card-header text-center">Halaman Dashboard</div>
                <div className="card-body">
                  Selamat Datang Didashboard
                  <button onClick={goToProfile}>Lihat Profile</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

if (document.getElementById('dashboard')) {
    ReactDOM.render(
        <React.StrictMode>
            <Dashboard />
        </React.StrictMode>,
        document.getElementById('dashboard')
    );
}
