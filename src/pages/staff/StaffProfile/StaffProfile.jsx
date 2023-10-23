import React, { useContext, useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../App';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/DateUtils';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from '../../../config/axios';

import StaffNavigation from '../../../components/StaffNavigation';
import '../../customer/Profile/Profile.css';
import './StaffProfile.css';

function StaffProfile() {
  const session = useContext(AuthContext);
  const user = session.user;
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const [totalOrders, setTotalOrders] = useState(0);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);

    setIsEditing(false);

    try {
      await axios.put(`/UserManagements/${updatedUser.userId}`, updatedUser);
      alert('User updated successfully');
    } catch (error) {
      alert('Error updating user');
      console.error('Error updating user', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const metadata = {
      contentType: 'image/png',
    };

    const storageRef = ref(storage, `/images/${file.name}`);

    try {
      setUploadingImage(true);
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setUpdatedUser({ ...updatedUser, avatar: downloadURL });
      setUploadingImage(false);
      setIsAvatarChanged(true);
    } catch (error) {
      console.error('Error uploading image to Firebase', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/StaffOrderManagements`);
        const staffOrders = response.data;
        const filteredOrders = staffOrders.filter((order) => order.staffId === user.userId);
        const totalOrders = filteredOrders.length;
        setTotalOrders(totalOrders);
      } catch (error) {
        console.error('Error fetching total orders', error);
      }
    };

    fetchData();
  }, [user.userId]);

  return (
    <div className="StaffProfilePage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>
      <div className="content">
        <div className="card-content">
          <div className="card-avatar">
            <div className="card-avatar-header">
              <label htmlFor="imageUpload" className="image-upload-label">
                <img src={updatedUser.user.avatar} alt="User Image" className="user-avatar" />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <h3 className="title">{`${user.user.firstName} ${user.user.lastName}`}</h3>
              <p>{user.user.email}</p>
            </div>
            <div className="card-avatar-body">
              <h2 className="title">About</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolorem ipsum.</p>
            </div>
          </div>
          <div className="card-info">
            <div className="card-info-box">
              <h2 className="title">Staff Information</h2>
              <Row>
                <Col className=" mr-8">
                  <Form.Group className="mb-2">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        (user.user.role === 'Admin'
                          ? 'A'
                          : user.user.role === 'Staff'
                          ? 'S'
                          : 'C') +
                        (user.user.userId < 10
                          ? '00' + user.user.userId
                          : user.user.userId < 100
                          ? '0' + user.user.userId
                          : user.user.userId)
                      }
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type={isEditing ? 'date' : 'text'}
                      value={formatDate(updatedUser.user.dob)}
                      onChange={(e) => setUpdatedUser({ ...updatedUser, dob: e.target.value })}
                      readOnly={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={updatedUser.user.password}
                        onChange={(e) =>
                          setUpdatedUser({ ...updatedUser, password: e.target.value })
                        }
                        readOnly={!isEditing}
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col className="ml-8">
                  <Form.Group className="mb-2">
                    <Form.Label>Date Created</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatDate(updatedUser.user.dateCreated)}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={updatedUser.user.phone}
                      onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                      readOnly={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Total Orders</Form.Label>
                    <Form.Control type="text" value={totalOrders} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              {isEditing || isAvatarChanged ? (
                <Button variant="contained" className="btn" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button variant="contained" className="btn" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffProfile;
