import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import StaffNavigation from '../../../components/StaffNavigation';
import ViewOrder from './ViewOrder';

import '../../../components/Management.css';

function StaffOrder() {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = allOrders.slice(startIndex, endIndex);
  const [isOrderDetailModalVisible, setOrderDetailModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/OrderManagements')
      .then((response) => setAllOrders(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleViewOrderDetailClick = (order) => {
    setSelectedOrder(order);
    setOrderDetailModalVisible(true);
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

  const formatPriceWithDot = (price) => {
    if (!isNaN(price)) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return price;
  };

  return (
    <div className="StaffOrderPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>

      <div className="table-content">
        <div className="table-widget">
          <caption>
            <h2>All Orders Available</h2>
          </caption>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Created</th>
                <th>Service Name</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span className={`serviceID`}>
                      O{order.serviceId < 10 ? '00' + order.serviceId : '0' + order.serviceId}
                    </span>
                  </td>

                  <td>
                    <span className="service-name">{formatDate(order.dateCreated)}</span>
                  </td>

                  <td>
                    <span className="service-name">{order.serviceName}</span>
                  </td>

                  <td>
                    <span className="service-name">{order.address}</span>
                  </td>

                  <td>
                    <span className="statuss">
                      <span className={`status status--${order.status}`}>{order.status}</span>
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-btn-action view btn"
                      onClick={() => handleViewOrderDetailClick(order)}
                    >
                      <FontAwesomeIcon icon={faEye} />
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

      {isOrderDetailModalVisible && (
        <ViewOrder
          selectedOrder={selectedOrder}
          onClose={() => setOrderDetailModalVisible(false)}
        />
      )}
    </div>
  );
}

export default StaffOrder;
