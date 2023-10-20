import React, { useContext, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Session } from '../../../App';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';

function ViewOrder({ selectedOrder, onClose }) {
  const session = useContext(Session);
  const user = session.user;
  const [isLoading, setIsLoading] = useState(false);

  const updateOrderStatus = async () => {
    setIsLoading(true);

    try {
      const updatedStatus = 'Processing';
      const updatedOrder = { ...selectedOrder, status: updatedStatus };

      const response = await axios.get('/StaffManagements');
      const staffList = response.data;

      const staffEmail = staffList.find((staff) => staff.email === user.email);

      if (staffEmail) {
        const staffId = staffEmail.staffId;
        const orderId = selectedOrder.orderId;

        console.log('OrderId:', orderId);
        console.log('StaffId:', staffId);

        const postResponse = await axios.post('/StaffOrderManagements', {
          OrderId: orderId,
          StaffId: staffId,
        });

        console.log(postResponse.data);
      } else {
        alert('User is not authorized to accept this order.');
      }

      await axios.put(`/OrderManagements/${selectedOrder.orderId}`, updatedOrder);

      alert('Order status updated to Processing successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Error updating order');
      console.error('Error updating order status', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={!!selectedOrder} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3">
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

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(selectedOrder.dateCreated)}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" value={selectedOrder.customerName} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={selectedOrder.phone} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3 form-name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={selectedOrder.email} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Note</Form.Label>
                  <Form.Control type="text" value={selectedOrder.note} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" value={selectedOrder.address} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control type="text" value={selectedOrder.serviceName} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Total</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${formatPriceWithDot(selectedOrder.price)} VND`}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control type="text" value={selectedOrder.paymentMethod} readOnly />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="button-modal close-btn" onClick={onClose}>
          Close
        </button>

        <button className="button-modal" onClick={updateOrderStatus} disabled={isLoading}>
          {isLoading ? 'Accepting...' : 'Accept'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewOrder;
