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
  faHouse,
  faRightFromBracket,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

import './VerticalNavigation.css';
import Loading from './Loading';

function AdminNavbar() {
  const { user, setUser } = useContext(AuthContext);

  const [orderCount, setOrderCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [packageServiceCount, setPackageServiceCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Thêm biến state isLoading

  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoading(true); // Khi nhấn Logout, set isLoading thành true

    setTimeout(() => {
      // setUser(null);
      localStorage.removeItem('accessToken');
      Cookies.remove('accessToken');
      window.location.href = '/';
    }, 1000);
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
      {user ? (
        <div className="vertical-nav">
          {/* ADMIN HEADER */}
          <div className="vertical-nav-header">
            <div className="vertical-account">
              <Link to="#!">
                <img className="vertical-avatar" src={user.user.avatar} alt="" />
              </Link>
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
                  <span>Dashboard</span>
                </div>
              </div>
            </Link>

            <Link to="/admin-order-management">
              <div
                className={`frame-2 ${
                  location.pathname === '/admin-order-management' ? 'frame-selected' : ''
                }`}
              >
                <div className="div">
                  <div className="frame-content">
                    <FontAwesomeIcon icon={faCartShopping} className="custom-icon-nav" />
                    <span>Order</span>
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
                    <span>Staff</span>
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
                    <span>User</span>
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
                    <span>Service</span>
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
                    <span>Package Service</span>
                  </div>
                </div>
                <div className="frame-data">{packageServiceCount}</div>
              </div>
            </Link>

            <div className="boundary" />

            {/* ADMIN FOOTER */}
            <Link to="/">
              <div className="frame-1">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faHouse} className="custom-icon-nav" />
                  <span>Home</span>
                </div>
              </div>
            </Link>

            <Link to="#!" onClick={handleLogout}>
              <div className="vertical-nav-footer logout">
                <div className="frame-content">
                  <FontAwesomeIcon icon={faRightFromBracket} className="custom-icon-nav" />
                  <span>Logout</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default AdminNavbar;
