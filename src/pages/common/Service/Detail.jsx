/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Modal, Form } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { formatPriceWithDot } from '../../../utils/PriceUtils';

function Detail({ selectedService, selectedPackageService, rating, onClose }) {
  return (
    <div className="DetailPage">
      <Modal
        show={!!selectedService || !!selectedPackageService}
        onHide={onClose}
        size="lg"
        style={{ marginTop: '60px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(selectedService || selectedPackageService) && (
            <Form>
              <Row>
                <Col sm={4}>
                  <Form.Group className="mb-3 service-image-container">
                    <img
                      src={selectedService ? selectedService.image : selectedPackageService.image}
                      alt="Service Image"
                      className="service-image"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedService
                          ? selectedService.serviceName
                          : selectedPackageService.packageServiceName
                      }
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={
                        selectedService
                          ? selectedService.serviceDesc
                          : selectedPackageService.packageServiceDesc
                      }
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Price (VND)</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatPriceWithDot(
                        selectedService ? selectedService.price : selectedPackageService.price
                      )}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Time (Mins)</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedService ? selectedService.time : selectedPackageService.time}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Rating</Form.Label>
                    <Form.Control type="text" value={Math.ceil(rating)} readOnly />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Tag</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedService ? selectedService.tag : ''}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Status</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedService ? selectedService.status : selectedPackageService.status
                      }
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="btn"
            onClick={onClose}
            style={{ marginRight: '5%' }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Detail;
