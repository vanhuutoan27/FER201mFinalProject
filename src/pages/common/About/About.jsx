import React from 'react';

import Hero from './Hero';
import Features from './Features';
import Features2 from './Features2';
import Statistics from './Statistics';
import Order from './Order';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

import './About.css';

function About() {
  return (
    <div className="AboutPage">
      <Navigation />
      <Hero />
      <Features />
      <Features2 />
      <Statistics />
      <Order />
      <Footer />
    </div>
  );
}

export default About;
