import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';

import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import axios from '../../../config/axios';
import Swal from 'sweetalert2'; // Import SweetAlert2.

function UpdateOrder({ selectedOrder, onClose, onOrderUpdate }) {
  // Define state variables to manage the selected order, updated order, loading state, and order ratings.
  const [updatedOrder, setUpdatedOrder] = useState(selectedOrder);
  const [isLoading, setIsLoading] = useState(false);
  const [orderRatings, setOrderRatings] = useState({});

  // Output some console logs for debugging purposes.
  console.log(selectedOrder);
  console.log('Selected Order Date Shipping:', selectedOrder.dateShipping);
  console.log('Staff Name:', `${selectedOrder.firstName} ${selectedOrder.lastName}`);

  // Fetch order ratings using an HTTP request when the component mounts.
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

  // Handle the save button click event.
  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Send a request to update the order with the information in updatedOrder.
      await axios.put(`/OrderManagements/${updatedOrder.orderId}`, updatedOrder);
      // Show a success alert using SweetAlert2 when the order is updated successfully.
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Order updated successfully',
      });

      // Call the onOrderUpdate callback to update the local state.
      onOrderUpdate(updatedOrder);
      // Close the modal.
      onClose();
    } catch (error) {
      // Show an error alert using SweetAlert2 when there's an error updating the order.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating order',
      });
      console.error('Error updating order', error);
    } finally {
      // Reset the loading state when the process is completed.
      setIsLoading(false);
    }
  };

  // Handle input changes in the form fields and update the updatedOrder state.
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
                      type="date"
                      name="dateShipping"
                      value={updatedOrder.dateShipping || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date Completed</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateCompleted"
                      value={updatedOrder.dateCompleted || ''}
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
                      readOnly
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
                      readOnly
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
                      value={
                        selectedOrder.paymentMethod === 'momo'
                          ? 'Momo'
                          : 'credit-card'
                          ? 'Credit Card'
                          : 'POC'
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
