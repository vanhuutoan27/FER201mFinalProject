import React from 'react';
import { Modal, Form } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatDate } from '../../../utils/DateUtils';

function ViewUser({ selectedUser, onClose }) {
  return (
    <Modal show={!!selectedUser} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  {/* <div className="service-image-virtual"></div> */}
                  <img src={selectedUser.avatar} alt="User Image" className="service-image" />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-2">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${
                      selectedUser.role === 'Admin'
                        ? 'A'
                        : selectedUser.role === 'Staff'
                        ? 'S'
                        : 'C'
                    }${
                      selectedUser.userId < 10
                        ? '00' + selectedUser.userId
                        : selectedUser.userId < 100
                        ? '0' + selectedUser.userId
                        : selectedUser.userId
                    }`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" value={selectedUser.status} readOnly />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control type="text" value={selectedUser.role} readOnly />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control type="text" value={formatDate(selectedUser.dateCreated)} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={selectedUser.firstName} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={selectedUser.lastName} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={selectedUser.email} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={selectedUser.phone} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" value={selectedUser.password} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="text" value={formatDate(selectedUser.dob)} readOnly />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="button-modal" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewUser;
