import React, { useEffect, useState } from 'react';

import CountUp from 'react-countup';
import axios from '../../../config/axios';

import './About.css';

function Statistics() {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((response) => {
        const customerData = response.data;
        const customerCount = customerData.length;
        setCustomerCount(customerCount);
      })
      .catch((error) => console.error(error));

    axios
      .get('/OrderManagements')
      .then((response) => {
        const orders = response.data;
        const orderCount = orders.length;
        setOrderCount(orderCount);
      })
      .catch((error) => console.error(error));

    axios
      .get('/FeedbackManagements')
      .then((response) => {
        const feedbackData = response.data;
        const feedbackCount = feedbackData.length;
        setFeedbackCount(feedbackCount);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div id="resources" className="statistics">
      <div className="content">
        <div className="row">
          <div className="img-block">
            <img
              className="image"
              src="./assets/images/towfiqu-barbhuiya-nApaSgkzaxg-unsplash.jpg"
              alt="Empowering Student Apartments"
            />

            <div className="statistics-trend">
              <div className="row" style={{ marginBottom: '40px' }}>
                <strong className="value">40,000+</strong>
              </div>
              <p className="desc">Apartments Enhanced with Our Service Packages</p>
              <div className="separate"></div>
            </div>
          </div>
          <div className="info">
            <h2 className="sub-title" style={{ fontSize: '3.6rem' }}>
              Empowering Student Apartments
            </h2>
            <p className="desc">
              We offer convenient service packages designed to enhance apartment living. Each
              package may include essential services such as cleaning, sanitation, water supply,
              etc. You have the flexibility to choose service packages based on your needs, with
              options for usage time, recurrence period and service cycle limits.
            </p>
          </div>
        </div>
        <div className="row-qty">
          <div className="qty-item">
            <strong className="qty">
              <CountUp end={customerCount} duration={3} />+
            </strong>
            <p className="qty-desc">Cutomers</p>
          </div>
          <div className="qty-item">
            <strong className="qty">
              <CountUp end={orderCount} duration={3} />+
            </strong>
            <p className="qty-desc">Orders</p>
          </div>
          <div className="qty-item">
            <strong className="qty">
              <CountUp end={feedbackCount} duration={3} />+
            </strong>
            <p className="qty-desc">Feedbacks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
