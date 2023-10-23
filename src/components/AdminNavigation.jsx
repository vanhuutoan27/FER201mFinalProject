import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBarsProgress,
  faBriefcase,
  faCartShopping,
  faChartPie,
  faHouse,
  faRightFromBracket,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

import './VerticalNavigation.css';

function AdminNavbar() {
  const { user, setUser } = useContext(AuthContext);

  const [orderCount, setOrderCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [packageServiceCount, setPackageServiceCount] = useState(0);

  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
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
      .get('/OrderManagements')
      .then((response) => {
        const orders = response.data;
        setOrderCount(orders.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('/UserManagements')
      .then((response) => {
        const customers = response.data.filter((user) => user.role === 'Customer');
        const staffs = response.data.filter((user) => user.role === 'Staff');
        setCustomerCount(customers.length);
        setStaffCount(staffs.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('/ServiceManagements')
      .then((response) => {
        const services = response.data;
        setServiceCount(services.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('/PackageServiceManagements')
      .then((response) => {
        const packageServices = response.data;
        setPackageServiceCount(packageServices.length);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="AdminNavigation">
      <div className="vertical-nav">
        {/* ADMIN HEADER */}
        <div className="vertical-nav-header">
          <div className="vertical-account">
            <a href="#!">
              <img className="vertical-avatar" src={user.user.avatar} alt="" />
            </a>
            <div className="vertical-info">
              <div className="vertical-name">
                {user.user.firstName} {user.user.lastName}
              </div>
              <div className="vertical-mail">{user.user.email}</div>
            </div>
            <div className="interface-essential-wrapper"></div>
          </div>
        </div>

        <div className="boundary" />

        {/* ADMIN BODY */}
        <div className="vertical-nav-body">
          <Link to="/admin-dashboard">
            <div
              className={`frame-1 ${
                location.pathname === '/admin-dashboard' ? 'frame-selected' : ''
              }`}
            >
              <div className="frame-content">
                <FontAwesomeIcon icon={faBarsProgress} className="custom-icon-nav" />
                Dashboard
              </div>
            </div>
          </Link>

          <Link to="/admin-analysis">
            <div
              className={`frame-1 ${
                location.pathname === '/admin-analysis' ? 'frame-selected' : ''
              }`}
            >
              <div className="frame-content">
                <FontAwesomeIcon icon={faChartPie} className="custom-icon-nav" />
                Analysis
              </div>
            </div>
          </Link>

          <div className="boundary" />

          <Link to="/admin-order-management">
            <div
              className={`frame-2 ${
                location.pathname === '/admin-order-management' ? 'frame-selected' : ''
              }`}
            >
              <div className="div">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faCartShopping} className="custom-icon-nav" />
                  Order
                </div>
              </div>
              <div className="frame-data">
                <div className="frame-data-content">{orderCount}</div>
              </div>
            </div>
          </Link>

          <Link to="/admin-staff-management">
            <div
              className={`frame-2 ${
                location.pathname === '/admin-staff-management' ? 'frame-selected' : ''
              }`}
            >
              <div className="div">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faUserTie} className="custom-icon-nav" />
                  Staff
                </div>
              </div>
              <div className="frame-data">
                <div className="frame-data-content">{staffCount}</div>
              </div>
            </div>
          </Link>

          <Link to="/admin-user-management">
            <div
              className={`frame-2 ${
                location.pathname === '/admin-user-management' ? 'frame-selected' : ''
              }`}
            >
              <div className="div">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faUser} className="custom-icon-nav" />
                  User
                </div>
              </div>
              <div className="frame-data">
                <div className="frame-data-content">{customerCount}</div>
              </div>
            </div>
          </Link>

          <Link to="/admin-service-management">
            <div
              className={`frame-2 ${
                location.pathname === '/admin-service-management' ? 'frame-selected' : ''
              }`}
            >
              <div className="div">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faBagShopping} className="custom-icon-nav" />
                  Service
                </div>
              </div>
              <div className="frame-data">
                <div className="frame-data-content">{serviceCount}</div>
              </div>
            </div>
          </Link>

          <Link to="/admin-package-service-management">
            <div
              className={`frame-2 ${
                location.pathname === '/admin-package-service-management' ? 'frame-selected' : ''
              }`}
            >
              <div className="div">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faBriefcase} className="custom-icon-nav" />
                  Package Service
                </div>
              </div>
              <div className="frame-data">{packageServiceCount}</div>
            </div>
          </Link>

          <div className="boundary" />

          {/* ADMIN FOOTER */}
          <a href="/">
            <div className="frame-1">
              <div className="frame-content">
                <FontAwesomeIcon icon={faHouse} className="custom-icon-nav" />
                Home
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
    </div>
  );
}

export default AdminNavbar;
