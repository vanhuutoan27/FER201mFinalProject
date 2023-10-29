import React from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero">
      <div className="content">
        <div className="hero-content">
          <div className="info">
            <p className="sub-title">Welcome to 4Stu Website!</p>
            <h1 className="title">Clean, tidy and economical</h1>
            <p className="desc">
              Here we have all the cleaning, sanitation, water delivery services you need.
            </p>

            <Link to="/service">
              <Button variant="contained" className="btn hero-cta cta">
                Start Order NOW
              </Button>
            </Link>
          </div>

          <img
            src="../assets/images/people-start-booking-a-service-in-website-2.svg"
            alt="Clean, tidy and economical"
            className="hero-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
