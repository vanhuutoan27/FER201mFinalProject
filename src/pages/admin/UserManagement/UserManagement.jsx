import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

import AdminNavigation from '../../../components/AdminNavigation';
import ViewUser from './ViewUser';
import UpdateUser from './UpdateUser';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function UserManagement() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatingUser, setUpdatingUser] = useState(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((response) => {
        const customerData = response.data.filter((user) => user.role === 'Customer');

        customerData.sort((a, b) => {
          const dateA = new Date(a.dateCreated);
          const dateB = new Date(b.dateCreated);

          if (dateA < dateB) {
            return 1;
          } else if (dateA > dateB) {
            return -1;
          } else {
            return b.userId - a.userId;
          }
        });

        setAllUsers(customerData);
      })
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

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();

    return user.email.toLowerCase().includes(query) || fullName.includes(query);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="user-management-content">
      <div className="admin-navbar">
        <AdminNavigation />
      </div>
      <div className="maanagement-container">
        <div className="Search">
          <div className="Search">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="table-content">
          <div className="table-widget">
            <caption>
              <h2>All Users</h2>
              <span className="table-row-count">({allUsers.length} Users)</span>
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
                {displayedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`serviceID`}>
                        {user.role === 'Admin' ? 'A' : user.role === 'Staff' ? 'S' : 'C'}
                        {user.userId < 10
                          ? '00' + user.userId
                          : user.userId < 100
                          ? '0' + user.userId
                          : user.userId}
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
