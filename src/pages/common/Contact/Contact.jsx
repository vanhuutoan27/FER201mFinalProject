import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import { sendEmail } from '../../../components/emailService';

import './Contact.css';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';

function Contact() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    sendOrderConfirmationEmail(values);
    console.log('Form data:', values);
    resetForm();
  };

  const sendOrderConfirmationEmail = (formData) => {
    const emailData = {
      to: '4stu.contact@gmail.com',
      subject: '4Stu Contact',
      text: `
        Full Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phoneNumber}
        Message: ${formData.message}
      `,
    };

    sendEmail(emailData)
      .then((response) => {
        console.log('Email sent to:', '4stu.contact@gmail.com');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div id="ContactPagee">
      <Navigation />
      <div className="ContactPage">
        <section className="contact-container">
          <div className="container">
            <div className="contactusInfo">
              <div>
                <h2>Contact Info</h2>
                <ul className="info">
                  <li>
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} className="custom-icon-contact" />
                    </span>
                    <span>4Stu Tower, Thu Duc, Ho Chi Minh City</span>
                  </li>
                  <li>
                    <span>
                      <FontAwesomeIcon icon={faEnvelope} className="custom-icon-contact" />
                    </span>
                    <span>4stu.contact@gmail.com</span>
                  </li>
                  <li>
                    <span>
                      <FontAwesomeIcon icon={faPhone} className="custom-icon-contact" />
                    </span>
                    <span>0792766979</span>
                  </li>
                </ul>
              </div>
              <ul className="sci">
                <li>
                  <Link to="https://github.com/vanhuutoan27/4stu-swp-project">
                    <img src="./assets/images/icon/github.svg" alt="" className="custom-icon" />
                  </Link>
                </li>
                <li>
                  <Link to="#!">
                    <img
                      src="../assets/images/icon/facebook-f.svg"
                      alt=""
                      className="custom-icon"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#!">
                    <img
                      src="./assets/images/icon/linkedin-in.svg"
                      alt=""
                      className="custom-icon"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="contactusInForm">
              <h2>Send a Message</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="formBox">
                  <div className="inputBox w50">
                    <Field type="text" name="firstName" />
                    <div className="label-error">
                      <span>First Name</span>
                      <ErrorMessage name="firstName" component="div" className="error" />
                    </div>
                  </div>
                  <div className="inputBox w50">
                    <Field type="text" name="lastName" />
                    <div className="label-error">
                      <span>Last Name</span>
                      <ErrorMessage name="lastName" component="div" className="error" />
                    </div>
                  </div>
                  <div className="inputBox w50">
                    <Field type="email" name="email" />
                    <div className="label-error">
                      <span>Email</span>
                      <ErrorMessage name="email" component="div" className="error" />
                    </div>
                  </div>
                  <div className="inputBox w50">
                    <Field type="text" name="phoneNumber" />
                    <div className="label-error">
                      <span>Phone</span>
                      <ErrorMessage name="phoneNumber" component="div" className="error" />
                    </div>
                  </div>
                  <div className="inputBox w100">
                    <Field as="textarea" name="message" />
                    <div className="label-error">
                      <span>Write Your Message Here...</span>
                      <ErrorMessage name="message" component="div" className="error" />
                    </div>
                  </div>
                  <Button variant="contained" className="btn" type="submit">
                    Send
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
