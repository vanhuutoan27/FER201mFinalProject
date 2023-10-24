import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';

import './VerticalNavigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCartShopping,
  faHouse,
  faListCheck,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function StaffNavigation() {
  const session = useContext(AuthContext);
  const userInfo = session.user.user;

  const [allStaffs, setAllStaffs] = useState([]);
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    session.setUser(null);
    localStorage.removeItem('accessToken');
    Cookies.remove('accessToken');
    window.location.href = '/';
  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      console.log('Logged in with accessToken:', userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((response) => setAllStaffs(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="StaffNavigation">
      {userInfo ? (
        <div className="vertical-nav">
          {/* HEADER */}
          <div className="vertical-nav-header">
            <div className="vertical-account">
              <a href="#!">
                <img className="vertical-avatar" src={userInfo.avatar} alt="" />
              </a>
              <div className="vertical-info">
                <div className="vertical-name">
                  {userInfo.firstName} {userInfo.lastName}
                </div>
                <div className="vertical-mail">{userInfo.email}</div>
              </div>
              <div className="interface-essential-wrapper"></div>
            </div>
          </div>

          <div className="boundary" />

          {/* BODY */}
          <div className="vertical-nav-body">
            <Link to="/staff-profile">
              <div
                className={`frame-1 ${
                  location.pathname === '/staff-profile' ? 'frame-selected' : ''
                }`}
              >
                <div className="frame-content">
                  {' '}
                  <FontAwesomeIcon icon={faUser} className="custom-icon-nav" />
                  Profile
                </div>
              </div>
            </Link>

            <Link to="/staff-order">
              <div
                className={`frame-1 ${
                  location.pathname === '/staff-order' ? 'frame-selected' : ''
                }`}
              >
                <div className="frame-content">
                  <FontAwesomeIcon icon={faCartShopping} className="custom-icon-nav" />
                  Order
                </div>
              </div>
            </Link>

            <Link to="/staff-task">
              <div
                className={`frame-1 ${location.pathname === '/staff-task' ? 'frame-selected' : ''}`}
              >
                <div className="frame-content">
                  <FontAwesomeIcon icon={faListCheck} className="custom-icon-nav" />
                  Task
                </div>
              </div>
            </Link>

            <Link to="/staff-calendar">
              <div
                className={`frame-1 ${
                  location.pathname === '/staff-calendar' ? 'frame-selected' : ''
                }`}
              >
                <div className="frame-content">
                  <FontAwesomeIcon icon={faCalendarDays} className="custom-icon-nav" />
                  Calendar
                </div>
              </div>
            </Link>

            <div className="boundary" />

            {/* FOOTER */}
            <a href="/">
              <div className="frame-1">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faHouse} className="custom-icon-nav" /> Home
                </div>
              </div>
            </a>

            <a href="#!" onClick={handleLogout}>
              <div className="vertical-nav-footer logout">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faRightFromBracket} className="custom-icon-nav" />
                  Logout
                </div>
              </div>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StaffNavigation;
