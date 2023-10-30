import React from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="content">
          <ul className="footer__nav">
            <li className="nav__item">
              <h2 className="nav__title">Contact</h2>
              <ul className="nav__ul">
                <li>
                  <Link to="mailto:4stu.contact@gmail.com">4stu.contact@gmail.com</Link>
                </li>
                <li>
                  <Link to="tel:0792766979">0792766979</Link>
                </li>
                <li>
                  <Link to="#">Support</Link>
                </li>
              </ul>
            </li>

            <li className="nav__item nav__item--extra">
              <h2 className="nav__title">4Stu Website</h2>

              <ul className="nav__ul nav__ul--extra">
                <li>
                  <Link to="">Services</Link>
                </li>
                <li>
                  <Link to="#">About Us</Link>
                </li>
                <li>
                  <Link to="#">FAQS</Link>
                </li>
                <li>
                  <Link to="#">Feedback</Link>
                </li>
                <li>
                  <Link to="#">Github</Link>
                </li>
              </ul>
            </li>

            <li className="nav__item">
              <h2 className="nav__title">Legal</h2>

              <ul className="nav__ul">
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Terms of Use</Link>
                </li>
                <li>
                  <Link to="#">Sitemap</Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="footer__addr">
            <div className="contactus">
              <img src="../assets/images/4Stu-Logo.svg" alt="" />
              <h2>Contact</h2>

              <Link to="/contact" className="btn2">
                <Button variant="contained" className="btn">
                  Email Us
                </Button>
              </Link>
            </div>
            <div className="legal">
              <p>&copy; 2023 4Stu. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
