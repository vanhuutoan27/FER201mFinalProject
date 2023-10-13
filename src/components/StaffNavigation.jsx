import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './VerticalNavigation.css';

function StaffNavigation() {
  const location = useLocation();

  return (
    <div className="StaffNavigation">
      <div className="vertical-nav">
        {/* HEADER */}
        <div className="vertical-nav-header">
          <div className="vertical-account">
            <a href="#">
              <img
                className="vertical-avatar"
                alt="role-avatar"
                src="../assets/images/avatar/avatar-nobita.png"
              />
            </a>
            <div className="vertical-info">
              <div className="vertical-name">Van Huu Toan</div>
              <div className="vertical-mail">staff1@gmail.com</div>
            </div>
            <div className="interface-essential-wrapper"></div>
          </div>
        </div>

        <div className="boundary" />

        {/* BODY */}
        <div className="vertical-nav-body">
          <a href="/staff-dashboard">
            <div
              className={`frame-1 ${
                location.pathname === '/staff-dashboard' ? 'frame-selected' : ''
              }`}
            >
              <div className="frame-content">Dashboard</div>
            </div>
          </a>

          <a href="/staff-profile">
            <div
              className={`frame-1 ${
                location.pathname === '/staff-profile' ? 'frame-selected' : ''
              }`}
            >
              <div className="frame-content">Profile</div>
            </div>
          </a>

          <a href="/staff-calendar">
            <div
              className={`frame-1 ${
                location.pathname === '/staff-calendar' ? 'frame-selected' : ''
              }`}
            >
              <div className="frame-content">Calendar</div>
            </div>
          </a>

          <a href="staff-order">
            <div
              className={`frame-1 ${location.pathname === '/staff-order' ? 'frame-selected' : ''}`}
            >
              <div className="frame-content">Order</div>
            </div>
          </a>

          <div className="boundary" />

          {/* FOOTER */}
          <a href="/">
            <div className="vertical-nav-footer">
              <div className="frame-content">Logout</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default StaffNavigation;
