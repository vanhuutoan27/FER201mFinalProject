import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

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
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPackageServices = allPackageServices.filter((packageService) =>
    packageService.packageServiceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = filteredPackageServices.slice(startIndex, endIndex);

  return (
    <div className="package-service-management-content">
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
                      <span className="service-name">{packageService.packageServiceDesc}</span>
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
                  <td colSpan="10">
                    <ul className="pagination">
                      {Array.from(
                        { length: Math.ceil(allPackageServices.length / itemsPerPage) },
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
        />
      )}
    </div>
  );
}

export default PackageServiceManagement;
