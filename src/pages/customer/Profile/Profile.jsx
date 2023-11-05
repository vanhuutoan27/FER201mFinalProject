import React, { useContext, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../App';
import Navigation from '../../../components/Navigation';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/DateUtils';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from '../../../config/axios';
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Profile.css';

function Profile() {
  const session = useContext(AuthContext);
  const userInfo = session.user.user;

  // const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(userInfo);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [initialUser, setInitialUser] = useState(userInfo);

  const handleReset = () => {
    if (!isEditing) {
      return;
    }

    Swal.fire({
      title: 'Cancel Editing?',
      text: 'Are you sure you want to cancel and discard your changes?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'var(--primary-color-2)',
      confirmButtonColor: 'var(--primary-color-2)',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdatedUser(initialUser);
        setIsEditing(false);
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setIsEditing(false);

    try {
      await axios.put(`/UserManagements/${updatedUser.userId}`, updatedUser);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User updated successfully!',
        confirmButtonColor: 'var(--primary-color-2)',
      });
    } catch (err) {
      console.error('Error updating user', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating user',
        confirmButtonColor: 'var(--primary-color-2)',
      });
    } finally {
      setIsLoading(false);
      setInitialUser(updatedUser);
    }
  };

  function convertToRequiredFormat(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateString;
  }

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

  return (
    <div className="ProfilePage">
      <Navigation />
      <div className="content">
        <div className="card-content">
          <div className="card-avatar">
            <div className="card-avatar-header">
              <label htmlFor="imageUpload" className="image-upload-label">
                <img
                  src={updatedUser.avatar}
                  alt={updatedUser.firstName + ' ' + updatedUser.lastName}
                  className="user-avatar"
                />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <h3 className="title">{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
              <p>{userInfo.email}</p>
            </div>
            <div className="card-avatar-body">
              <h2 className="title">About</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolorem ipsum.</p>
            </div>
            <div className="card-avatar-footer">
              <Link to="#!">
                <FontAwesomeIcon icon={faGithub} className="custom-icon" />
              </Link>
            </div>
          </div>
          <div className="card-info">
            <div className="card-info-box">
              <h2 className="title">User Information</h2>
              <Row>
                <Col className="mr-8">
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        (userInfo.role === 'Admin' ? 'A' : userInfo.role === 'Staff' ? 'S' : 'C') +
                        (userInfo.userId < 10
                          ? '00' + userInfo.userId
                          : userInfo.userId < 100
                          ? '0' + userInfo.userId
                          : userInfo.userId)
                      }
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={updatedUser.firstName}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          firstName: e.target.value,
                        })
                      }
                      readOnly={!isEditing}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date of Birth</Form.Label>
                    <Form.Control
                      type={isEditing ? 'date' : 'text'}
                      value={isEditing ? updatedUser.dob : formatDate(updatedUser.dob)}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          dob: isEditing ? e.target.value : convertToRequiredFormat(e.target.value),
                        })
                      }
                      readOnly={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={updatedUser.email}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          email: e.target.value,
                        })
                      }
                      readOnly={!isEditing}
                    />
                  </Form.Group>
                </Col>
                <Col className="ml-8">
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Date Created</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatDate(updatedUser.dateCreated)}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={updatedUser.lastName}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          lastName: e.target.value,
                        })
                      }
                      readOnly={!isEditing}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={updatedUser.phone}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          phone: e.target.value,
                        })
                      }
                      readOnly={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2 ms-3">Password</Form.Label>
                    <div className="password-input-container" style={{ position: 'relative' }}>
                      <Form.Control
                        type={isEditing ? 'text' : showPassword ? 'text' : 'password'}
                        value={updatedUser.password}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            password: e.target.value,
                          })
                        }
                        readOnly={!isEditing}
                        className="password-toggle-icon"
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '8px',
                          color: '#5a6473',
                          padding: '16px 12px',
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  className="btn"
                  style={{
                    marginRight: '24px',
                    background: 'var(--primary-coor-0)',
                    border: '2px solid var(--primary-color-2)',
                  }}
                  onClick={handleReset}
                >
                  Cancel
                </Button>
                {isEditing || isAvatarChanged ? (
                  <Button variant="contained" className="btn" onClick={handleSave}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                ) : (
                  <Button variant="contained" className="btn" onClick={handleEdit}>
                    {isLoading ? 'Editing...' : 'Edit'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
