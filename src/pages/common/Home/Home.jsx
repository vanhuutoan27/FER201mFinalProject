import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCircleCheck, faClock } from '@fortawesome/free-solid-svg-icons';

import Button from '@mui/material/Button';
import CountUp from 'react-countup';
import { Waypoint } from 'react-waypoint';
import axios from '../../../config/axios';

import Navigation from '../../../components/Navigation';
import Hero from './Hero';
import Footer from '../../../components/Footer';

import './Home.css';

function Home() {
  const [customerCount, setCustomerCount] = useState(0);
  const [startCountUp, setStartCountUp] = useState(false);

  const handleWaypointEnter = () => {
    setStartCountUp(true);
  };

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((response) => {
        const customerData = response.data;
        const customerCount = customerData.length;
        setCustomerCount(customerCount);
      })
      .catch((error) => console.error(error));
  }, []);

  function scrollOnTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Navigation />
      <Hero />

      <div className="stats">
        <div className="content">
          <div className="row">
            <div className="info">
              <h2 className="sub-title">Complete House Cleaning</h2>
              <p className="desc">
                Experience the power of intensive stain treatment right in your home, with the
                expertise of two or more of our skilled housekeeping professionals.
              </p>
              <Link to="/service" onClick={scrollOnTop}>
                <Button
                  variant="contained"
                  className="btn hero-cta cta"
                  style={{ marginTop: '24px' }}
                >
                  View Details
                </Button>
              </Link>
            </div>
            <div className="img-block">
              <img
                className="image"
                src="../assets/images/complete-house-cleaning.svg"
                alt="Complete House Cleaning"
              />
            </div>
          </div>

          <div className="row">
            <div className="img-block">
              <img
                className="image"
                src="../assets/images/laundry-service.svg"
                alt="Laundry Service"
              />
            </div>
            <div className="info">
              <h2 className="sub-title">Laundry Service</h2>
              <p className="desc">
                Easily collaborate with your colleagues by sharing notes with built-in white space.
                Furthermore, you have the option to publish a note to the internet and share the URL
                with anyone you choose.
              </p>
              <Link to="/service" onClick={scrollOnTop}>
                <Button
                  variant="contained"
                  className="btn hero-cta cta"
                  style={{ marginTop: '24px' }}
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="service-package">
        <div className="content">
          <div className="service-package-content animate">
            <div className="info">
              <h1 className="title">
                Service Packages Available <br />
                For Student Apartments
              </h1>
              <p className="desc">
                For student apartments that require recurring services multiple times each month,
                our <span>"Service Packages"</span> offer great convenience. With this option, you
                only need to schedule once for the entire month, saving you time. We ensure there
                are always available workers, and we prioritize those who have received positive
                feedback from customers.
              </p>
              <p className="desc">
                Additionally, <span>4Stu</span> allows you to change your home cleaning location if
                you move or work in other cities where <span>4Stu</span> also operates.
              </p>
              <p className="desc">
                To get started, customers need to pay for the service in advance, and we activate it
                once the payment is successful. You can find more details about terms and payment
                methods on our website.
              </p>

              <Link to="#!">
                <Button
                  variant="contained"
                  className="btn hero-cta cta"
                  style={{ marginTop: '40px' }}
                >
                  View Terms Of Use
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="your-choice">
        <div className="stats">
          <div className="content">
            <div className="row">
              <div className="img-block">
                <img
                  className="image"
                  src="../assets/images/your-choice.svg"
                  alt="Your Choice"
                  style={{ marginTop: '40px' }}
                />
              </div>
              <div className="info">
                <h2 className="sub-title">Feel Satisfied With Your Choice!</h2>
                <p className="desc">
                  Our commitment is to ensure your environment is clean, safe, and refreshed, all
                  under one roof. Experience the convenience and peace of mind with our versatile
                  services, tailored to meet your specific requirements.
                </p>
                <Link to="/service">
                  <Button
                    variant="contained"
                    className="btn hero-cta cta"
                    style={{ marginTop: '24px' }}
                  >
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="start-booking">
        <div className="stats">
          <div className="content">
            <div className="row">
              <div className="info">
                <h2 className="sub-title" style={{ color: '#fff' }}>
                  Start Booking
                </h2>
                <p className="desc" style={{ color: '#fff' }}>
                  Ready to embark on your 4Stu journey? Let's get started with your very first
                  appointment today!
                </p>
                <Link to="/service" onClick={scrollOnTop}>
                  <Button
                    variant="contained"
                    className="btn hero-cta cta"
                    style={{ marginTop: '24px' }}
                  >
                    Let's go
                  </Button>
                </Link>
              </div>
              <div className="img-block">
                <img
                  className="image"
                  src="../assets/images/start-booking - Copy.png"
                  alt="start-booking"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="process-service">
        <div className="content">
          <div className="process-header">
            <h2 className="title">Process Of Using The Service</h2>
            <p className="sub-title">
              Comprehend the process of utilizing our services for simplified management!
            </p>
          </div>

          <div className="process-all">
            <div className="process-step">
              <div className="home-process-info">
                <h3 className="process-name">Choose A Service</h3>
                <p className="process-desc">
                  We offer over 20 convenient utility services ready to assist you whenever you
                  need. Simply use your phone to visit the 4Stu website and choose the service you
                  desire.
                </p>
                <img className="process-img" src="../assets/images/process-1.svg" alt="process-1" />
              </div>
            </div>

            <div className="process-step">
              <div className="home-process-info">
                <img className="process-img" src="../assets/images/process-2.svg" alt="process-2" />
                <h3 className="process-name">Confirm Information</h3>
                <p className="process-desc">
                  Provide your full name, contact phone number, preferred date and time, and
                  specific location where you would like to use the service. This process can be
                  completed in less than a minute.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="home-process-info">
                <h3 className="process-name">Proceed The Task</h3>
                <p className="process-desc">
                  Our staffs will accept the service and come to the confirmed address on the order
                  to complete the task. Cleanliness, tidiness, and efficiency will always be
                  ensured, along with high quality.
                </p>
                <img className="process-img" src="../assets/images/process-3.svg" alt="process-3" />
              </div>
            </div>

            <div className="process-step">
              <div className="home-process-info">
                <img className="process-img" src="../assets/images/process-4.svg" alt="process-4" />
                <h3 className="process-name">Feedback And Rating</h3>
                <p className="process-desc">
                  You can assess the quality of the services through the Feedback section for 4Stu.
                  This allows us to make changes and further develop the quality of services in the
                  future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Waypoint onEnter={handleWaypointEnter}>
        <div className="one-millions">
          <div className="content">
            <div className="service-usage">
              <div className="info">
                <h1 className="title">
                  <h3>
                    <CountUp end={startCountUp ? customerCount * 10 : 0} duration={3} />+
                  </h3>
                  Customers Use 4Stu
                </h1>
              </div>

              <div className="service-datas">
                <div className="service-item">
                  <h2 className="data">
                    <FontAwesomeIcon icon={faUsers} className="custom-icon data-icon" />
                    <CountUp end={startCountUp ? 99 : 0} duration={3} />%
                  </h2>
                  <h3 className="data-name">Customer Satisfaction</h3>
                </div>

                <div className="service-item">
                  <h2 className="data">
                    <FontAwesomeIcon icon={faCircleCheck} className="custom-icon data-icon" />
                    <CountUp end={startCountUp ? 1000000 : 0} duration={3} />+
                  </h2>
                  <h3 className="data-name">Work Completed</h3>
                </div>

                <div className="service-item">
                  <h2 className="data">
                    <FontAwesomeIcon icon={faClock} className="custom-icon data-icon" />
                    <CountUp end={startCountUp ? 4500000 : 0} duration={3} />+
                  </h2>
                  <h3 className="data-name">Work Hours</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Waypoint>

      <div className="feedback">
        <div className="content">
          <div className="feedback-title">
            <h2 className="title">What Our Customers Says</h2>
          </div>

          <div className="feedback-content">
            <div className="feedback-box">
              <div className="feedback-msg">
                <img src="../assets/images/icon/quote-1.svg" alt="" />
                <p>
                  The service packages for our student apartment have been a game-changer. It
                  provides us with convenient cleaning, sanitation, and water delivery services
                  tailored to our needs.
                </p>
                <hr />
              </div>
              <div className="feedback-info">
                <img
                  src="../assets/images/avatar/avatar-nobita.svg"
                  alt="Le Duc Quang"
                  className="feedback-avatar"
                />
                <div className="feedback-user">
                  <h3 className="feedback-name">Le Duc Quang</h3>
                  <p className="feedback-desc">quangld@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="feedback-box">
              <div className="feedback-msg">
                <img src="../assets/images/icon/quote-1.svg" alt="" />
                <p>
                  I'm impressed with the service packages. The cleaning and sanitation are
                  top-notch, and the water delivery is a lifesaver. Highly recommend it to all
                  student apartments.
                </p>
                <hr />
              </div>
              <div className="feedback-info">
                <img
                  src="../assets/images/avatar/avatar-nobita.svg"
                  alt="Hoang Duc Huy"
                  className="feedback-avatar"
                />
                <div className="feedback-user">
                  <h3 className="feedback-name">Hoang Duc Huy</h3>
                  <p className="feedback-desc">duchuyhoang@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="feedback-box">
              <div className="feedback-msg">
                <img src="../assets/images/icon/quote-1.svg" alt="" />
                <p>
                  The service packages make our lives so much easier. We no longer have to worry
                  about cleaning and water supply. It's a fantastic solution for student apartments.
                </p>
                <hr />
              </div>
              <div className="feedback-info">
                <img
                  src="../assets/images/avatar/avatar-nobita.svg"
                  alt="Le Thi Binh"
                  className="feedback-avatar"
                />
                <div className="feedback-user">
                  <h3 className="feedback-name">Le Thi Binh</h3>
                  <p className="feedback-desc">ltbinh12@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
