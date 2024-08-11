import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container mt-5">
            <h1>Welcome to the Order Management System</h1>
            <p>
                Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get started.
            </p>
        </div>
    );
}

export default HomePage;

