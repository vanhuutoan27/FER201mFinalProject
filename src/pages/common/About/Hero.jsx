import React from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero">
      <div className="content">
        <div className="hero-content">
          <div className="info">
            <h1 className="title" style={{ fontSize: '48px', marginTop: '24px' }}>
              Service Excellence, For Student Housing
            </h1>
            <p className="desc">
              More than just a service, it's our commitment to ensure maximum satisfaction for all
              customers.
            </p>

            <Link to="#!">
              <Button variant="contained" className="btn hero-cta cta">
                About Us
              </Button>
            </Link>
          </div>

          <img
            src="../assets/images/about-hero.png"
            alt="Service Excellence, For Student Housing"
            style={{ width: '550px', position: 'relative', top: '-100px', right: '0' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
