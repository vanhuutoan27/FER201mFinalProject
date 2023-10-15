import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCircleCheck, faClock } from '@fortawesome/free-solid-svg-icons';

import Button from '@mui/material/Button';

import './Home.css';
import Navigation from '../../../components/Navigation';
import Hero from '../../../components/Hero';
import Footer from '../../../components/Footer';

function Home() {
  const [customerCount, setCustomerCount] = useState('100,000+');

  useEffect(() => {
    const randomCount = getRandomCustomerCount();
    setCustomerCount(randomCount.toLocaleString());
  }, []);

  function getRandomCustomerCount() {
    const randomNumber = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);
    const roundedNumber = Math.round(randomNumber / 100000) * 100000;
    return roundedNumber.toLocaleString();
  }

  return (
    <div>
      <Navigation />
      <Hero />

      <div className="popular">
        <div className="popular-header">
          <h2 className="title">
            <a href="#popular-service">Most Popular Service On 4Stu</a>
          </h2>
        </div>
        <div className="content" id="popular-service">
          <div className="popular-1">
            <div className="info">
              <h1 className="title">Complete House Cleaning</h1>
              <p className="desc">
                Experience the power of intensive stain treatment right in your home, with the
                expertise of two or more of our skilled housekeeping professionals.
              </p>
              <Button href="/service" variant="contained" className="btn cta">
                View Details
              </Button>
            </div>

            <img
              src="../assets/images/complete-house-cleaning.png"
              alt="Complete House Cleaning"
              className="popular-1-img"
            />
          </div>

          <div className="popular-2">
            <div className="info">
              <h1 className="title">Laundry Service</h1>
              <p className="desc">
                Easily collaborate with your colleagues by sharing notes with built-in white space.
                Furthermore, you have the option to publish a note to the internet and share the URL
                with anyone you choose.
              </p>
              <Button href="/service" variant="contained" className="btn cta">
                View Details
              </Button>
            </div>

            <img
              src="../assets/images/laundry-service.png"
              alt="Complete House Cleaning"
              className="popular-2-img"
            />
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

              <Button href="#!" variant="contained" className="btn cta">
                View Terms Of Use
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="your-choice">
        <div className="content">
          <div className="your-choice-content">
            <div className="info">
              <h1 className="title">Feel Satisfied With Your Choice</h1>
              <p className="desc">
                Our commitment is to ensure your environment is clean, safe, and refreshed, all
                under one roof. Experience the convenience and peace of mind with our versatile
                services, tailored to meet your specific requirements.
              </p>
              <Button href="/contact" variant="contained" className="btn cta">
                Support
              </Button>
            </div>

            <img
              src="../assets/images/your-choice.png"
              alt="Your Choice"
              className="your-choice-img"
            />
          </div>
        </div>
      </div>

      <div className="start-booking">
        <div className="content">
          <div className="booking">
            <div className="info">
              <h1 className="title">Start Booking</h1>
              <p className="desc">
                Ready to embark on your 4Stu journey? Let's get started with your very first
                appointment today!
              </p>
              <Button href="/service" variant="contained" className="btn cta">
                Let's Go
              </Button>
            </div>

            <img
              src="../assets/images/start-booking - Copy.png"
              alt="start-booking"
              className="booking-img"
            />
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

      <div className="one-millions">
        <div className="content">
          <div className="service-usage">
            <div className="info">
              <h1 className="title">
                <span>{customerCount}+</span> Customers Use 4Stu
              </h1>

              <Button href="#!" variant="contained" className="btn cta">
                Read More
              </Button>
            </div>
            <div className="service-datas">
              <div className="service-item">
                <h2 className="data">
                  <FontAwesomeIcon icon={faUsers} className="custom-icon data-icon" />
                  99%
                </h2>
                <h3 className="data-name">Customer Satisfaction</h3>
              </div>

              <div className="service-item">
                <h2 className="data">
                  <FontAwesomeIcon icon={faCircleCheck} className="custom-icon data-icon" />
                  1,000,000+
                </h2>
                <h3 className="data-name">Work Completed</h3>
              </div>

              <div className="service-item">
                <h2 className="data">
                  <FontAwesomeIcon icon={faClock} className="custom-icon data-icon" />
                  4,500,000+
                </h2>
                <h3 className="data-name">Work Hours</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laudantium
                  alias aliquid, autem expedita tempora pariatur, mollitia rerum maxime dolorem.
                </p>
                <hr />
              </div>
              <div className="feedback-info">
                <img src="../assets/images/avatar/picrew2.jpg" alt="" className="feedback-avatar" />
                <div className="feedback-user">
                  <h3 className="feedback-name">Van Huu Toan 1</h3>
                  <p className="feedback-desc">FPTU Campus HCM</p>
                </div>
              </div>
            </div>

            <div className="feedback-box">
              <div className="feedback-msg">
                <img src="../assets/images/icon/quote-1.svg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laudantium
                  alias aliquid, autem expedita tempora pariatur, mollitia rerum maxime dolorem.
                </p>
                <hr />
              </div>
              <div className="feedback-info">
                <img src="../assets/images/avatar/picrew1.jpg" alt="" className="feedback-avatar" />
                <div className="feedback-user">
                  <h3 className="feedback-name">Van Huu Toan 2</h3>
                  <p className="feedback-desc">FPTU Campus HCM</p>
                </div>
              </div>
            </div>

            <div className="feedback-box">
              <div className="feedback-msg">
                <img src="../assets/images/icon/quote-1.svg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laudantium
                  alias aliquid, autem expedita tempora pariatur, mollitia rerum maxime dolorem.
                </p>
                <hr />
              </div>
              <div className="feedback-info">
                <img src="../assets/images/avatar/picrew4.png" alt="" className="feedback-avatar" />
                <div className="feedback-user">
                  <h3 className="feedback-name">Van Huu Toan 3</h3>
                  <p className="feedback-desc">FPTU Campus HCM</p>
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
