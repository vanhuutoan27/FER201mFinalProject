import React from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div className="Footer">
      <footer>
        <div className="footer__container">
          <div className="sec aboutus">
            <h2>About Us</h2>
            <p>
              4Stu is designed to provide high quality services or service packages for student
              apartments. Our commitment is to bring convenient and time-saving solutions to your
              student life every day.
            </p>
            <ul className="sci">
              <li>
                <Link to="#!">
                  <FontAwesomeIcon icon={faGithub} className="footer__icon" />
                </Link>
              </li>
              <li>
                <Link to="#!">
                  <FontAwesomeIcon icon={faFacebook} className="footer__icon" />
                </Link>
              </li>
              <li>
                <Link to="#!">
                  <FontAwesomeIcon icon={faYoutube} className="footer__icon" />
                </Link>
              </li>
              <li>
                <Link to="#!">
                  <FontAwesomeIcon icon={faTiktok} className="footer__icon" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="sec quicklinks">
            <h2>Support</h2>
            <ul>
              <li>
                <Link to="#!">FAQs</Link>
              </li>
              <li>
                <Link to="#!">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#!">Help</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="sec quicklinks">
            <h2>Website</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/service">Services</Link>
              </li>
              <li>
                <Link to="/service">Package Services</Link>
              </li>
              <li>
                <Link to="#!">News</Link>
              </li>
            </ul>
          </div>
          <div className="sec contact">
            <h2>Contact Us</h2>
            <ul className="info">
              <li>
                <span>
                  <FontAwesomeIcon icon={faPhone} className="footer__icon" />
                </span>
                <p>
                  <Link to="tel:0792766979">0792 766 979</Link>
                </p>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} className="footer__icon" />
                </span>
                <Link to="mailto:4stu.contact@gmail.com">4stu.contact@gmail.com</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyrightText">
        <p>Copyright &#169;2023 4Stu Services. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
