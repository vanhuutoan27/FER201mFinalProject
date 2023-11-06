import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import AdminNavigation from '../../../components/AdminNavigation';
import CreatePackageService from './CreatePackageService';
import ViewPackageService from './ViewPackageService';
import UpdatePackageService from './UpdatePackageService';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import '../../../components/Management.css';

function PackageServiceManagement() {
  const [allPackageServices, setAllPackageServices] = useState([]);
  const [selectedPackageService, setSelectedPackageService] = useState(null);
  const [updatingPackageService, setUpdatingPackageService] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('/PackageServiceManagements')
      .then((response) => setAllPackageServices(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleViewServiceClick = (packageService) => {
    setSelectedPackageService(packageService);
  };

  const handleUpdateServiceClick = (packageService) => {
    setUpdatingPackageService(packageService);
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
    const itemsToDisplay = filteredPackageServices.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
    setTotalItems(filteredPackageServices.length);
  };

  const filteredPackageServices = allPackageServices.filter((packageService) =>
    packageService.packageServiceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    updateCurrentItems();
  }, [searchQuery, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = filteredPackageServices.slice(startIndex, endIndex);

  const handleUpdateServiceComplete = (updatedService) => {
    // Cập nhật trạng thái sau khi cập nhật thành công
    setAllPackageServices((prevPackageServices) => {
      return prevPackageServices.map((service) => {
        if (service.packageServiceId === updatedService.packageServiceId) {
          return updatedService;
        }
        return service;
      });
    });
  };

  return (
    <div className="package-service-management-content">
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
              <h2>All Packages</h2>
              <span className="table-row-count">({allPackageServices.length} Packages)</span>
              <CreatePackageService />
            </caption>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price (VND)</th>
                  <th>Time (Mins)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedServices.map((packageService, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`serviceID`}>
                        P
                        {packageService.packageServiceId < 10
                          ? '00' + packageService.packageServiceId
                          : '0' + packageService.packageServiceId}
                      </span>
                    </td>

                    <td>
                      <span className="service-name">{packageService.packageServiceName}</span>
                    </td>

                    <td>
                      <span className="service-name">
                        {packageService.isDescriptionOpen
                          ? packageService.packageServiceDesc
                          : packageService.packageServiceDesc.substring(0, 60)}
                      </span>
                      {packageService.packageServiceDesc.length > 100 && <span>...</span>}
                    </td>

                    <td>
                      <span className="service-price">
                        {formatPriceWithDot(packageService.price)}
                      </span>
                    </td>

                    <td>
                      <span className="service-time">{packageService.time}</span>
                    </td>

                    <td>
                      <span className="statuss">
                        <span className={`status status--${packageService.status}`}>
                          {packageService.status}
                        </span>
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn-action view btn"
                        onClick={() => handleViewServiceClick(packageService)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="admin-btn-action edit btn"
                        onClick={() => handleUpdateServiceClick(packageService)}
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
                        total={filteredPackageServices.length}
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

      {selectedPackageService && (
        <ViewPackageService
          selectedPackageService={selectedPackageService}
          onClose={() => setSelectedPackageService(null)}
        />
      )}

      {updatingPackageService && (
        <UpdatePackageService
          selectedPackageService={updatingPackageService}
          onClose={() => setUpdatingPackageService(null)}
          handleUpdateServiceComplete={handleUpdateServiceComplete}
        />
      )}
    </div>
  );
}

export default PackageServiceManagement;
