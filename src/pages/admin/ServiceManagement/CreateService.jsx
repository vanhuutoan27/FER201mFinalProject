import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from '../../../config/axios';
function CreateService() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      time: '0',
      price: '0',
      tag: 'null',
      image: null, // Use null for the image field
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      desc: Yup.string().required('Description is required'),
      time: Yup.string().required('Time is required'),
      price: Yup.string().required('Price is required'),
      tag: Yup.string().required('Tag is required'),
      image: Yup.mixed().required('Image is required'), // Use Yup.mixed() for file validation
    }),

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const file = values.image;
        const metadata = {
          contentType: 'image/png',
        };
        const storageRef = ref(storage, `/images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Now, you can include the downloadURL in your POST request
        const response = await axios.post('/ServiceManagements', {
          serviceName: values.name,
          serviceDesc: values.desc,
          time: values.time,
          price: values.price,
          tag: values.tag,
          image: downloadURL, // Use the URL obtained from Firebase
        });

        alert('Service created successfully!');
        console.log(response.data);
        handleClose();
        window.location.reload();
      } catch (error) {
        alert('Service creation failed. Please try again.');
        console.error('Error uploading image to Firebase', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <button className="button-modal" onClick={handleShow}>
        Add Service
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create A New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-msg">{formik.errors.name}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="desc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desc}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="error-msg">{formik.errors.desc}</div>
              ) : null}
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                  />
                  {formik.touched.time && formik.errors.time ? (
                    <div className="error-msg">{formik.errors.time}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="error-msg">{formik.errors.price}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="tag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                as="select"
                name="tag"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tag}
              >
                <option value="Cleaning And Tidying Up">Cleaning And Tidying Up</option>
                <option value="Shopping And Ordering">Shopping And Ordering</option>
                <option value="Laundry And Clothing Replacement">
                  Laundry And Clothing Replacement
                </option>
                <option value="Repair And Maintenance">Repair And Maintenance</option>
              </Form.Control>
              {formik.touched.tag && formik.errors.tag ? (
                <div className="error-msg">{formik.errors.tag}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                id="file"
                type="file"
                accept="image/*"
                // onChange={(event) => {
                //   formik.values.file = event.target.files[0];
                // }}
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files[0]); // Set the image field value
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.file && formik.errors.file ? (
                <div className="error-msg">{formik.errors.file}</div>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="button-modal" onClick={handleClose}>
            Close
          </button>
          <button
            className="button-modal"
            type="submit"
            disabled={isLoading}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateService;
