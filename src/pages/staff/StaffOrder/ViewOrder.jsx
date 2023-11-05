import React, { useContext, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../../../App';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { sendEmail } from '../../../components/emailService';

function ViewOrder({ selectedOrder, onClose }) {
  const session = useContext(AuthContext);
  const user = session.user;
  const [isLoading, setIsLoading] = useState(false);

  const updateOrderStatus = async () => {
    setIsLoading(true);

    try {
      const updatedStatus = 'Processing';
      const updatedOrder = { ...selectedOrder, status: updatedStatus };

      const response = await axios.get('/UserManagements');
      const staffList = response.data;

      const staffEmail = staffList.find((staff) => staff.email === user.user.email);

      if (staffEmail) {
        const staffId = staffEmail.userId;
        const orderId = selectedOrder.orderId;

        console.log('OrderId:', orderId);
        console.log('StaffId:', staffId);

        const postResponse = await axios.post('/StaffOrderManagements', {
          OrderId: orderId,
          StaffId: staffId,
        });

        console.log(postResponse.data);

        // Gửi email xác nhận đến khách hàng
        const emailData = {
          to: selectedOrder.email,
          subject: 'Order Confirmation',
          text: `Dear ${selectedOrder.customerName},\n\nYour order with ID: O${String(
            selectedOrder.orderId
          ).padStart(
            3,
            '0'
          )} has been accepted and is now in processing.\n\nPlease pay attention to our phone number so our staff can contact you and schedule a specific date to perform the service.\n\nBest regards,\nFrom 4Stu With Love <3`,
        };

        await sendEmail(emailData);
      } else {
        alert('User is not authorized to accept this order.');
      }

      await axios.put(`/OrderManagements/${selectedOrder.orderId}`, updatedOrder);

      // Hiển thị SweetAlert sau khi cập nhật thành công
      Swal.fire({
        icon: 'success',
        title: 'Order Status Updated',
        text: 'The order status has been updated to Processing successfully.',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
          window.location.reload();
        }
      });
    } catch (error) {
      alert('Error updating order');
      console.error('Error updating order status', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={!!selectedOrder} onHide={onClose} size="lg" style={{ marginTop: '40px' }}>
      <Modal.Header closeButton>
        <Modal.Title>View Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Order ID</Form.Label>
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

              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Date Created</Form.Label>
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
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3 form-name">
                  <Form.Label className="mb-2 ms-3">Email</Form.Label>
                  <Form.Control type="email" value={selectedOrder.email} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Note</Form.Label>
                  <Form.Control type="text" value={selectedOrder.note} readOnly />
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
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Service Name</Form.Label>
                  <Form.Control type="text" value={selectedOrder.serviceName} readOnly />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Total</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${formatPriceWithDot(selectedOrder.price)} VND`}
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
                        : selectedOrder.paymentMethod === 'credit-card'
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
          {isLoading ? 'Accepting...' : 'Accept'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewOrder;
