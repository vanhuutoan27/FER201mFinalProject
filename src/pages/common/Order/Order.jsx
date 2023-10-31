import React, { useContext, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import Swal from 'sweetalert2';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

import { sendEmail } from '../../../components/emailService';
import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import './Order.css';

function Order() {
  const session = useContext(AuthContext);
  const userInfo = session && session.user && session.user.user;
  const hasNoSession = !session || !session.user || !session.user.user;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isMomoPaymentSelected, setIsMomoPaymentSelected] = useState(false);
  const [randomCode, setRandomCode] = useState(generateRandomCode());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const isAccountSectionVisible = hasNoSession;

  const selectedService = JSON.parse(localStorage.getItem('selectedService'));
  const selectedPackageService = JSON.parse(localStorage.getItem('selectedPackageService'));
  const subTotalString = selectedService.price;
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [currentDiscountCode, setCurrentDiscountCode] = useState('');
  const subTotalWithoutCurrency = subTotalString.replace(/\D/g, '');
  const subTotal = parseFloat(subTotalWithoutCurrency);
  const tax = 0;
  const discountAmount = (discountPercentage / 100) * subTotal;
  const total = subTotal + tax - discountAmount;

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
        .post('/CustomerManagements/Login', {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.accessToken);
          Cookies.set('accessToken', response.data.accessToken);

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
      if (isDiscountApplied) {
        shippingFormik.setValues({
          ...shippingFormik.values,
          price: formatPriceWithDot(total), // Sử dụng giá đã giảm nếu mã giảm giá đã được áp dụng
        });
      } else {
        shippingFormik.setValues({
          ...shippingFormik.values,
          price: formatPriceWithDot(subTotal), // Sử dụng giá ban đầu nếu không có mã giảm giá
        });
      }
      shippingFormik.handleSubmit();
    }
    sendOrderConfirmationEmail();
  };

  const sendOrderConfirmationEmail = () => {
    const emailData = {
      to: userInfo.email,
      subject: 'Order Confirmation',
      text: 'Your order has been confirmed. Thank you for your purchase!',
    };

    sendEmail(emailData)
      .then((response) => {
        console.log('Email sent to:', userInfo.email);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  const selectedServiceInfo = selectedService || selectedPackageService;
  const serviceId = selectedServiceInfo ? selectedServiceInfo.serviceId : null;
  const serviceName = selectedServiceInfo ? selectedServiceInfo.serviceName : null;
  const packageServiceId = selectedServiceInfo ? selectedServiceInfo.packageServiceId : null;
  const packageServiceName = selectedServiceInfo ? selectedServiceInfo.packageServiceName : null;

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
        customerId: userInfo.userId,
        customerName: values.fullName,
        email: userInfo.email,
        phone: values.phoneNumber,
        address: values.address,
        serviceId: serviceId || packageServiceId,
        serviceName: serviceName || packageServiceName,
        price: total.toString(),
        note: values.note,
        paymentMethod: selectedPaymentMethod,
      };

      axios
        .post('/OrderManagements', orderData)
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

  const discountCodeRef = useRef(null);

  const applyDiscount = () => {
    const code = discountCodeRef.current.value;
    if (code === 'Halo4Stu' || code === '4StuServices') {
      setDiscountPercentage(20);
      setIsDiscountApplied(true); // Đánh dấu rằng mã giảm giá đã được áp dụng
      // Thêm class total-discounted để thay đổi màu của total thành màu đỏ
      document.querySelector('.total').classList.add('total-discounted');

      // Show a success message when the discount is applied
      Swal.fire({
        icon: 'success',
        title: 'Discount Applied!',
        text: 'Your discount code has been applied successfully.',
      });
    } else {
      setDiscountPercentage(0);
      setIsDiscountApplied(false); // Đánh dấu rằng mã giảm giá không được áp dụng
      // Loại bỏ class total-discounted để trả lại màu mặc định
      document.querySelector('.total').classList.remove('total-discounted');

      // Show an error message when the discount code is not valid
      Swal.fire({
        icon: 'error',
        title: 'Invalid Discount Code',
        text: 'The discount code you entered is not valid. Please try again.',
      });
    }
  };

  const handleDiscountCodeChange = (code) => {
    if (code === 'Halo4Stu' || code === '4StuServices') {
      setDiscountPercentage(20);
      setIsDiscountApplied(true);
      document.querySelector('.total').classList.add('total-discounted');
    } else {
      setDiscountPercentage(0);
      setIsDiscountApplied(false);
      document.querySelector('.total').classList.remove('total-discounted');
    }
  };

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
                    <Form.Label className="mb-2 ms-3">Email</Form.Label>
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
                    <Form.Label className="mb-2 ms-3">Password</Form.Label>
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
                      <Form.Label className="mb-2 ms-3">Full Name</Form.Label>
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
                      <Form.Label className="mb-2 ms-3">Phone Number</Form.Label>
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
                  <Form.Label className="mb-2 ms-3">Address</Form.Label>
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
                      <Form.Label className="mb-2 ms-3">Note</Form.Label>
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
                      <Form.Label className="mb-2 ms-3">Payment Methods</Form.Label>
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
                      <Form.Label className="mb-2 ms-3"></Form.Label>
                      <Form.Control type="text" value={'Van Huu Toan'} readOnly />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="mb-2 ms-3"></Form.Label>
                      <Form.Control type="text" value={'0792766979'} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label className="mb-2 ms-3">Payment Content</Form.Label>
                  <Form.Control
                    type="text"
                    value={`YOUR FULL NAME - YOUR PHONE - ${randomCode}`}
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
          {selectedService || selectedPackageService ? (
            <>
              <img
                src={selectedService ? selectedService.longImage : selectedPackageService.longImage}
                alt={
                  selectedService
                    ? selectedService.serviceName
                    : selectedPackageService.packageServiceName
                }
              />
              <p>
                {selectedService
                  ? selectedService.serviceName
                  : selectedPackageService.packageServiceName}
              </p>
              <h3>
                {formatPriceWithDot(
                  selectedService ? selectedService.price : selectedPackageService.price
                )}{' '}
                VND
              </h3>
            </>
          ) : (
            <p>No service selected.</p>
          )}
          <div className="price-content">
            <div className="discount-section">
              <Form.Control
                type="text"
                placeholder="Discount Code"
                value={currentDiscountCode}
                onChange={(e) => {
                  setCurrentDiscountCode(e.target.value);
                  handleDiscountCodeChange(e.target.value);
                }}
                ref={discountCodeRef}
              />
              <Link to="#!" className="btn" onClick={applyDiscount}>
                Apply
              </Link>
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
              <p>Discount</p>
              <p>{discountPercentage ? discountPercentage : 0}%</p>
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
