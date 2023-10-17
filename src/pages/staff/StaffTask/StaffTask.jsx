import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Session } from '../../../App';

import StaffNavigation from '../../../components/StaffNavigation';
import ViewTask from './ViewTask';

import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function StaffTask() {
  const session = useContext(Session);
  const user = session.user;
  const [allTasks, setAllTasks] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTasks = allTasks.slice(startIndex, endIndex);
  const [isTaskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/StaffOrderManagements')
      .then((response) => {
        const staffOrderManagements = response.data;

        staffOrderManagements.forEach((staffOrder) => {
          const orderId = staffOrder.orderId;
          const staffId = staffOrder.staffId;
          const dateShipping = staffOrder.dateShipping;

          axios
            .get(`https://localhost:7088/api/StaffManagements/${staffId}`)
            .then((staffResponse) => {
              const staff = staffResponse.data;
              const staffEmail = staff.email;

              if (staffEmail === user.email) {
                axios
                  .get(`https://localhost:7088/api/OrderManagements/${orderId}`)
                  .then((orderResponse) => {
                    const order = orderResponse.data;

                    const combinedInfo = {
                      orderInfo: order,
                      staffInfo: staff,
                      dateShipping: dateShipping,
                    };

                    setAllTasks((prevTasks) => [...prevTasks, combinedInfo]);
                  })
                  .catch((error) => console.log(error));
              }
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  }, [user.email]);

  const handleViewTaskDetailClick = (task) => {
    setSelectedTask(task);
    setTaskDetailModalVisible(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="StaffTaskPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>

      <div className="table-content">
        <div className="table-widget">
          <caption>
            <h2>
              <span>
                {session.user.firstName} {session.user.lastName}
              </span>
              's Tasks
            </h2>
          </caption>
          <table>
            <thead>
              <tr>
                <th>Date Shipping</th>
                <th>Service</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks.map((task, index) => (
                <tr key={index}>
                  <td>
                    <span className="service-name">{formatDate(task.dateShipping)}</span>
                  </td>

                  <td>
                    <span className="service-name">{task.orderInfo.serviceName}</span>
                  </td>

                  <td>
                    <span className="service-name">{task.orderInfo.address}</span>
                  </td>

                  <td>
                    <span className="service-name">{task.orderInfo.phone}</span>
                  </td>

                  <td>
                    <span className="statuss">
                      <span className={`status status--${task.orderInfo.status}`}>
                        {task.orderInfo.status}
                      </span>
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-btn-action view btn"
                      onClick={() => handleViewTaskDetailClick(task)}
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
                      { length: Math.ceil(allTasks.length / itemsPerPage) },
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

      {isTaskDetailModalVisible && (
        <ViewTask task={selectedTask} onClose={() => setTaskDetailModalVisible(false)} />
      )}
    </div>
  );
}

export default StaffTask;
