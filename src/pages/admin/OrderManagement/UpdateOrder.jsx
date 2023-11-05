import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';

import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import axios from '../../../config/axios';

function UpdateOrder({ selectedOrder, onClose }) {
  const [updatedOrder, setUpdatedOrder] = useState(selectedOrder);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Gửi yêu cầu cập nhật đơn hàng với thông tin trong updatedOrder
      await axios.put(`/OrderManagements/${updatedOrder.orderId}`, updatedOrder);
      alert('Order updated successfully');
      onClose();
      window.location.reload(); // Tải lại trang để cập nhật dữ liệu
    } catch (error) {
      alert('Error updating order');
      console.error('Error updating order', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý thay đổi giá trị trong trường nhập liệu và cập nhật updatedOrder
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder({
      ...updatedOrder,
      [name]: value,
    });
  };

  return (
    <Modal show={!!selectedOrder} onHide={onClose} size="lg" style={{ marginTop: '52px' }}>
      <Modal.Header closeButton>
        <Modal.Title>
          Update Order - O
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
                      name="dateShipping"
                      value={
                        updatedOrder.dateShipping
                          ? formatDate(selectedOrder.dateShipping)
                          : '--/--/----'
                      }
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date Completed</Form.Label>
                    <Form.Control
                      type="text"
                      name="dateCompleted"
                      value={
                        updatedOrder.dateCompleted
                          ? formatDate(selectedOrder.dateCompleted)
                          : '--/--/----'
                      }
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerName"
                      value={updatedOrder.customerName || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={updatedOrder.phone || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-33form-name">
                    <Form.Label className="mb-2 ms-3">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={updatedOrder.email || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={updatedOrder.address || ''}
                      onChange={handleInputChange}
                    />
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
        <Button variant="contained" className="btn close-btn" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          className="btn"
          onClick={handleSave}
          disabled={isLoading}
          style={{ marginRight: '8%' }}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateOrder;
