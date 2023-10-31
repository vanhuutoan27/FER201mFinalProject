import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatPriceWithDot } from '../../../utils/PriceUtils';

function ViewService({ selectedService, onClose }) {
  return (
    <Modal show={!!selectedService} onHide={onClose} size="lg" style={{ margin: '52px' }}>
      <Modal.Header closeButton>
        <Modal.Title>View Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedService && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3 service-image-container">
                  <img
                    src={selectedService.image}
                    alt={selectedService.serviceName}
                    className="service-image"
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
                    value={formatPriceWithDot(selectedService.price)}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Name</Form.Label>
                  <Form.Control type="text" value={selectedService.serviceName} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Time (Mins)</Form.Label>
                  <Form.Control type="text" value={selectedService.time} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2 ms-3">Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={selectedService.serviceDesc} readOnly />
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Tag</Form.Label>
                  <Form.Control type="text" value={selectedService.tag} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Status</Form.Label>
                  <Form.Control type="text" value={selectedService.status} readOnly />
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

export default ViewService;
