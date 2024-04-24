import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import '../styles/LandingPage.css'; // Import the CSS file for styling

const Landing = () => {
    return (
        <div>
            <Header />
            <div className="container">
            <h2>ATTENDANCE RECORD FOR LECTURERS</h2> 

                <h2>Welcome!</h2>
                <p>Are you ready to submit your Attendance?</p>
                <Link to="/form" className="link">Continue</Link>
            </div>
            <Footer />
        </div>
    );
};

export default Landing;
