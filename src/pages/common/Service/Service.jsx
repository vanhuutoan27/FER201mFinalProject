import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import { Link } from 'react-router-dom';
import Detail from '../../common/Detail/Detail';

import Button from '@mui/material/Button';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import './Service.css';

function Service() {
  const [allServices, setAllServices] = useState([]);
  const [allPackageServices, setAllPackageServices] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);

  const handleOrderClick = (service) => {
    localStorage.setItem('selectedService', JSON.stringify(service));
    window.scrollTo(0, 0);
  };

  const handleViewServiceDetailClick = (service) => {
    setSelectedService(service);
    setDetailModalVisible(true);
  };

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/ServiceManagements')
      .then((response) => {
        const servicesWithRating = response.data.map((service) => ({
          ...service,
          rating: service.rating,
        }));
        setAllServices(servicesWithRating);
      })
      .catch((error) => console.log(error));

    axios
      .get('https://localhost:7088/api/PackageServiceManagements')
      .then((response) => setAllPackageServices(response.data))
      .catch((error) => console.log(error));

    // Kiểm tra cookie accessToken để xác định trạng thái đăng nhập
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setLoggedIn(true);
    }
  }, []);

  const formatPriceWithDot = (price) => {
    if (!isNaN(price)) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return price;
  };

  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.ceil(rating)) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="filled-star" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="outline-star" />);
      }
    }
    return stars;
  }

  const renderService = (services) => {
    return services.map((service, index) => (
      <div className="menu_card" key={index}>
        <div className="menu_image">
          <img
            src={service.image}
            alt={service.serviceName}
            onClick={() => handleViewServiceDetailClick(service)}
          />
        </div>

        <div className="menu_info">
          <h2 onClick={() => handleViewServiceDetailClick(service)}>{service.serviceName}</h2>
          <h3>{formatPriceWithDot(service.price)} VND</h3>
          <div className="menu_icon">{renderStars(service.rating)}</div>

          <Button
            variant="contained"
            className="btn"
            component={Link}
            to={`/order?serviceName=${service.serviceName}&price=${service.price}&image=${service.longImage}`}
            onClick={() => handleOrderClick(service)}
          >
            Order Now
          </Button>
        </div>
      </div>
    ));
  };

  const renderPackageService = (packageServices) => {
    return packageServices.map((packageService, index) => (
      <div className="gallary_image" key={index}>
        <img src="../assets/images/4Stu-Logo.svg" alt="4Stu Logo" />

        <h3>{packageService.packageServiceName}</h3>
        <p>{packageService.packageServiceDesc}</p>
        <Button
          variant="contained"
          className="btn"
          component={Link}
          to={`/order?serviceName=${packageService.servicePackageName}&price=${packageService.price}&image=${packageService.longImage}`}
          onClick={() => handleOrderClick(packageService)}
        >
          Order Now
        </Button>
      </div>
    ));
  };

  return (
    <div className="ServicePage">
      <Navigation />
      <div className="service-header">
        <div className="content">
          <div className="main">
            <div className="men_text">
              <h1>Choose Your </h1>
              <h2>Service Package</h2>
              <p>
                We're delighted to introduce our specialized software system designed to provide
                high-quality service packages for student apartments. Our commitment is to bring
                convenience and time-saving solutions to your student community through perfect
                daily life services.
              </p>
              <Button href="#order-now" variant="contained" className="btn">
                Order Now
              </Button>
            </div>

            <div className="main_image">
              <img src="../assets/manypixels/hero-employee-b.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="content">
          <div className="about_main">
            <div className="image">
              <img src="../assets/manypixels/hiking-20.svg" alt="Hiking" />
            </div>

            <div className="about_text">
              <h2>
                Why Choose <span>4Stu Services</span>?
              </h2>
              <ol>
                <li>
                  <span>Exceptional Convenience</span> <br />
                  4Stu helps students save time and effort by providing convenient daily services
                  like cleaning, sanitation, and water delivery, allowing them to focus on their
                  studies and enjoy student life.
                </li>
                <li>
                  <span>High-Quality Service Packages</span> <br />
                  We offer high-quality service packages specifically designed for student
                  apartments. Our commitment ensures that you receive services that exceed your
                  expectations.
                </li>
                <li>
                  <span> Reliable and Trustworthy</span> <br />
                  With 4Stu, you can trust in our reliability and credibility. Our professional
                  staff is always ready to ensure your requests are handled promptly and
                  efficiently.
                </li>
                <li>
                  <span>Customized Solutions</span> <br /> We understand that each student community
                  is unique. That's why we provide customizable service packages, allowing you to
                  select services that best fit your specific needs.
                </li>
              </ol>
            </div>
          </div>
          <Button href="#order-now" variant="contained" className="btn">
            Order Now
          </Button>
        </div>
      </div>

      <div className="content">
        <div id="order-now" className="menu">
          <h1>
            Our<span>Services</span>
          </h1>

          <div className="menu_box">{renderService(allServices)}</div>
        </div>
      </div>

      <div className="service-package-content">
        <div className="gallary">
          <h1>
            Our<span>Package Services</span>
          </h1>

          <div className="gallary_image_box">{renderPackageService(allPackageServices)}</div>
        </div>
      </div>

      {isDetailModalVisible && (
        <Detail selectedService={selectedService} onClose={() => setDetailModalVisible(false)} />
      )}

      <div className="review" id="Review">
        <h1>
          Process Of Using The<span>Services </span>
        </h1>

        <div className="review_box">
          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/new-message-e.png" alt="Choose A Service" />
            </div>

            <div className="review_text">
              <h2 className="name">Choose A Service</h2>

              <p>
                We offer over 20 convenient utility services ready to assist you whenever you need.
                Simply use your phone to visit the 4Stu website and choose the service you desire.
              </p>
            </div>
          </div>

          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/completed-task-d.svg" alt="Confirm Information" />
            </div>

            <div className="review_text">
              <h2 className="name">Confirm Information</h2>

              <p>
                Provide your full name, contact phone number, preferred date and time, and specific
                location where you would like to use the service. This process can be completed in
                less than a minute.
              </p>
            </div>
          </div>

          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/achievement-3.svg" alt="Proceed The Task" />
            </div>

            <div className="review_text">
              <h2 className="name">Proceed The Task</h2>

              <p>
                Provide your full name, contact phone number, preferred date and time, and specific
                location where you would like to use the service. This process can be completed in
                less than a minute.
              </p>
            </div>
          </div>

          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/quality-check-b.svg" alt="Feedback And Rating" />
            </div>

            <div className="review_text">
              <h2 className="name">Feedback And Rating</h2>

              <p>
                You can assess the quality of the services through the Feedback section for 4Stu.
                This allows us to make changes and further develop the quality of services in the
                future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="team">
        <h1>
          Our<span>Staff</span>
        </h1>

        <div className="team_box">
          <div className="profile">
            <img src="../assets/images/avatar/avatar-nobita.svg" alt="Staff" />

            <div className="info">
              <h2 className="name">Staff</h2>
              <p className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <div className="profile">
            <img src="../assets/images/avatar/avatar-nobita.svg" alt="Staff" />

            <div className="info">
              <h2 className="name">Staff</h2>
              <p className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <div className="profile">
            <img src="../assets/images/avatar/avatar-nobita.svg" alt="Staff" />

            <div className="info">
              <h2 className="name">Staff</h2>
              <p className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <div className="profile">
            <img src="../assets/images/avatar/avatar-nobita.svg" alt="Staff" />

            <div className="info">
              <h2 className="name">Staff</h2>
              <p className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Service;
