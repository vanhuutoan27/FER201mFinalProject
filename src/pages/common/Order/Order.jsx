import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Session } from '../../../App';
import Swal from 'sweetalert2';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

import { formatPriceWithDot } from '../../../utils/PriceUtils';
import './Order.css';

function Order() {
  const session = useContext(Session);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isMomoPaymentSelected, setIsMomoPaymentSelected] = useState(false);
  const [randomCode, setRandomCode] = useState(generateRandomCode());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [hasSession, setHasSession] = useState(session.user != null);
  const [isAccountSectionVisible, setIsAccountSectionVisible] = useState(!hasSession);

  const selectedService = JSON.parse(localStorage.getItem('selectedService'));
  const subTotalString = selectedService.price;
  const subTotalWithoutCurrency = subTotalString.replace(/\D/g, '');
  const subTotal = parseFloat(subTotalWithoutCurrency);
  const tax = 0;
  const total = subTotal + tax;

  function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setSelectedPaymentMethod(selectedMethod);

    if (selectedMethod === 'momo') {
      setIsMomoPaymentSelected(true);
    } else {
      setIsMomoPaymentSelected(false);
    }
  };

  const handleSubmitAccount = (e) => {
    e.preventDefault();
    accountFormik.handleSubmit();
  };

  const accountFormik = useFormik({
    initialValues: {
      email: 'user1@gmail.com',
      password: '123456',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),

    onSubmit: (values) => {
      setIsSubmitting(true);
      setLoginError(null);

      axios
        .post('https://localhost:7088/api/CustomerManagements/Login', {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.accessToken);
          Cookies.set('accessToken', response.data.accessToken);

          setHasSession(true);
          setIsAccountSectionVisible(false);

          window.location.reload();
        })
        .catch((error) => {
          setLoginError('Invalid email or password. Please try again.');
          console.error(error);
          alert('Failed to login. Please try again');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a payment method before placing your order!',
      });
    } else {
      shippingFormik.handleSubmit();
    }
  };

  const shippingFormik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      address: '',
      note: '',
      paymentMethod: '',
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      address: Yup.string().required('Address is required'),
    }),

    onSubmit: (values) => {
      const orderData = {
        customerId: hasSession ? session.user.customerId : '',
        customerName: values.fullName,
        email: hasSession ? session.user.email : '',
        phone: values.phoneNumber,
        address: values.address,
        serviceId: selectedService.serviceId,
        serviceName: selectedService.serviceName,
        price: total.toString(),
        note: values.note,
        paymentMethod: selectedPaymentMethod,
      };

      axios
        .post('https://localhost:7088/api/OrderManagements', orderData)
        .then((response) => {
          console.log(response.data);
          console.log('Order Data:', orderData);

          Swal.fire({
            icon: 'success',
            title: 'Order Successful!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = '/order-completion';
          });
        })
        .catch((error) => {
          console.log(error);
          console.log('Order Data:', orderData);

          Swal.fire({
            icon: 'error',
            title: 'Order failed!',
            text: 'Failed to place your order! Please try again.',
          });
        });
    },
  });

  return (
    <div className="OrderPage">
      <Navigation />
      <div className="content">
        <div className="info-section">
          <div className="process-info">
            <section className="step-wizard">
              <ul className="step-wizard-list">
                <li className={`step-wizard-item ${isAccountSectionVisible ? 'current-item' : ''}`}>
                  <Link to="" className="progress-count">
                    1
                  </Link>
                  <Link to="" className="progress-label">
                    Account
                  </Link>
                </li>

                <li
                  className={`step-wizard-item ${!isAccountSectionVisible ? 'current-item' : ''}`}
                >
                  <Link to="" className="progress-count">
                    2
                  </Link>
                  <Link to="" className="progress-label">
                    Shipping
                  </Link>
                </li>

                <li className="step-wizard-item">
                  <Link to="" className="progress-count">
                    3
                  </Link>
                  <Link to="" className="progress-label">
                    Completion
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          {/* Display the Account Details section if there is no session */}
          {isAccountSectionVisible && (
            <div id="account-section" className="changeable-content">
              <div className="main-info-section">
                <h2>Account Details</h2>
                <Form className="account-form" onSubmit={accountFormik.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    {accountFormik.touched.email && accountFormik.errors.email ? (
                      <div className="error-msg">{accountFormik.errors.email}</div>
                    ) : null}
                    <Form.Control
                      type="email"
                      name="email"
                      value={accountFormik.values.email}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    {accountFormik.touched.password && accountFormik.errors.password ? (
                      <div className="error-msg">{accountFormik.errors.password}</div>
                    ) : null}
                    <Form.Control
                      type="password"
                      name="password"
                      value={accountFormik.values.password}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </Form.Group>
                  <div className="btn-action">
                    <Link to="/login">Register</Link>
                    <button type="button" className="btn" onClick={handleSubmitAccount}>
                      {isSubmitting ? 'Logging In...' : 'Login'}
                    </button>
                  </div>
                </Form>
              </div>
              <hr />
            </div>
          )}

          <Form>
            <div
              id="shipping-section"
              className={`changeable-content ${isAccountSectionVisible ? 'hidden' : ''}`}
            >
              <div className="main-info-section">
                <h2>Shipping Details</h2>
                <Row>
                  <Col sm={7}>
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={shippingFormik.values.fullName}
                        onChange={shippingFormik.handleChange}
                        onBlur={shippingFormik.handleBlur}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={5}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={shippingFormik.values.phoneNumber}
                        onChange={shippingFormik.handleChange}
                        onBlur={shippingFormik.handleBlur}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={shippingFormik.values.address}
                    onChange={shippingFormik.handleChange}
                    onBlur={shippingFormik.handleBlur}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Note</Form.Label>
                      <Form.Control
                        type="text"
                        name="note"
                        value={shippingFormik.values.note}
                        onChange={shippingFormik.handleChange}
                        onBlur={shippingFormik.handleBlur}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Payment Methods</Form.Label>
                      <Form.Control
                        as="select"
                        className="custom-select"
                        value={selectedPaymentMethod}
                        onChange={handlePaymentMethodChange}
                        name="paymentMethod"
                      >
                        <option value=""></option>
                        <option value="momo">Payment via Momo</option>
                        <option value="not-yet">Payment on Completion</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr />
            </div>
          </Form>

          {isMomoPaymentSelected && (
            <div
              id="payment-section"
              className={`changeable-content ${isAccountSectionVisible ? 'hidden' : ''}`}
            >
              <div className="main-info-section">
                <h2>Payment Details</h2>
                <Row>
                  <Col sm={4}>
                    <div className="qr-payment">
                      <img src="../assets/images/QRPayment.jpg" alt="QR Payment" />
                    </div>
                  </Col>

                  <Col sm={8}>
                    <Form.Group>
                      <Form.Label></Form.Label>
                      <Form.Control type="text" value={'Van Huu Toan'} readOnly />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label></Form.Label>
                      <Form.Control type="text" value={'0792766979'} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Payment Content</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${session.user?.firstName.toUpperCase() || ''} ${
                      session.user?.lastName.toUpperCase() || ''
                    } - ${session.user?.phone || ''} - ${randomCode}`}
                    readOnly
                  />
                </Form.Group>
              </div>
              <hr />
            </div>
          )}

          <div className="btn-next-action">
            {!isAccountSectionVisible && <Link to="/service">Cancel Order</Link>}
            {!isAccountSectionVisible && (
              <button type="button" className="btn" onClick={handleSubmitOrder}>
                Done
              </button>
            )}
          </div>
        </div>

        <div className="order-section">
          <h2>Order Summary</h2>
          {selectedService && (
            <>
              <img src={selectedService.longImage} alt={selectedService.serviceName} />
              <p>{selectedService.serviceName}</p>
              <h3>{formatPriceWithDot(selectedService.price)} VND</h3>
            </>
          )}
          <div className="price-content">
            <div className="discount-section">
              <Form.Control type="text" placeholder="Discount Code" />
              <a href="#!" className="btn">
                Apply
              </a>
            </div>

            <div className="sub-total">
              <p>Sub Total</p>
              <p>{formatPriceWithDot(subTotal)} VND</p>
            </div>

            <div className="tax">
              <p>Tax</p>
              <p>{formatPriceWithDot(tax)} VND</p>
            </div>

            <div className="shipping">
              <p>Shipping</p>
              <p>Free</p>
            </div>

            <div className="total">
              <p>Total</p>
              <p>{formatPriceWithDot(total)} VND</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Order;
