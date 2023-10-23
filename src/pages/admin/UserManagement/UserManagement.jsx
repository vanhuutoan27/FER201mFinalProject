import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

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
  const [currentItems, setCurrentItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateCurrentItems();
  };

  const updateCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredUsers.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
    setTotalItems(filteredUsers.length);
  };

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();

    return user.email.toLowerCase().includes(query) || fullName.includes(query);
  });

  useEffect(() => {
    updateCurrentItems();
  }, [searchQuery, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="user-management-content">
      <div className="admin-navbar">
        <AdminNavigation />
      </div>
      <div>
        <div className="Search">
          <div className="Search">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
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
                  <td colSpan="7">
                    <div className="pagination">
                      <Pagination
                        total={filteredUsers.length}
                        current={currentPage}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                      />
                    </div>
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
