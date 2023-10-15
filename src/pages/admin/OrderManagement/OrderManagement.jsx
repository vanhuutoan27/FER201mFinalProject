import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

import AdminNavigation from '../../../components/AdminNavigation';
import ViewOrder from './ViewOrder';

import '../../../components/Management.css';

function OrderManagement() {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/OrderManagements')
      .then((response) => setAllOrders(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleViewServiceClick = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateServiceClick = (order) => {
    setUpdatingOrder(order);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = allOrders.slice(startIndex, endIndex);

  return (
    <div className="order-management-content">
      <div className="admin-navbar">
        <AdminNavigation />
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
                    <span className="service-name">{order.dateShipping}</span>
                  </td>

                  <td>
                    <span className="service-name">{order.dateComplete}</span>
                  </td>

                  <td>
                    <span className="service-price">
                      {order.firstName} {order.lastName}
                    </span>
                  </td>

                  <td>
                    <span className="service-time">{formatDate(order.dateCreated)}</span>
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
            <tfoot>
              <tr>
                <td colSpan="10">
                  <ul className="pagination">
                    {Array.from(
                      { length: Math.ceil(allOrders.length / itemsPerPage) },
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

      {selectedOrder && (
        <ViewOrder selectedOrder={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}

export default OrderManagement;
