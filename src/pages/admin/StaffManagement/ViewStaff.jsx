import React from 'react';
import { Modal, Form } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatDate } from '../../../utils/DateUtils';

function ViewStaff({ selectedStaff, onClose }) {
  return (
    <Modal show={!!selectedStaff} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedStaff && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  {/* <div className="service-image-virtual"></div> */}
                  <img src={selectedStaff.avatar} alt="Staff Image" className="service-image" />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${
                      selectedStaff.role === 'Admin'
                        ? 'A'
                        : selectedStaff.role === 'Staff'
                        ? 'S'
                        : 'C'
                    }${
                      selectedStaff.userId < 10
                        ? '00' + selectedStaff.userId
                        : selectedStaff.userId < 100
                        ? '0' + selectedStaff.userId
                        : selectedStaff.userId
                    }`}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" value={selectedStaff.status} readOnly />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control type="text" value={selectedStaff.role} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(selectedStaff.dateCreated)}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={selectedStaff.firstName} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={selectedStaff.lastName} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3 form-name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={selectedStaff.email} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={selectedStaff.phone} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" value={selectedStaff.password} readOnly />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="text" value={formatDate(selectedStaff.dob)} readOnly />
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

export default ViewStaff;
