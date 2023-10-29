import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';

function ViewOrder({ selectedOrder, onClose }) {
  console.log(selectedOrder);
  console.log('Selected Order Date Shipping:', selectedOrder.dateShipping);
  console.log('Staff Name:', `${selectedOrder.firstName} ${selectedOrder.lastName}`);

  return (
    <Modal show={!!selectedOrder} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <Form>
            <Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={`O${
                        selectedOrder.orderId < 10
                          ? '00' + selectedOrder.orderId
                          : '0' + selectedOrder.orderId
                      }`}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" value={selectedOrder.status} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="text" value={selectedOrder.rating} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Date Created</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedOrder.dateCreated
                          ? formatDate(selectedOrder.dateCreated)
                          : '--/--/----'
                      }
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Date Shipping</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedOrder.dateShipping
                          ? formatDate(selectedOrder.dateShipping)
                          : '--/--/----'
                      }
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Date Completed</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedOrder.dateCompleted
                          ? formatDate(selectedOrder.dateCompleted)
                          : '--/--/----'
                      }
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={selectedOrder.customerName} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={selectedOrder.phone} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 form-name">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={selectedOrder.email} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={selectedOrder.address} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Service</Form.Label>
                    <Form.Control type="text" value={selectedOrder.serviceName} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatPriceWithDot(selectedOrder.price)}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Staff</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedOrder.firstName && selectedOrder.lastName
                          ? `${selectedOrder.firstName} ${selectedOrder.lastName}`
                          : ''
                      }
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
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

export default ViewOrder;
