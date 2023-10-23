// Navigation.js
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';

import Button from '@mui/material/Button';

function Navigation() {
  const session = useContext(AuthContext);
  const user = session.user;
  const role = session.role;
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

  return (
    <header className="header fixed-header">
      <div className="content">
        <nav className="navbar">
          <img src="../assets/images/4Stu-Logo.svg" alt="4Stu" />

          <span>
            <a href="/">4Stu</a>
          </span>
          <ul>
            <li className={location.pathname === '/' ? 'chosen' : ''}>
              <a href="/">Home</a>
            </li>
            <li className={location.pathname === '/about' ? 'chosen' : ''}>
              <a href="/about">About</a>
            </li>
            <li className={location.pathname === '/service' ? 'chosen' : ''}>
              <a href="/service">Service</a>
            </li>
            <li className={location.pathname === '/contact' ? 'chosen' : ''}>
              <a href="/contact">Contact</a>
            </li>
            {/* <li>
              <a href="#!">
                More <FontAwesomeIcon icon={faCaretDown} className="custom-icon-white" />
              </a>
              <ul className="sub-nav">
                <li>
                  <a href="/news">News</a>
                </li>
                <li>
                  <a href="/faqs">FAQs</a>
                </li>
              </ul>
            </li> */}
          </ul>

          <div className="actions">
            {user ? (
              <div className="user-actions">
                <ul className="user-profile">
                  <li className="user-list">
                    <div>
                      <span>
                        {user.user.firstName} {user.user.lastName}
                      </span>
                      <img src={user.user.avatar} alt="" />
                    </div>
                    <ul className="sub-nav-user">
                      {role === 'Admin' && (
                        <>
                          <li>
                            <a href="/admin-dashboard">Admin</a>
                          </li>
                          <li>
                            <a href="/staff-profile">Staff</a>
                          </li>
                        </>
                      )}
                      {role === 'Staff' && (
                        <li>
                          <a href="/staff-profile">Staff</a>
                        </li>
                      )}
                      {role === 'Customer' && (
                        <>
                          <li>
                            <a href={`/profile/${user.userId}`}>Profile</a>
                          </li>
                          <li>
                            <a href={`/my-order/${user.userId}`}>Order</a>
                          </li>
                        </>
                      )}
                      <li>
                        <a href="#!" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            ) : (
              <Button href="/login" variant="contained" className="btn action-btn">
                Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
