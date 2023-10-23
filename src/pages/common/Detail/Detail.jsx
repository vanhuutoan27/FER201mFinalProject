import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatPriceWithDot } from '../../../utils/PriceUtils';
import './Detail.css';

function Detail({ selectedService, onClose }) {
  // Use state to keep track of the image URL when clicked
  const [clickedImage, setClickedImage] = useState(null);

  // Function to open the image in the modal
  const openImageInModal = (imageUrl) => {
    setClickedImage(imageUrl);
  };

  return (
    <div className="DetailPage">
      <Modal show={!!selectedService} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Service Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <Form>
              <Row>
                <Col sm={4}>
                  <Form.Group className="mb-3 service-image-container">
                    {/* <div className="service-image-virtual"></div> */}
                    <img
                      src={selectedService.image}
                      alt="Service Image"
                      className="service-image"
                      onClick={() => openImageInModal(selectedService.image)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={selectedService.serviceName} readOnly />
                  </Form.Group>

                  <Form.Group className="mb-2">
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
                  <Form.Group className="mb-2">
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control type="text" value={selectedService.rating} readOnly />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Price (VND)</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatPriceWithDot(selectedService.price)}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Time (Mins)</Form.Label>
                    <Form.Control type="text" value={selectedService.time} readOnly />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-2">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type="text" value={selectedService.tag} readOnly />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-2">
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

      {clickedImage && (
        <div className="modal-image" onClick={() => setClickedImage(null)}>
          <img src={clickedImage} alt="Service Image" className="service-image-large" />
        </div>
      )}
    </div>
  );
}

export default Detail;
