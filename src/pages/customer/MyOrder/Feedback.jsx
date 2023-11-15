import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { Rate } from 'antd';
import { Button } from '@mui/material';

import axios from '../../../config/axios';
import Swal from 'sweetalert2';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

function Feedback({ isOpen, onClose, orderId, customerId, serviceId, updateFeedbackData }) {
  const [value, setValue] = useState(3);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSendFeedback = () => {
    const feedbackData = {
      orderId,
      customerId,
      serviceId,
      rating: value,
      comment: feedbackMessage,
    };

    axios
      .post('/FeedbackManagements', feedbackData)
      .then((response) => {
        console.log('Feedback sent successfully', response.data);
        // Update the feedback data in the local state
        updateFeedbackData(orderId, value, feedbackMessage);

        // Hiển thị thông báo thành công
        Swal.fire({
          icon: 'success',
          title: 'Feedback sent successfully!',
        });

        onClose();
      })
      .catch((error) => {
        console.error('Error sending feedback', error);

        // Hiển thị thông báo lỗi
        Swal.fire({
          icon: 'error',
          title: 'Error sending feedback',
          text: 'An error occurred while sending your feedback.',
        });
      });
  };

  return (
    <Modal show={isOpen} onHide={onClose} style={{ marginTop: '120px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2 ms-3">Rating For Us</Form.Label>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <span>
                  <Rate tooltips={desc} onChange={setValue} value={value} />
                  {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                </span>
              </div>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2 ms-3">Feedback Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          className="btn"
          style={{ marginRight: '8%' }}
          onClick={handleSendFeedback}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Feedback;
