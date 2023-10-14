import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Session } from '../App';
import Cookies from 'js-cookie';

import './VerticalNavigation.css';

function AdminNavbar() {
  const session = useContext(Session);
  const user = session.user;

  const [orderCount, setOrderCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [packageServiceCount, setPackageServiceCount] = useState(0);

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
      .get('https://localhost:7088/api/OrderManagements')
      .then((response) => {
        const orders = response.data;
        setOrderCount(orders.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('https://localhost:7088/api/StaffManagements')
      .then((response) => {
        const staffs = response.data;
        setStaffCount(staffs.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('https://localhost:7088/api/CustomerManagements')
      .then((response) => {
        const customers = response.data;
        setCustomerCount(customers.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('https://localhost:7088/api/ServiceManagements')
      .then((response) => {
        const services = response.data;
        setServiceCount(services.length);
      })
      .catch((error) => console.log(error));

    axios
      .get('https://localhost:7088/api/PackageServiceManagements')
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
              <img className="vertical-avatar" src={user.avatar} alt="" />
            </a>
            <div className="vertical-info">
              <div className="vertical-name">
                {user.firstName}
                {user.lastName}
              </div>
              <div className="vertical-mail">{user.email}</div>
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
              <div className="frame-content">Dashboard</div>
            </div>
          </Link>

          <Link to="/admin-analysis">
            <div
              className={`frame-1 ${
                location.pathname === '/admin-analysis' ? 'frame-selected' : ''
              }`}
            >
              <div className="frame-content">Analysis</div>
            </div>
          </Link>

          <hr />

          <Link to="/admin-order-management">
            <div
              className={`frame-2 ${
                location.pathname === '/admin-order-management' ? 'frame-selected' : ''
              }`}
            >
              <div className="div">
                <div className="frame-content">Order</div>
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
                <div className="frame-content">Staff</div>
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
                <div className="frame-content">User</div>
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
                <div className="frame-content">Service</div>
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
                <div className="frame-content">Package Service</div>
              </div>
              <div className="frame-data">{packageServiceCount}</div>
            </div>
          </Link>

          <div className="boundary" />

          {/* ADMIN FOOTER */}
          <a href="/">
            <div className="vertical-nav-footer home">
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
    </div>
  );
}

export default AdminNavbar;
