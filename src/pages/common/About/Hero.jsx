import React from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-wrap">
      <div className="content">
        <div className="info">
          <p className="sub-title" style={{ fontSize: '32px', fontWeight: '600' }}>
            Service Excellence,
          </p>
          <h1 className="title" style={{ fontSize: '50px' }}>
            For Student Housing
          </h1>
          <p className="desc">
            More than just a service, it's our commitment to ensure maximum satisfaction for all
            customers.
          </p>

          <Link to="/service">
            <Button
              variant="contained"
              className="btn hero-cta cta"
              style={{ marginBottom: '100px' }}
            >
              About Us
            </Button>
          </Link>
        </div>

        <img
          src="../assets/images/about-hero.png"
          alt="Service Excellence, For Student Housing."
          className="hero-img"
          style={{ width: '550px', top: '20px' }}
        />
      </div>
    </div>
  );
}

export default Hero;
