/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';

function UpdatePackageService({ selectedPackageService, onClose }) {
  const [updatedPackageService, setUpdatedPackageService] = useState(selectedPackageService);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    // Format the price before submitting
    const formattedPrice = formatPriceWithDot(updatedPackageService.price);
    setUpdatedPackageService({ ...updatedPackageService, price: formattedPrice });

    try {
      // Send the request to update the service through axios
      await axios.put(
        `/PackageServiceManagements/${updatedPackageService.packageServiceId}`,
        updatedPackageService
      );
      alert('Package updated successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Error updating package');
      console.error('Error updating package', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Format the initial price value when selectedPackageService changes
    if (selectedPackageService) {
      setUpdatedPackageService({
        ...selectedPackageService,
        price: formatPriceWithDot(selectedPackageService.price),
      });
    }
  }, [selectedPackageService]);

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
      // Update the image URL in updatedPackageService state
      setUpdatedPackageService({ ...updatedPackageService, image: downloadURL });
    } catch (error) {
      console.error('Error uploading image to Firebase', error);
    }
  };

  return (
    <Modal show={!!selectedPackageService} onHide={onClose} size="lg" style={{ margin: '52px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Update Package Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedPackageService && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  <div className="service-image-virtual"></div>
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <img
                      src={updatedPackageService.image}
                      alt="Service Image"
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
                <Form.Group className="mb-3 form-id">
                  <Form.Label className="ms-3">ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={`P${
                      selectedPackageService.packageServiceId < 10
                        ? '00' + selectedPackageService.packageServiceId
                        : '0' + selectedPackageService.packageServiceId
                    }`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="ms-3">Price (VND)</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedPackageService.price}
                    onChange={(e) =>
                      setUpdatedPackageService({ ...updatedPackageService, price: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3 form-name">
                  <Form.Label className="ms-3">Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedPackageService.packageServiceName}
                    onChange={(e) =>
                      setUpdatedPackageService({
                        ...updatedPackageService,
                        packageServiceName: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="ms-3">Time (Mins)</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedPackageService.time}
                    onChange={(e) =>
                      setUpdatedPackageService({ ...updatedPackageService, time: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Form.Group className="mb-3 form-desc">
                <Form.Label className="ms-3">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={updatedPackageService.packageServiceDesc}
                  onChange={(e) =>
                    setUpdatedPackageService({
                      ...updatedPackageService,
                      packageServiceDesc: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label className="ms-3">Tag</Form.Label>
                  <Form.Control
                    value={updatedPackageService.tag}
                    onChange={(e) =>
                      setUpdatedPackageService({ ...updatedPackageService, tag: e.target.value })
                    }
                    className="custom-select"
                    readOnly
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-2">
                  <Form.Label className="ms-3">Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedPackageService.status}
                    onChange={(e) =>
                      setUpdatedPackageService({ ...updatedPackageService, status: e.target.value })
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
        <button className="button-modal close-btn" onClick={onClose}>
          Close
        </button>
        <button className="button-modal" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdatePackageService;
