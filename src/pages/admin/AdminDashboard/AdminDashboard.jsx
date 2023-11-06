import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardCheck,
  faComment,
  faMoneyBill,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';

import { formatPriceWithDot } from '../../../utils/PriceUtils';
import axios from '../../../config/axios';

import AdminNavigation from '../../../components/AdminNavigation';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import './AdminDashboard.scss';

function AdminDashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);

  useEffect(() => {
    axios
      .get('/UserManagements')
      .then((response) => {
        const customerData = response.data;
        const customerCount = customerData.length;
        setCustomerCount(customerCount);

        // Sort the customers by dateCreated in descending order to get the most recent customers first
        const sortedCustomers = response.data.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        // Slice the first 6 customers to get the most recent 6 customers
        const recentCustomers = sortedCustomers.slice(0, 6);
        setRecentCustomers(recentCustomers);
      })
      .catch((error) => console.error(error));

    axios
      .get('/OrderManagements')
      .then((response) => {
        const orders = response.data;
        const orderCount = orders.length;
        setOrderCount(orderCount);

        // Calculate total order price
        const totalPrice = orders.reduce((total, order) => total + parseFloat(order.price), 0);
        setTotalOrderPrice(totalPrice);

        // Sort the orders by dateCreated in descending order to get the most recent orders first
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        // Slice the first 8 orders to get the most recent 8 orders
        const recentOrders = sortedOrders.slice(0, 8);
        setRecentOrders(recentOrders);
      })
      .catch((error) => console.error(error));

    axios
      .get('/FeedbackManagements')
      .then((response) => {
        const feedbackData = response.data;
        const feedbackCount = feedbackData.length;
        setFeedbackCount(feedbackCount);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-navbar">
        <AdminNavigation />
      </div>
      <div>
        <div className="card-box">
          <div className="card">
            <div>
              <div className="card-numbers">
                <CountUp end={customerCount} duration={3} />
              </div>
              <div className="card-name">Customers</div>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="card-numbers">
                <CountUp end={orderCount} duration={3} />
              </div>
              <div className="card-name">Orders</div>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faClipboardCheck} />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="card-numbers">
                <CountUp end={feedbackCount} duration={3} />
              </div>
              <div className="card-name">Feedbacks</div>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faComment} />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="card-numbers">
                <CountUp end={totalOrderPrice} duration={2} />
              </div>
              <div className="card-name">Earnings</div>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
          </div>
        </div>

        <div className="graph-box">
          <div className="box">
            <DoughnutChart />
          </div>
          <div className="box">
            <BarChart />
          </div>
        </div>

        <div className="details">
          <div className="recent-orders">
            <div className="card-header">
              <h2>Recent Orders</h2>
              <Link to="/admin-order-management" className="btn-view-all">
                View All
              </Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Service</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>
                      O
                      {order.orderId < 10
                        ? `00${order.orderId}`
                        : order.orderId < 100
                        ? `0${order.orderId}`
                        : order.orderId}
                    </td>
                    <td>{order.serviceName}</td>
                    <td>{formatPriceWithDot(order.price)}</td>
                    <td>
                      {order.paymentMethod === 'momo'
                        ? 'Momo'
                        : order.paymentMethod === 'credit-card'
                        ? 'Credit Card'
                        : 'POC'}
                    </td>
                    <td>
                      <span className={`status--${order.status}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="recent-customers">
            <div className="card-header">
              <h2>Recent Customers</h2>
            </div>
            <table>
              <tbody>
                {recentCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td style={{ width: '60px' }}>
                      <div className="img-box">
                        <img src="../../assets/images/avatar/avatar-nobita.svg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        {customer.firstName} {customer.lastName} <br />
                        <span>{customer.phone}</span>
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
