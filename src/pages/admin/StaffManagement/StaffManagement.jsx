import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import AdminNavigation from '../../../components/AdminNavigation';
import ViewStaff from './ViewStaff';
import UpdateStaff from './UpdateStaff';

import axios from '../../../config/axios';
import { formatDate } from '../../../utils/DateUtils';
import '../../../components/Management.css';

function StaffManagement() {
  const [allStaffs, setAllStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [updatingStaff, setUpdatingStaff] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((response) => {
        const staffData = response.data.filter((user) => user.role === 'Staff');
        staffData.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        setAllStaffs(staffData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewServiceClick = (staff) => {
    setSelectedStaff(staff);
  };

  const handleUpdateServiceClick = (staff) => {
    setUpdatingStaff(staff);
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
    const itemsToDisplay = filteredStaffs.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
    setTotalItems(filteredStaffs.length);
  };

  const filteredStaffs = allStaffs.filter((staff) => {
    const fullName = `${staff.firstName} ${staff.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();

    return staff.email.toLowerCase().includes(query) || fullName.includes(query);
  });

  useEffect(() => {
    updateCurrentItems();
  }, [searchQuery, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = filteredStaffs.slice(startIndex, endIndex);

  return (
    <div className="user-management-content">
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
              <h2>All Staffs</h2>
              <span className="table-row-count">({allStaffs.length} Staffs)</span>
              {/* <CreateUser /> */}
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
                {displayedServices.map((staff, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`serviceID`}>
                        {staff.role === 'Admin' ? 'A' : staff.role === 'Staff' ? 'S' : 'C'}
                        {staff.userId < 10
                          ? '00' + staff.userId
                          : staff.userId < 100
                          ? '0' + staff.userId
                          : staff.userId}
                      </span>
                    </td>

                    <td>
                      <span className="customer-name">{staff.email}</span>
                    </td>

                    <td>
                      <span className="service-name">{staff.phone}</span>
                    </td>

                    <td>
                      <span className="service-price">
                        {staff.firstName} {staff.lastName}
                      </span>
                    </td>

                    <td>
                      <span className="service-time">{formatDate(staff.dateCreated)}</span>
                    </td>

                    <td>
                      <span className="statuss">
                        <span className={`status status--${staff.status}`}>{staff.status}</span>
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn-action view btn"
                        onClick={() => handleViewServiceClick(staff)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="admin-btn-action edit btn"
                        onClick={() => handleUpdateServiceClick(staff)}
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
                        total={filteredStaffs.length}
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

      {selectedStaff && (
        <ViewStaff selectedStaff={selectedStaff} onClose={() => setSelectedStaff(null)} />
      )}

      {updatingStaff && (
        <UpdateStaff selectedStaff={updatingStaff} onClose={() => setUpdatingStaff(null)} />
      )}
    </div>
  );
}

export default StaffManagement;
