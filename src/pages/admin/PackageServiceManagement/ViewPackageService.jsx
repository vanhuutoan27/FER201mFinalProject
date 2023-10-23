/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Modal, Form } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatPriceWithDot } from '../../../utils/PriceUtils';

function ViewPackageService({ selectedPackageService, onClose }) {
  return (
    <Modal show={!!selectedPackageService} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedPackageService && (
          <Form>
            <Row>
              <Form.Group className="mb-3 service-image-container">
                <div className="service-image-virtual"></div>
                <img
                  src={selectedPackageService.image}
                  alt="Package Service Image"
                  className="service-image"
                />
              </Form.Group>
              <Col sm={4}></Col>
              <Col sm={8}>
                <Form.Group className="mb-3 form-id">
                  <Form.Label>ID</Form.Label>
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
              </Col>
            </Row>

            <Row>
              <Col sm={4}></Col>
              <Col sm={8}>
                <Form.Group className="mb-3 form-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackageService.packageServiceName}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={4}></Col>
              <Col sm={8}>
                <Form.Group className="mb-3 form-desc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedPackageService.packageServiceDesc}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Price (VND)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatPriceWithDot(selectedPackageService.price)}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Time (Mins)</Form.Label>
                  <Form.Control type="text" value={selectedPackageService.time} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control type="text" value={selectedPackageService.tag} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" value={selectedPackageService.status} readOnly />
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

export default ViewPackageService;
