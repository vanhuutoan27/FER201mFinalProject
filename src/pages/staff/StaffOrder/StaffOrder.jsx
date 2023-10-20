import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Session } from '../../../App';

import StaffNavigation from '../../../components/StaffNavigation';
import ViewOrder from './ViewOrder';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function StaffOrder() {
  const session = useContext(Session);
  const user = session.user;
  const [allOrders, setAllOrders] = useState([]);
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
        setAllOrders(orders);

        const completedOrders = orders.filter((order) => order.status !== 'Completed');
        setCompletedOrders(completedOrders);
      })
      .catch((error) => console.log(error));

    axios
      .get('/StaffManagements')
      .then((response) => {
        const staffData = response.data;
        if (staffData.length > 0) {
          setStaffEmail(staffData[0].email);
          console.log('staffEmail:', staffData[0].email);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewOrderDetailClick = (order) => {
    setSelectedOrder(order);
    setOrderDetailModalVisible(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                      O{order.serviceId < 10 ? '00' + order.orderId : '0' + order.orderId}
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
                      { length: Math.ceil(completedOrders.length / itemsPerPage) },
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
