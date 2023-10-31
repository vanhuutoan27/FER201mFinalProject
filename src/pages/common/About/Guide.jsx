import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCreditCard, faMessage } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Guide() {
  return (
    <div id="services" className="guides" style={{ padding: '140px 0 70px 0' }}>
      <div className="content">
        <h2 className="sub-title">How its works?</h2>
        <p className="desc">
          Explore comprehensive guides on how to order, pay, and review services. Everything you
          need to know when you're looking to use our services, whether you're a customer, payer, or
          reviewer - all in one place.
        </p>

        <ul className="list-guide">
          <li className="guide-item">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="2xl"
              style={{ fontSize: '6rem', color: 'var(--primary-color-1)' }}
            />
            <h3 className="title">Orderer Guides</h3>
            <Link to="#!" className="link">
              <span>How to Place an Order</span>
              <ChevronRightIcon />
            </Link>
          </li>
          <li className="guide-item">
            <FontAwesomeIcon
              icon={faCreditCard}
              size="2xl"
              style={{ fontSize: '6rem', color: 'var(--primary-color-1)' }}
            />
            <h3 className="title">Payer Guides</h3>
            <Link to="#!" className="link">
              <span>How to Make a Payment</span>
              <ChevronRightIcon />
            </Link>
          </li>
          <li className="guide-item">
            <FontAwesomeIcon
              icon={faMessage}
              size="2xl"
              style={{ fontSize: '6rem', color: 'var(--primary-color-1)' }}
            />
            <h3 className="title">Reviewer Guides</h3>
            <Link to="#!" className="link">
              <span>How to Review & Feedback</span>
              <ChevronRightIcon />
            </Link>
          </li>
        </ul>

        <div className="guide-cta">
          <Link to="/">
            <Button variant="contained" className="btn hero-cta cta">
              Sell Full Guidelines
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Guide;
