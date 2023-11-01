import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';

import Loading from './Loading';

function Navigation() {
  const session = useContext(AuthContext);
  const user = session.user;
  const role = session.role;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true

    // Simulate a delay of 2 seconds using setTimeout
    setTimeout(() => {
      session.setUser(null);
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

  return (
    <div>
      <header className="fixed-header">
        <div className="content">
          <nav className="navbar">
            <label htmlFor="menu-checkbox" className="toggle-menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </label>

            <Link to="/">
              <img className="logo" src="../assets/images/4Stu-Logo.svg" alt="4Stu" />
            </Link>
            <h1 style={{ color: '#fff', marginLeft: '4px' }}>4Stu</h1>

            <ul className="navWay">
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
                              <Link to={`/profile/${user.user.userId}`}>Profile</Link>
                            </li>
                            <li>
                              <Link to={`/my-order/${user.user.userId}`}>Order</Link>
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

      <header className="mobile-header">
        <input type="checkbox" name="" id="menu-checkbox" className="menu-checkbox" hidden />

        <label htmlFor="menu-checkbox" className="menu-overlay"></label>

        <div className="menu-drawer">
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
            {user ? (
              <li className="user-list">
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
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>

      {isLoading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Navigation;
