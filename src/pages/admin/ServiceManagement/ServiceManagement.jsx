import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

import AdminNavigation from '../../../components/AdminNavigation';
import CreateService from './CreateService';
import ViewService from './ViewService';
import UpdateService from './UpdateService';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import '../../../components/Management.css';

function AdminServiceManagement() {
  const [allServices, setAllServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updatingService, setUpdatingService] = useState(null);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredServices = allServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = filteredServices.slice(startIndex, endIndex);


  return (
    <div className="service-management-content">
      <div className="admin-navbar">
        <AdminNavigation />
      </div>
      <div className="maanagement-container">
        <div className="Search">
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  <td colSpan="10">
                    <ul className="pagination">
                      {Array.from(
                        { length: Math.ceil(allServices.length / itemsPerPage) },
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

export default AdminServiceManagement;
