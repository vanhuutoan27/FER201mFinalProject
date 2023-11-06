import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import StaffNavigation from '../../../components/StaffNavigation';
import ViewTask from './ViewTask';

import { AuthContext } from '../../../App';
import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function StaffTask() {
  const session = useContext(AuthContext);
  const user = session.user;
  const [allTasks, setAllTasks] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchData = async () => {
    try {
      // Tải thông tin StaffOrderManagements
      const response = await axios.get('/StaffOrderManagements');
      const staffOrderManagements = response.data;

      // Lọc công việc của người dùng hiện tại dựa trên email
      const userTasks = staffOrderManagements.filter((staffOrder) => {
        return staffOrder.staffId === user.user.userId;
      });

      const tasks = [];

      // Tải thông tin đơn hàng và người dùng từ API
      for (const task of userTasks) {
        const { orderId, staffId, dateShipping } = task;
        console.log("Staff ID:", staffId); 
        console.log("Order ID:", orderId); 

        const [orderResponse, staffResponse] = await Promise.all([
          axios.get(`/OrderManagements/${orderId}`),
          axios.get(`/UserManagements/${staffId}`),
        ]);

        const orderInfo = orderResponse.data;
        const staffInfo = staffResponse.data;

        const combinedTask = {
          orderInfo,
          staffInfo,
          dateShipping,
        };

        tasks.push(combinedTask);
      }

      // Sắp xếp theo trạng thái "Processing" trước, sau đó là "Completed"
      tasks.sort((a, b) => {
        if (a.orderInfo.status === 'Processing' && b.orderInfo.status === 'Completed') return -1;
        if (a.orderInfo.status === 'Completed' && b.orderInfo.status === 'Processing') return 1;
        return 0;
      });

      setAllTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.user.email]);

  const handleViewTaskDetailClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskDetailModalClose = () => {
    setSelectedTask(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = allTasks.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
  }, [currentPage, allTasks]);

  return (
    <div className="StaffTaskPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>

      <div className="table-content" style={{ marginTop: '40px' }}>
        <div className="table-widget">
          <caption>
            <h2>
              <span>
                {`${user.user.firstName.charAt(0).toUpperCase()}${user.user.firstName
                  .slice(1)
                  .toLowerCase()} ${user.user.lastName.charAt(0).toUpperCase()}${user.user.lastName
                  .slice(1)
                  .toLowerCase()}`}
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
              {currentItems.map((task, index) => (
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
                    <span className={`status status--${task.orderInfo.status}`}>
                      {task.orderInfo.status}
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
                <td colSpan="6">
                  <div className="pagination">
                    <Pagination
                      total={allTasks.length}
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

      {selectedTask && <ViewTask task={selectedTask} onClose={handleTaskDetailModalClose} />}
    </div>
  );
}

export default StaffTask;
