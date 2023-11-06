/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

function UpdateService({ selectedService, onClose, handleUpdateServiceComplete }) {
  const [updatedService, setUpdatedService] = useState(selectedService);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    // Format the price before submitting
    const formattedPrice = formatPriceWithDot(updatedService.price);
    setUpdatedService({ ...updatedService, price: formattedPrice });

    try {
      // Send the request to update the service through axios
      await axios.put(`/ServiceManagements/${updatedService.serviceId}`, updatedService);

      // Show success notification using Swal
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Service updated successfully',
      });

      // Call the callback to pass data after the update
      handleUpdateServiceComplete(updatedService);

      onClose();
    } catch (error) {
      // Show error notification using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error updating service',
        text: 'An error occurred while updating the service.',
      });

      console.error('Error updating service', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Format the initial price value when selectedService changes
    if (selectedService) {
      setUpdatedService({ ...selectedService, price: formatPriceWithDot(selectedService.price) });
    }
  }, [selectedService]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const metadata = {
      contentType: 'image/png',
    };

    const storageRef = ref(storage, `/images/${file.name}`);

    try {
      // Upload the image to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file, metadata);
      // Get the URL of the image from Firebase
      const downloadURL = await getDownloadURL(snapshot.ref);
      // Update the image URL in updatedService state
      setUpdatedService({ ...updatedService, image: downloadURL });
    } catch (error) {
      console.error('Error uploading image to Firebase', error);
    }
  };

  return (
    <Modal show={!!selectedService} onHide={onClose} size="lg" style={{ margin: '24px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Update Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedService && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  <div className="service-image-virtual"></div>
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <img
                      src={updatedService.image}
                      alt={updatedService.serviceName}
                      className="service-image"
                      onClick={() => {
                        document.getElementById('imageUpload');
                      }}
                    />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={`S${
                      selectedService.serviceId < 10
                        ? '00' + selectedService.serviceId
                        : '0' + selectedService.serviceId
                    }`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Price (VND)</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedService.price}
                    onChange={(e) =>
                      setUpdatedService({ ...updatedService, price: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedService.serviceName}
                    onChange={(e) =>
                      setUpdatedService({ ...updatedService, serviceName: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Time (Mins)</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedService.time}
                    onChange={(e) => setUpdatedService({ ...updatedService, time: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="mb-2 ms-3">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedService.serviceDesc}
                onChange={(e) =>
                  setUpdatedService({ ...updatedService, serviceDesc: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Tag</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedService.tag}
                    onChange={(e) => setUpdatedService({ ...updatedService, tag: e.target.value })}
                    className="custom-select"
                  >
                    <option value="Cleaning And Tidying Up">Cleaning And Tidying Up</option>
                    <option value="Shopping And Ordering">Shopping And Ordering</option>
                    <option value="Laundry And Clothing Replacement">
                      Laundry And Clothing Replacement
                    </option>
                    <option value="Repair And Maintenance">Repair And Maintenance</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedService.status}
                    onChange={(e) =>
                      setUpdatedService({ ...updatedService, status: e.target.value })
                    }
                    className="custom-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          className="btn close-btn"
          onClick={onClose}
          style={{ marginRight: '6%' }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          className="btn"
          onClick={handleSave}
          disabled={isLoading}
          style={{ marginRight: '6%' }}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateService;
