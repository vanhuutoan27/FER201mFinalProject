import React from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-wrap">
      <div className="content">
        <div className="info">
          <p className="sub-title" style={{ fontSize: '60px', fontWeight: '600' }}>
            Choose Your
          </p>
          <h1 className="title" style={{ marginTop: '0', lineHeight: '0.7' }}>
            Service Package
          </h1>
          <p className="desc">
            We are pleased to introduce a software system designed to provide high quality service
            packages for student apartments. Our commitment is to bring convenient and time-saving
            solutions to your student life every day.
          </p>

          <Link to="#order-now">
            <Button
              variant="contained"
              className="btn hero-cta cta"
              style={{ marginBottom: '50px' }}
            >
              Order Now
            </Button>
          </Link>
        </div>

        <img
          src="../assets/manypixels/hero-employee-b.svg"
          alt="Choose Your Service Package."
          className="hero-img"
          style={{ width: '550px', top: '55px' }}
        />
      </div>
    </div>
  );
}

export default Hero;
