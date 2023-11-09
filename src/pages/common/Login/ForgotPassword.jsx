import React, { useState } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import { sendEmail } from '../../../components/emailService';
import axios from '../../../config/axios';
import Swal from 'sweetalert2';

function RecoverPassword({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userId, setUserId] = useState(null);

  // Generate a random 6-digit code
  const generateRandomCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    return randomCode.toString();
  };

  // Handle sending the recovery code via email
  const handleSendCode = () => {
    // Generate a random code
    const randomCode = generateRandomCode();
    setGeneratedCode(randomCode);

    // Send the code to the user's email (you should implement this part)
    const emailData = {
      to: email,
      subject: 'Password Recovery Code',
      text: `Your password recovery code is: ${randomCode}`,
    };

    sendEmail(emailData)
      .then((response) => {
        console.log('Recover code:', randomCode);
        console.log('Email sent to:', email);
        // Set codeConfirmed to true to reveal the code input field
        setCodeConfirmed(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  // Handle password recovery
  const handleRecoverPassword = (e) => {
    e.preventDefault();

    if (codeConfirmed) {
      axios
        .get('/UserManagements')
        .then((response) => {
          const userData = response.data;
          const success = checkEmailAndRecoverPassword(userData);

          if (success) {
            Swal.fire('Success', 'Password recovered successfully', 'success');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user data:', error);
        });
    }
  };

  const checkEmailAndRecoverPassword = (userData) => {
    const foundUser = userData.find((user) => user.email === email);

    if (foundUser) {
      const foundUserId = foundUser.userId;
      setUserId(foundUserId); // Lưu userId vào state
      console.log('Found userId:', foundUserId);

      if (newPassword === confirmNewPassword) {
        // Password recovery logic
        const updatedUser = {
          userId: foundUserId,
          password: newPassword,
          dateCreated: foundUser.dateCreated,
          email: email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          phone: foundUser.phone,
          avtar: foundUser.avatar,
          dob: foundUser.dob,
          sex: foundUser.sex,
          status: foundUser.status,
          role: foundUser.role,
        };

        // Update the user's password using userId
        axios
          .put(`/UserManagements/${foundUserId}`, updatedUser)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Password updated successfully!',
            });
            console.log('Password updated successfully');
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error updating password!',
            });
            console.error('Error updating password:', error);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match!',
        });
        console.log('Passwords do not match');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Email not found!',
      });
      console.log('Email not found in UserManagements');
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} style={{ marginTop: '80px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Recover password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRecoverPassword}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2 ms-3">Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          </Row>

          {codeConfirmed && (
            <Row>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2 ms-3">Code</Form.Label>
                <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} />
              </Form.Group>
            </Row>
          )}

          {codeConfirmed && code === generatedCode && (
            <>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-2 ms-3">Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" className="btn close-btn" onClick={onClose}>
          Cancel
        </Button>
        {!codeConfirmed ? (
          <Button
            variant="contained"
            className="btn"
            onClick={handleSendCode}
            style={{ marginRight: '8%' }}
          >
            Send Code
          </Button>
        ) : (
          <Button
            variant="contained"
            className="btn"
            style={{ marginRight: '8%' }}
            onClick={handleRecoverPassword}
          >
            Recover
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default RecoverPassword;
