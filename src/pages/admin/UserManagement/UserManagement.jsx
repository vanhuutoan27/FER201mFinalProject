import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

import AdminNavigation from '../../../components/admin/AdminNavigation/AdminNavigation';
// import CreateUser from './CreateUser';
import ViewUser from './ViewUser';
import UpdateUser from './UpdateUser';

import '../../../components/Management.css';

function UserManagement() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatingUser, setUpdatingUser] = useState(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/CustomerManagements')
      .then((response) => setAllUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleViewServiceClick = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateServiceClick = (user) => {
    setUpdatingUser(user);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm để định dạng ngày tháng năm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = allUsers.slice(startIndex, endIndex);

  return (
    <div className="user-management-content">
      <div className="admin-navbar">
        <AdminNavigation />
      </div>
      <div className="table-content">
        <div className="table-widget">
          <caption>
            <h2>All Users</h2>
            <span className="table-row-count">({allUsers.length} Users)</span>
            {/* <CreateUser /> */}
          </caption>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Full Name</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedServices.map((user, index) => (
                <tr key={index}>
                  <td>
                    <span className={`serviceID`}>
                      C{user.customerId < 10 ? '00' + user.customerId : '0' + user.customerId}
                    </span>
                  </td>

                  <td>
                    <span className="customer-name">{user.email}</span>
                  </td>

                  <td>
                    <span className="service-name">{user.phone}</span>
                  </td>

                  <td>
                    <span className="service-price">
                      {user.firstName} {user.lastName}
                    </span>
                  </td>

                  <td>
                    <span className="service-time">{formatDate(user.dateCreated)}</span>
                  </td>

                  <td>
                    <span className="statuss">
                      <span className={`status status--${user.status}`}>{user.status}</span>
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-btn-action view btn"
                      onClick={() => handleViewServiceClick(user)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="admin-btn-action edit btn"
                      onClick={() => handleUpdateServiceClick(user)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="10">
                  <ul className="pagination">
                    {Array.from(
                      { length: Math.ceil(allUsers.length / itemsPerPage) },
                      (_, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'Admin' : ''}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {selectedUser && (
        <ViewUser selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {updatingUser && (
        <UpdateUser selectedUser={updatingUser} onClose={() => setUpdatingUser(null)} />
      )}
    </div>
  );
}

export default UserManagement;
