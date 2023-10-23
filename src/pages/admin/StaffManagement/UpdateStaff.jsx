/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';

function UpdateStaff({ selectedStaff, onClose }) {
  const [updatedStaff, setUpdatedStaff] = useState(selectedStaff);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      await axios.put(`/UserManagements/${updatedStaff.userId}`, updatedStaff);
      alert('Staff updated successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Error updating staff');
      console.error('Error updating staff', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStaff) {
      setUpdatedStaff({ ...selectedStaff });
    }
  }, [selectedStaff]);

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
      // Update the image URL in updatedStaff state
      setUpdatedStaff({ ...updatedStaff, avatar: downloadURL });
    } catch (error) {
      console.error('Error uploading image to Firebase', error);
    }
  };

  return (
    <Modal show={!!selectedStaff} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedStaff && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  {/* <div className="service-image-virtual"></div> */}
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <img
                      src={updatedStaff.avatar}
                      alt="Staff Image"
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
                <Form.Group className="mb-3 form-user-id">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${
                      updatedStaff.role === 'Admin'
                        ? 'A'
                        : updatedStaff.role === 'Staff'
                        ? 'S'
                        : 'C'
                    }${
                      updatedStaff.userId < 10
                        ? '00' + updatedStaff.userId
                        : updatedStaff.userId < 100
                        ? '0' + updatedStaff.userId
                        : updatedStaff.userId
                    }`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedStaff.status}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, status: e.target.value })}
                    className="custom-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedStaff.role}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, role: e.target.value })}
                    className="custom-select"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 form-date-created">
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control type="text" value={formatDate(updatedStaff.dateCreated)} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedStaff.firstName}
                    onChange={(e) =>
                      setUpdatedStaff({ ...updatedStaff, firstName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedStaff.lastName}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, lastName: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={updatedStaff.email}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, email: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedStaff.phone}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, phone: e.target.value })}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedStaff.password}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, password: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={updatedStaff.dob}
                    onChange={(e) => setUpdatedStaff({ ...updatedStaff, dob: e.target.value })}
                  />
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

export default UpdateStaff;
