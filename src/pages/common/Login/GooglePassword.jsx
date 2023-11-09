import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { Button } from '@mui/material';

import axios from '../../../config/axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

function GooglePassword({ isOpen, onClose, onLogin }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Lấy jwtToken từ localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      // Giải mã jwtToken để trích xuất thông tin người dùng, trong trường hợp này là email
      const decoded = jwtDecode(jwtToken);
      if (decoded.email) {
        setEmail(decoded.email);

        // Kiểm tra xem email đã có trong `localStorage` có trong Axios GET `UserManagements` hay chưa
        axios
          .get('/UserManagements')
          .then((response) => {
            // Kiểm tra xem email trong `localStorage` có tồn tại trong kết quả GET `UserManagements` không
            const user = response.data.find((user) => user.email === decoded.email);
            if (user) {
              // Email đã tồn tại, log email và password ra
              console.log('Email:', decoded.email);
              console.log('Password:', user.password);

              // Sau đó thực hiện đăng nhập với email và password từ UserManagements
              axios
                .post('/UserManagements/Login', { email: decoded.email, password: user.password })
                .then((loginResponse) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  onLogin();
                  window.location.href = '/';
                })
                .catch((loginError) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Login failed!',
                    text: 'Invalid password. Please try again.',
                  });
                });
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    }
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Thực hiện đăng ký với email và password ở đây
    const accessToken = localStorage.getItem('accessToken');
    const decoded = jwtDecode(accessToken);

    axios
      .post('/UserManagements/Register', {
        email,
        password,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        phone: 'null',
        confirmPassword: password,
        avatar: decoded.picture,
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        // Sau khi đăng ký thành công, bạn có thể thực hiện việc đăng nhập ngay sau khi đăng ký.
        axios
          .post('/UserManagements/Login', { email, password })
          .then((loginResponse) => {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              showConfirmButton: false,
              timer: 1500,
            });

            onLogin();
            window.location.href = '/';
          })
          .catch((loginError) => {
            Swal.fire({
              icon: 'error',
              title: 'Login failed!',
              text: 'Invalid password. Please try again.',
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login failed!',
          text: 'Login failed. Please try again.',
        });
      });
  };

  return (
    <Modal show={isOpen} onHide={onClose} style={{ marginTop: '160px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Login With Google</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2 ms-3">Email</Form.Label>
              <Form.Control type="email" value={email} readOnly />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-2 ms-3">Enter Your Password</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePasswordChange} />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          className="btn"
          style={{ marginRight: '8%' }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GooglePassword;
