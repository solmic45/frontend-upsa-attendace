import React, { useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Header.css'; // Import the CSS file
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from '../store/userSlice'; 
import { removeTokenFromLocalStorage } from '../utils/LocalStorage';
import { ACCESS_TOKEN_COOKIE } from '../utils/Constants';
import { useNavigate } from "react-router-dom";
import logo from '../assets/upsa.jpg'; //  


function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); // Access user data from Redux store
    // console.log("user::", user)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        // Implement sign-out logic here
        setIsDropdownOpen(false);
        dispatch(clearUser()); 
        removeTokenFromLocalStorage(ACCESS_TOKEN_COOKIE)
        window.location.href = "/login"
        
    };

    return (<div className="main-header ">
    
        <div className="header-container">
            <div className="logo" onClick={() => {
                navigate("/");
            }}>
                <img src={logo} alt="schoolLogo" />
                <h1>  UNIVERSITY OF PROFESSIONAL STUDIES, ACCRA (UPSA)</h1>
              
            </div>
            <div className="user-actions">
                {user ? (
                    <div className="user-icon-container" onClick={handleIconClick}>
                        <div className="user-icon">
                            <FaUser />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown">
                                <div className="user-email">{user.email}</div>
                                {user.isAdmin &&(

                                <div className="user-admin" onClick={() => {
                                    navigate("/all-forms");
                                }}>Admin Forms </div>
                                )}
                                <button className="sign-out-btn" onClick={handleSignOut}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="login-btn" onClick={() => {
                        navigate("/login");
                    }}>LOGIN</button>
                )}
            </div>
        </div>
       {/* < div className ="sub-h">
         <h3>ATTENDANCE RECORD FOR LECTURERS</h3> 
       
       </div> */}

        </div>
    );
}

export default Header;
