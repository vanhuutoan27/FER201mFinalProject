import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Detail from '../../common/Detail/Detail';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import './Service.css';

function Service() {
  const [allServices, setAllServices] = useState([]);
  const [allPackageServices, setAllPackageServices] = useState([]);
  const [feedbackRatings, setFeedbackRatings] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackageService, setSelectedPackageService] = useState(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [staffOrders, setStaffOrders] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const handleOrderClick = (service) => {
    localStorage.setItem('selectedService', JSON.stringify(service));
    window.scrollTo(0, 0);
  };

  const handleViewServiceDetailClick = (service) => {
    setSelectedService(service);
    setDetailModalVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const handleViewPackageServiceDetailClick = (packageService) => {
    setSelectedPackageService(packageService);
    setDetailModalVisible(true);
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    axios
      .get('/ServiceManagements')
      .then((response) => {
        const servicesWithRating = response.data.map((service) => ({
          ...service,
          rating: calculateAverageRating(feedbackRatings, service.serviceId),
        }));
        setAllServices(servicesWithRating);
      })
      .catch((error) => console.log(error));

    axios
      .get('/PackageServiceManagements')
      .then((response) => {
        const packageServicesWithRating = response.data.map((packageService) => ({
          ...packageService,
          rating: calculateAverageRating(feedbackRatings, packageService.serviceId),
        }));
        setAllPackageServices(packageServicesWithRating);
      })
      .catch((error) => console.log(error));

    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setLoggedIn(true);
    }

    axios
      .get('/FeedbackManagements')
      .then((response) => {
        const feedbackRatings = {};

        response.data.forEach((feedback) => {
          const serviceId = feedback.serviceId;
          const rating = feedback.rating;

          if (!feedbackRatings[serviceId]) {
            feedbackRatings[serviceId] = [rating];
          } else {
            feedbackRatings[serviceId].push(rating);
          }
        });

        setFeedbackRatings(feedbackRatings);
      })
      .catch((error) => console.log(error));

    axios
      .get('/StaffOrderManagements')
      .then((response) => setStaffOrders(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((userResponse) => {
        const users = userResponse.data;

        axios
          .get('/StaffManagements')
          .then((staffResponse) => {
            const staffs = staffResponse.data;

            // Khi cả hai API request đã hoàn thành, kết hợp thông tin
            const combinedData = staffs.map((staff) => {
              const user = users.find((user) => user.userId === staff.staffId);
              return { ...staff, user };
            });

            setCombinedData(combinedData);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  function calculateAverageRating(feedbackRatings, serviceId) {
    const ratings = feedbackRatings[serviceId];
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;

    return average;
  }

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

  const averageRating = selectedService
    ? calculateAverageRating(feedbackRatings, selectedService.serviceId)
    : 0;

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
          <div className="menu_icon">
            {feedbackRatings[service.serviceId]
              ? renderStars(calculateAverageRating(feedbackRatings, service.serviceId))
              : Array(5)
                  .fill()
                  .map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="outline-star" />
                  ))}
          </div>

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
      <div
        className="gallary_image"
        key={index}
        onClick={() => handleViewPackageServiceDetailClick(packageService)}
      >
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

  function filterActiveServices(services) {
    return services.map((service) => ({
      ...service,
    }));
  }

  function filterActivePackageServices(packageServices) {
    return packageServices.map((packageService) => ({
      ...packageService,
    }));
  }

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

              <Link to="#order-now">
                <Button variant="contained" className="btn">
                  Order Now
                </Button>
              </Link>
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
                Discover the Benefits of <span>4Stu Services</span>
              </h2>
              <ol>
                <li>
                  <span>Unmatched Convenience</span> <br />
                  4Stu is dedicated to making the lives of students easier. We provide a wide range
                  of daily services, including cleaning, sanitation, and water delivery, so you can
                  focus on your studies and enjoy student life without worrying about chores.
                </li>
                <li>
                  <span>High-Quality Service Packages</span> <br />
                  Our service packages are tailor-made for student apartments. We are committed to
                  delivering services that not only meet but exceed your expectations in terms of
                  quality and reliability.
                </li>
                <li>
                  <span>Reliable and Trustworthy</span> <br />
                  At 4Stu, reliability and trust are at the core of our values. Our professional
                  staff is always on hand to promptly and efficiently handle your requests, ensuring
                  a seamless experience.
                </li>
                <li>
                  <span>Customized Solutions</span> <br />
                  We recognize that each student community is unique. That's why we offer
                  customizable service packages, allowing you to select services that best suit your
                  specific needs and preferences.
                </li>
              </ol>
            </div>
          </div>
          <Link to="#order-now">
            <Button variant="contained" className="btn">
              Order Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="content">
        <div id="order-now" className="menu">
          <h1>
            Our<span>Services</span>
          </h1>

          <div className="menu_box">{renderService(filterActiveServices(allServices))}</div>
        </div>
      </div>

      <div className="service-package-content">
        <div className="gallary">
          <h1>
            Our<span>Package Services</span>
          </h1>

          <div className="gallary_image_box">
            {renderPackageService(filterActivePackageServices(allPackageServices))}
          </div>
        </div>
      </div>

      {isDetailModalVisible && (
        <Detail
          selectedService={selectedService}
          selectedPackageService={selectedPackageService}
          rating={averageRating}
          onClose={() => setDetailModalVisible(false)}
        />
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
                Our software system offers a range of service packages designed for student
                apartments. Each package includes services such as cleaning, sanitation, and water
                delivery. Select the package that best suits your needs.
              </p>
            </div>
          </div>

          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/completed-task-d.svg" alt="Confirm Information" />
            </div>

            <div className="review_text">
              <h2 className="name">Confirm Your Details</h2>

              <p>
                Provide your full name, contact phone number, preferred date and time, and specific
                location within your apartment complex where you'd like to receive the services.
                This process is quick and easy, taking less than a minute.
              </p>
            </div>
          </div>

          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/achievement-3.svg" alt="Proceed The Task" />
            </div>

            <div className="review_text">
              <h2 className="name">Get the Services Done</h2>

              <p>
                Our dedicated staff will perform the services as requested. They will update the
                results of the services to ensure a smooth process.
              </p>
            </div>
          </div>

          <div className="review_card">
            <div className="review_profile">
              <img src="../assets/manypixels/quality-check-b.svg" alt="Feedback And Rating" />
            </div>

            <div className="review_text">
              <h2 className="name">Provide Feedback and Ratings</h2>

              <p>
                After each service, you have the opportunity to provide feedback and ratings. Your
                input is valuable as it helps us improve the quality of our services for the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="team" style={{ marginBottom: '140px' }}>
        <h1>
          Our<span>Staffs</span>
        </h1>

        <div className="team_box">
          {combinedData.map((item, index) => {
            return (
              <div className="profile" key={index}>
                <img
                  src={item.user.avatar || '../assets/images/avatar/avatar-nobita.svg'}
                  alt={item.user.firstName + ' ' + item.user.lastName}
                />

                <div className="info">
                  <h2 className="name">
                    {item.user.firstName && item.user.lastName
                      ? `${item.user.firstName} ${item.user.lastName}`
                      : item.firstName || 'Staff'}
                  </h2>
                  <p className="bio">{item.bio || ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Service;
