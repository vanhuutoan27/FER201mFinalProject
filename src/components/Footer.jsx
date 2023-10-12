import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="content">
          <div className="footer-head">
            <h2 className="title">
              Try <span>4Stu</span> Today!
            </h2>
            <p className="sub-title">
              Get started for free. Add your whole team as your needs grow.
            </p>
            <a href="" className="btn cta">
              Try 4Stu Free <FontAwesomeIcon icon={faArrowRight} className="custom-icon" />
            </a>
          </div>
          <div className="content">
            <div className="footer__addr">
              <img src="../assets/images/4Stu-Logo.svg" alt="" />
              <h2>Contact</h2>
              <a className="btn" href="mailto:huutoanvan1@gmail.com">
                Email Us
              </a>
            </div>

            <ul className="footer__nav">
              <li className="nav__item">
                <h2 className="nav__title">Contact</h2>
                <ul className="nav__ul">
                  <li>
                    <a href="mailto:huutoanvan1@gmail.com">huutoanvan1@gmail.com</a>
                  </li>
                  <li>
                    <a href="tel:0792766979">0792766979</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
              </li>

              <li className="nav__item nav__item--extra">
                <h2 className="nav__title">4Stu Website</h2>

                <ul className="nav__ul nav__ul--extra">
                  <li>
                    <a href="">Services</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">FAQS</a>
                  </li>
                  <li>
                    <a href="#">Feedback</a>
                  </li>
                  <li>
                    <a href="#">Github</a>
                  </li>
                </ul>
              </li>

              <li className="nav__item">
                <h2 className="nav__title">Legal</h2>

                <ul className="nav__ul">
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Use</a>
                  </li>
                  <li>
                    <a href="#">Sitemap</a>
                  </li>
                </ul>
              </li>
            </ul>

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
