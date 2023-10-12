import React from 'react';
import { Modal, Form } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AdminViewService({ selectedService, onClose }) {
  const formatPriceWithDot = (price) => {
    if (!isNaN(price)) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return price;
  };

  return (
    <Modal show={!!selectedService} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedService && (
          <Form>
            <Row>
              <Form.Group className="mb-3 service-image-container">
                <div className="service-image-virtual"></div>
                <img src={selectedService.image} alt="Service Image" className="service-image" />
              </Form.Group>
              <Col sm={4}></Col>
              <Col sm={8}>
                <Form.Group className="mb-3 form-id">
                  <Form.Label>ID</Form.Label>
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
              </Col>
            </Row>

            <Row>
              <Col sm={4}></Col>
              <Col sm={8}>
                <Form.Group className="mb-3 form-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={selectedService.serviceName} readOnly />
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
                    value={selectedService.serviceDesc}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Price (VND)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatPriceWithDot(selectedService.price)}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Time (Mins)</Form.Label>
                  <Form.Control type="text" value={selectedService.time} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control type="text" value={selectedService.tag} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
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

export default AdminViewService;
