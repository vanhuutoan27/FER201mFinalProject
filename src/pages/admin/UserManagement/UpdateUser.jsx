/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

function UpdateUser({ selectedUser, onClose, onUpdateUser }) {
  // Initialize state variables
  const [updatedUser, setUpdatedUser] = useState(selectedUser);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the save button click
  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Make a PUT request to update the user
      await axios.put(`/UserManagements/${updatedUser.userId}`, updatedUser);
      onUpdateUser(updatedUser);

      // Show a success message using SweetAlert2
      Swal.fire({
        title: 'Success',
        text: 'User updated successfully',
        icon: 'success',
      });

      onClose();
    } catch (error) {
      // Show an error message using SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'Error updating user',
        icon: 'error',
      });

      console.error('Error updating user', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // When selectedUser changes, update the form with the selected user's data
    if (selectedUser) {
      setUpdatedUser({ ...selectedUser });
    }
  }, [selectedUser]);

  // Function to handle file input change
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
    <Modal show={!!selectedUser} onHide={onClose} size="lg" style={{ marginTop: '20px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <img
                      src={updatedUser.avatar}
                      alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
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
                  <Form.Label className="mb-2 ms-3">ID</Form.Label>
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
                  <Form.Label className="mb-2 ms-3">Status</Form.Label>
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
                  <Form.Label className="mb-2 ms-3">Role</Form.Label>
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

                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Date Created</Form.Label>
                  <Form.Control type="text" value={formatDate(updatedUser.dateCreated)} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.firstName}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.lastName}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.phone}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Password</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.password}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Date of Birth</Form.Label>
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
        <Button variant="contained" className="btn close-btn" onClick={onClose}>
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

export default UpdateUser;
