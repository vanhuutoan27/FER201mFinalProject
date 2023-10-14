import React from 'react';

import StaffNavigation from '../../../components/StaffNavigation';

function StaffTask() {
  return (
    <div className="StaffTaskPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>

      {/* <div className="table-content">
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
      </div> */}

      {/* {isOrderDetailModalVisible && (
        <ViewOrder
          selectedOrder={selectedOrder}
          onClose={() => setOrderDetailModalVisible(false)}
        />
      )} */}
    </div>
  );
}

export default StaffTask;
