import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { AuthContext } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

import axios from '../../../config/axios';
import { formatPriceWithDot } from '../../../utils/PriceUtils';
import { formatDate } from '../../../utils/DateUtils';
import Button from '@mui/material/Button';

import Feedback from './Feedback';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import './MyOrder.css';
import '../../../components/Management.css';

function MyOrder() {
  const session = useContext(AuthContext);
  const userInfo = session.user.user;
  const { userId } = useParams();

  const [allOrders, setAllOrders] = useState([]);
  const [staffOrders, setStaffOrders] = useState([]);
  const [allStaffs, setAllStaffs] = useState([]);
  const [orderRatings, setOrderRatings] = useState({});
  const [orderComments, setOrderComments] = useState({});
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    axios
      .get('/OrderManagements')
      .then((response) => {
        // Lọc ra các đơn hàng của người dùng hiện tại
        const userOrders = response.data.filter((order) => order.customerId === userInfo.userId);
        setAllOrders(userOrders);
      })
      .catch((error) => console.log(error));

    axios
      .get('/StaffOrderManagements')
      .then((response) => setStaffOrders(response.data))
      .catch((error) => console.log(error));

    axios
      .get('/UserManagements')
      .then((response) => setAllStaffs(response.data))
      .catch((error) => console.log(error));

    axios
      .get('/FeedbackManagements')
      .then((response) => {
        const feedbackRatings = {};
        const feedbackComments = {};

        response.data.forEach((feedback) => {
          feedbackRatings[feedback.orderId] = feedback.rating;
          feedbackComments[feedback.orderId] = feedback.comment;
        });

        setOrderRatings(feedbackRatings);
        setOrderComments(feedbackComments);
      })
      .catch((error) => console.log(error));
  }, [userInfo.userId]);

  const staffOrderDateShippingMap = new Map();
  staffOrders.forEach((staffOrder) => {
    staffOrderDateShippingMap.set(staffOrder.orderId, staffOrder.dateShipping);
  });

  const updatedOrders = allOrders.map((order) => {
    const dateShipping = staffOrderDateShippingMap.get(order.orderId);
    let staffInfo = {};

    if (dateShipping) {
      order = { ...order, dateShipping };
    }

    const staffOrder = staffOrders.find((staffOrder) => staffOrder.orderId === order.orderId);
    if (staffOrder) {
      const staff = allStaffs.find((staff) => staff.userId === staffOrder.staffId);
      if (staff) {
        staffInfo = {
          firstName: staff.firstName,
          lastName: staff.lastName,
        };
      }
    }

    return { ...order, ...staffInfo };
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = updatedOrders.filter((order) => {
    const orderString = JSON.stringify(order).toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();

    return orderString.includes(searchQueryLower);
  });

  filteredOrders.sort((a, b) => {
    const orderStatusOrder = {
      Completed: 1,
      Processing: 2,
      Pending: 3,
    };

    return orderStatusOrder[a.status] - orderStatusOrder[b.status] || b.orderId - a.orderId;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="MyOrderPage">
      <Navigation />
      <div className="my-order-container">
        <div>
          <div className="table-content">
            <div className="table-widget">
              <caption>
                <h2>My Orders History</h2>
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </caption>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date Created</th>
                    <th>Date Complete</th>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Note</th>
                    <th>Feedback</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((order, index) => (
                    <tr key={index}>
                      <td>
                        <span className={`serviceID`}>
                          O{order.orderId < 10 ? '00' + order.orderId : '0' + order.orderId}
                        </span>
                      </td>

                      <td>
                        <span className="customer-name">{formatDate(order.dateCreated)}</span>
                      </td>

                      <td>
                        <span className="service-name">
                          {order.dateComplete ? formatDate(order.dateComplete) : '--/--/----'}
                        </span>
                      </td>

                      <td>
                        <span className="service-name">{order.serviceName}</span>
                      </td>

                      <td>
                        <span className="service-name">{formatPriceWithDot(order.price)} VND</span>
                      </td>

                      <td>
                        <span className="service-name">{order.note}</span>
                      </td>

                      <td>
                        <span className="service-name">
                          {orderRatings[order.orderId] ? (
                            <>
                              {orderRatings[order.orderId]}{' '}
                              <StarIcon
                                style={{
                                  fontSize: '16px',
                                  marginBottom: '3px',
                                  color: 'var(--primary-color-1)',
                                }}
                              />
                              {orderComments[order.orderId] || 'Null'}
                            </>
                          ) : (
                            <Link to="/feedback">
                              <Button variant="contained" className="btn feedback">
                                Feedback
                              </Button>
                            </Link>
                          )}
                        </span>
                      </td>

                      <td>
                        <span className="statuss">
                          <span className={`status status--${order.status}`}>{order.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <Pagination
                  total={filteredOrders.length}
                  current={currentPage}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOrder;
