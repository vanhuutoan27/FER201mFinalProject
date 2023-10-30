import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import AdminNavigation from '../../../components/AdminNavigation';
import ViewOrder from './ViewOrder';
import UpdateOrder from './UpdateOrder';
import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function OrderManagement() {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [staffOrders, setStaffOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('/OrderManagements')
      .then((response) => setAllOrders(response.data))
      .catch((error) => console.log(error));

    axios
      .get('/StaffOrderManagements')
      .then((response) => setStaffOrders(response.data))
      .catch((error) => console.log(error));

    axios
      .get('/UserManagements')
      .then((response) => setAllUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const staffOrderDateShippingMap = new Map();
  staffOrders.forEach((staffOrder) => {
    staffOrderDateShippingMap.set(staffOrder.orderId, staffOrder.dateShipping);
  });

  const updatedOrders = allOrders.map((order) => {
    const dateShipping = staffOrderDateShippingMap.get(order.orderId);
    let staffInfo = {};

    if (dateShipping) {
      order = { ...order, dateShipping };
    }

    const staffOrder = staffOrders.find((staffOrder) => staffOrder.orderId === order.orderId);
    if (staffOrder) {
      const user = allUsers.find((user) => user.userId === staffOrder.staffId);
      if (user) {
        staffInfo = {
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
    }

    return { ...order, ...staffInfo };
  });

  console.log('Updated Orders:', updatedOrders);

  const handleViewServiceClick = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateServiceClick = (order) => {
    setUpdatingOrder(order);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredOrders = updatedOrders.filter((order) => {
    const orderString = JSON.stringify(order).toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();

    return orderString.includes(searchQueryLower);
  });

  filteredOrders.sort((a, b) => {
    const orderStatusOrder = {
      Completed: 1,
      Processing: 2,
      Pending: 3,
    };

    return orderStatusOrder[a.status] - orderStatusOrder[b.status] || b.orderId - a.orderId;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="order-management-content">
      <div className="admin-navbar">
        <AdminNavigation />
      </div>
      <div>
        <div className="Search">
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="table-content">
          <div className="table-widget">
            <caption>
              <h2>All Orders</h2>
              <span className="table-row-count">({allOrders.length} Orders)</span>
            </caption>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date Created</th>
                  <th>Date Shipping</th>
                  <th>Date Complete</th>
                  <th>Service</th>
                  <th>Staff</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedOrders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`serviceID`}>
                        O{order.orderId < 10 ? '00' + order.orderId : '0' + order.orderId}
                      </span>
                    </td>

                    <td>
                      <span className="customer-name">{formatDate(order.dateCreated)}</span>
                    </td>

                    <td>
                      <span className="service-name">
                        {order.dateShipping ? formatDate(order.dateShipping) : '--/--/----'}
                      </span>
                    </td>

                    <td>
                      <span className="service-name">
                        {order.dateCompleted ? formatDate(order.dateCompleted) : '--/--/----'}
                      </span>
                    </td>

                    <td>
                      <span className="service-price">{order.serviceName}</span>
                    </td>

                    <td>
                      <span className="service-time">
                        {order.firstName && order.lastName
                          ? `${order.firstName} ${order.lastName}`
                          : ''}
                      </span>
                    </td>

                    <td>
                      <span className="statuss">
                        <span className={`status status--${order.status}`}>{order.status}</span>
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn-action view"
                        onClick={() => handleViewServiceClick(order)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="admin-btn-action edit"
                        onClick={() => handleUpdateServiceClick(order)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <Pagination
                total={filteredOrders.length}
                current={currentPage}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && !updatingOrder && (
        <ViewOrder
          selectedOrder={selectedOrder}
          allUsers={allUsers}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      {updatingOrder && (
        <UpdateOrder
          selectedOrder={updatingOrder}
          allUsers={allUsers}
          onClose={() => setUpdatingOrder(null)}
        />
      )}
    </div>
  );
}

export default OrderManagement;
