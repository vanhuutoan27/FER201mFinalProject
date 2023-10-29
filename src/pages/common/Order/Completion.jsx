import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

function Completion() {
  return (
    <div className="OrderCompletionPage">
      <Navigation />
      <div className="completion-section">
        <div className="info-section">
          <div className="process-info">
            <section className="step-wizard">
              <ul className="step-wizard-list">
                <li className="step-wizard-item">
                  <Link to="" className="progress-count">
                    1
                  </Link>
                  <Link to="" className="progress-label">
                    Account
                  </Link>
                </li>

                <li className="step-wizard-item">
                  <Link to="" className="progress-count">
                    2
                  </Link>
                  <Link to="" className="progress-label">
                    Shipping
                  </Link>
                </li>

                <li className="step-wizard-item current-item">
                  <Link to="" className="progress-count">
                    3
                  </Link>
                  <Link to="" className="progress-label">
                    Completion
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <div id="completion-section" className="changeable-content">
            <div className="main-info-section">
              <h2>Your order has been placed!</h2>
              <img
                src="./assets/undraw/undraw_smiley_face_re_9uid.svg"
                alt="order-completion-img"
              />
            </div>
            <hr />
            <div className="btn-action-completion">
              <Link to="/" className="btn">
                Return Home
              </Link>
              <Link to="/service" className="btn">
                Continue Order
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Completion;
