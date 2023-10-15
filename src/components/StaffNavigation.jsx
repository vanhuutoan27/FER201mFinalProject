import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Session } from '../App';
import Cookies from 'js-cookie';

import './VerticalNavigation.css';

function StaffNavigation() {
  const session = useContext(Session);
  const user = session.user;

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
      console.log('Logged in with accessToken:', user);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/StaffManagements')
      .then((response) => setAllStaffs(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="StaffNavigation">
      {user ? (
        <div className="vertical-nav">
          {/* HEADER */}
          <div className="vertical-nav-header">
            <div className="vertical-account">
              <a href="#!">
                <img className="vertical-avatar" src={user.avatar} alt="" />
              </a>
              <div className="vertical-info">
                <div className="vertical-name">
                  {user.firstName} {user.lastName}
                </div>
                <div className="vertical-mail">{user.email}</div>
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
                <div className="frame-content">Profile</div>
              </div>
            </Link>

            <Link to="/staff-order">
              <div
                className={`frame-1 ${
                  location.pathname === '/staff-order' ? 'frame-selected' : ''
                }`}
              >
                <div className="frame-content">Order</div>
              </div>
            </Link>

            <Link to="/staff-task">
              <div
                className={`frame-1 ${location.pathname === '/staff-task' ? 'frame-selected' : ''}`}
              >
                <div className="frame-content">Task</div>
              </div>
            </Link>

            <Link to="/staff-calendar">
              <div
                className={`frame-1 ${
                  location.pathname === '/staff-calendar' ? 'frame-selected' : ''
                }`}
              >
                <div className="frame-content">Calendar</div>
              </div>
            </Link>

            <div className="boundary" />

            {/* FOOTER */}
            <a href="/">
              <div className="frame-1 home">
                <div className="frame-content">Home</div>
              </div>
            </a>

            <a href="#!" onClick={handleLogout}>
              <div className="vertical-nav-footer logout">
                <div className="frame-content">Logout</div>
              </div>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StaffNavigation;
