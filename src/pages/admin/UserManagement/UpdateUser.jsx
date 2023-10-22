/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';

function UpdateUser({ selectedUser, onClose }) {
  const [updatedUser, setUpdatedUser] = useState(selectedUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      await axios.put(`/UserManagements/${updatedUser.userId}`, updatedUser);
      alert('User updated successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Error updating user');
      console.error('Error updating user', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setUpdatedUser({ ...selectedUser });
    }
  }, [selectedUser]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const metadata = {
      contentType: 'image/png',
    };

    const storageRef = ref(storage, `/images/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setUpdatedUser({ ...updatedUser, avatar: downloadURL });
    } catch (error) {
      console.error('Error uploading image to Firebase', error);
    }
  };

  return (
    <Modal show={!!selectedUser} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  {/* <div className="service-image-virtual"></div> */}
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <img
                      src={updatedUser.avatar}
                      alt="User Image"
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
                      updatedUser.role === 'Admin' ? 'A' : updatedUser.role === 'Staff' ? 'S' : 'C'
                    }${
                      updatedUser.userId < 10
                        ? '00' + updatedUser.userId
                        : updatedUser.userId < 100
                        ? '0' + updatedUser.userId
                        : updatedUser.userId
                    }`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedUser.status}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, status: e.target.value })}
                    className="custom-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedUser.role}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                    className="custom-select"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 form-date-created">
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control type="text" value={formatDate(updatedUser.dateCreated)} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.firstName}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.lastName}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.phone}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.password}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={updatedUser.dob}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, dob: e.target.value })}
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

export default UpdateUser;
