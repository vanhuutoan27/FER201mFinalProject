import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

function ViewTask({ task, onClose, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateOrderStatus = async () => {
    setIsLoading(true);

    try {
      const updatedStatus = 'Completed';
      const updatedOrder = { ...selectedOrder, status: updatedStatus, dateCompleted: new Date() };

      await axios.put(`/OrderManagements/${selectedOrder.orderId}`, updatedOrder);

      Swal.fire({
        icon: 'success',
        title: 'Order Completed',
        text: 'The order status has been updated to Completed successfully.',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to complete the order. Please try again.',
        showConfirmButton: true,
      });
      console.error('Error updating order status', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (task && task.orderInfo) {
      setSelectedOrder(task.orderInfo);
    }
  }, [task]);

  return (
    <Modal show={task !== null} onHide={onClose} size="lg" style={{ marginTop: '40px' }}>
      <Modal.Header closeButton>
        <Modal.Title>View Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {task && task.orderInfo && (
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Task ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={`T${
                      task.orderInfo.orderId < 10
                        ? '00' + task.orderInfo.orderId
                        : '0' + task.orderInfo.orderId
                    }`}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Date Created</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(task.orderInfo.dateCreated)}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Status</Form.Label>
                  <Form.Control type="text" value={task.orderInfo.status} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Full Name</Form.Label>
                  <Form.Control type="text" value={task.orderInfo.customerName} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Phone</Form.Label>
                  <Form.Control type="text" value={task.orderInfo.phone} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3 form-name">
                  <Form.Label className="mb-2 ms-3">Email</Form.Label>
                  <Form.Control type="email" value={task.orderInfo.email} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Note</Form.Label>
                  <Form.Control type="text" value={task.orderInfo.note} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Address</Form.Label>
                  <Form.Control type="text" value={task.orderInfo.address} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Service Name</Form.Label>
                  <Form.Control type="text" value={task.orderInfo.serviceName} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Total</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${formatPriceWithDot(task.orderInfo.price)} VND`}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Payment Method</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      task.orderInfo.paymentMethod === 'momo'
                        ? 'Momo'
                        : task.orderInfo.paymentMethod === 'credit-card'
                        ? 'Credit Card'
                        : 'POC'
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
        <Button variant="contained" className="btn close-btn" onClick={onClose}>
          Close
        </Button>

        <Button
          variant="contained"
          className="btn"
          onClick={updateOrderStatus}
          disabled={isLoading}
          style={{ marginRight: '6%' }}
        >
          {isLoading ? 'Completing...' : 'Complete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewTask;
