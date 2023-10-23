import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import AdminNavigation from '../../../components/AdminNavigation';
import CreateService from './CreateService';
import ViewService from './ViewService';
import UpdateService from './UpdateService';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import '../../../components/Management.css';

function ServiceManagement() {
  const [allServices, setAllServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updatingService, setUpdatingService] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('/ServiceManagements')
      .then((response) => setAllServices(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleViewServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleUpdateServiceClick = (service) => {
    setUpdatingService(service);
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
    const itemsToDisplay = filteredServices.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
    setTotalItems(filteredServices.length);
  };

  const filteredServices = allServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    updateCurrentItems();
  }, [searchQuery, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = filteredServices.slice(startIndex, endIndex);

  return (
    <div className="service-management-content">
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
              <h2>All Services</h2>
              <span className="table-row-count">({allServices.length} Services)</span>
              <CreateService />
            </caption>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Tag</th>
                  <th>Price (VND)</th>
                  <th>Time (Mins)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedServices.map((service, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`serviceID`}>
                        S
                        {service.serviceId < 10
                          ? '00' + service.serviceId
                          : '0' + service.serviceId}
                      </span>
                    </td>

                    <td>
                      <span className="service-name">{service.serviceName}</span>
                    </td>

                    <td>
                      <span className="service-name">{service.tag}</span>
                    </td>

                    <td>
                      <span className="service-price">{formatPriceWithDot(service.price)}</span>
                    </td>

                    <td>
                      <span className="service-time">{service.time}</span>
                    </td>

                    <td>
                      <span className="statuss">
                        <span className={`status status--${service.status}`}>{service.status}</span>
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn-action view btn"
                        onClick={() => handleViewServiceClick(service)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="admin-btn-action edit btn"
                        onClick={() => handleUpdateServiceClick(service)}
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
                        total={filteredServices.length}
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

      {selectedService && (
        <ViewService selectedService={selectedService} onClose={() => setSelectedService(null)} />
      )}

      {updatingService && (
        <UpdateService selectedService={updatingService} onClose={() => setUpdatingService(null)} />
      )}
    </div>
  );
}

export default ServiceManagement;
