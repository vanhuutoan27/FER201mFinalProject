import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';

import Button from '@mui/material/Button';

function Navigation3() {
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
            <Link to="/">4Stu</Link>
          </span>
          <ul>
            <li className={location.pathname === '/' ? 'chosen' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/about' ? 'chosen' : ''}>
              <Link to="/about">About</Link>
            </li>
            <li className={location.pathname === '/service' ? 'chosen' : ''}>
              <Link to="/service">Service</Link>
            </li>
            <li className={location.pathname === '/contact' ? 'chosen' : ''}>
              <Link to="/contact">Contact</Link>
            </li>
            {/* <li>
              <Link to="#!">
                More <FontAwesomeIcon icon={faCaretDown} className="custom-icon-white" />
              </Link>
              <ul className="sub-nav">
                <li>
                  <Link to="/news">News</Link>
                </li>
                <li>
                  <Link to="/faqs">FAQs</Link>
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
                            <Link to="/admin-dashboard">Admin</Link>
                          </li>
                        </>
                      )}
                      {role === 'Staff' && (
                        <li>
                          <Link to="/staff-profile">Staff</Link>
                        </li>
                      )}
                      {role === 'Customer' && (
                        <>
                          <li>
                            <Link to={`/profile/${user.userId}`}>Profile</Link>
                          </li>
                          <li>
                            <Link to={`/my-order/${user.userId}`}>Order</Link>
                          </li>
                        </>
                      )}
                      <li>
                        <Link to="#!" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="contained" className="btn action-btn">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation3;
