import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import StaffNavigation from '../../../components/StaffNavigation';
import ViewOrder from './ViewOrder';

import { AuthContext } from '../../../App';
import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function StaffOrder() {
  const session = useContext(AuthContext);
  const user = session.user;
  const [currentItems, setCurrentItems] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [staffEmail, setStaffEmail] = useState('');
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = completedOrders.slice(startIndex, endIndex);
  const [isOrderDetailModalVisible, setOrderDetailModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get('/OrderManagements')
      .then((response) => {
        const orders = response.data;

        const pendingOrders = orders.filter((order) => order.status === 'Pending');

        pendingOrders.sort((a, b) => b.orderId - a.orderId);

        setCompletedOrders(pendingOrders);
      })
      .catch((error) => console.log(error));

    axios
      .get('/UserManagements')
      .then((response) => {
        const staffData = response.data;
        if (staffData.length > 0) {
          setStaffEmail(user.user.email);
          console.log('staffEmail:', staffEmail);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewOrderDetailClick = (order) => {
    setSelectedOrder(order);
    setOrderDetailModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateCurrentItems();
  };

  const updateCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = completedOrders.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
  };

  useEffect(() => {
    updateCurrentItems();
  }, [currentPage]);

  return (
    <div className="StaffOrderPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>

      <div className="table-content" style={{ marginTop: '40px' }}>
        <div className="table-widget">
          <caption>
            <h2>All Orders Available</h2>
          </caption>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Created</th>
                <th>Service</th>
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
                      O
                      {order.orderId < 10
                        ? '00' + order.orderId
                        : order.orderId < 100
                        ? '0' + order.orderId
                        : order.orderId}
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
                <td colSpan="6">
                  <div className="pagination">
                    <Pagination
                      total={completedOrders.length}
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
