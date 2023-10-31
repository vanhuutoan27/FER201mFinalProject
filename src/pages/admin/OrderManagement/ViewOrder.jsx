import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import axios from '../../../config/axios';

function ViewOrder({ selectedOrder, onClose }) {
  const [orderRatings, setOrderRatings] = useState({});

  console.log(selectedOrder);
  console.log('Selected Order Date Shipping:', selectedOrder.dateShipping);
  console.log('Staff Name:', `${selectedOrder.firstName} ${selectedOrder.lastName}`);

  useEffect(() => {
    axios
      .get('/FeedbackManagements')
      .then((response) => {
        const feedbackRatings = {};

        response.data.forEach((feedback) => {
          feedbackRatings[feedback.orderId] = feedback.rating;
        });

        setOrderRatings(feedbackRatings);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Modal show={!!selectedOrder} onHide={onClose} size="lg" style={{ marginTop: '52px' }}>
      <Modal.Header closeButton>
        <Modal.Title>
          View Order - O
          {selectedOrder.orderId < 10 ? '00' + selectedOrder.orderId : '0' + selectedOrder.orderId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <Form>
            <Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Status</Form.Label>
                    <Form.Control type="text" value={selectedOrder.status} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Rating</Form.Label>
                    <Form.Control
                      type="text"
                      value={orderRatings[selectedOrder.orderId] || 'Null'}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Staff</Form.Label>
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
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date Created</Form.Label>
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
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date Shipping</Form.Label>
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
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date Completed</Form.Label>
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
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Full Name</Form.Label>
                    <Form.Control type="text" value={selectedOrder.customerName} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Phone</Form.Label>
                    <Form.Control type="text" value={selectedOrder.phone} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="m className='mb-3'b-3 form-name">
                    <Form.Label className="mb-2 ms-3">Email</Form.Label>
                    <Form.Control type="email" value={selectedOrder.email} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Address</Form.Label>
                    <Form.Control type="text" value={selectedOrder.address} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Service</Form.Label>
                    <Form.Control type="text" value={selectedOrder.serviceName} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatPriceWithDot(selectedOrder.price)}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Payment Method</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedOrder.paymentMethod === 'momo' ? 'Momo' : 'POC'}
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
