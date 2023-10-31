import React from 'react';

import Hero from './Hero';
import Guide from './Guide';
import Features from './Features';
import Statistics from './Statistics';
import Subscription from './Subscription';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

import './About.css';

function About() {
  return (
    <div className="AboutPage">
      <Navigation />
      <Hero />
      <Guide />
      <Features />
      <Statistics />
      <Subscription />
      <Footer />
    </div>
  );
}

export default About;
