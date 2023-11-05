import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../App';
import { Badge, Calendar, Popover } from 'antd';
import axios from '../../../config/axios';
import StaffNavigation from '../../../components/StaffNavigation';

import './StaffCalendar.css';

const fetchData = async (user, setAllEvents) => {
  try {
    const response = await axios.get('/StaffOrderManagements');
    const staffOrderManagements = response.data;

    const userEvents = staffOrderManagements.filter((staffOrder) => {
      return staffOrder.staffId === user.user.userId;
    });

    const events = [];

    for (const task of userEvents) {
      const { orderId, staffId, dateShipping } = task;

      const [orderResponse, staffResponse] = await Promise.all([
        axios.get(`/OrderManagements/${orderId}`),
        axios.get(`/UserManagements/${staffId}`),
      ]);

      const orderInfo = orderResponse.data;
      const staffInfo = staffResponse.data;

      if (orderInfo.status === 'Processing') {
        // Lọc sự kiện có trạng thái "Processing"
        const combinedTask = {
          serviceName: orderInfo.serviceName,
          customerName: orderInfo.customerName,
          phone: orderInfo.phone,
          address: orderInfo.address,
          staffInfo,
          dateShipping,
          type: 'success',
        };

        events.push(combinedTask);
      }
    }

    setAllEvents(events);
  } catch (error) {
    console.error(error);
  }
};

function StaffCalendar() {
  const session = useContext(AuthContext);
  const user = session.user;
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    fetchData(user, setEventsData);
  }, []);

  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const eventsForDate = eventsData.filter(
        (event) => new Date(event.dateShipping).toDateString() === current.toDate().toDateString()
      );

      return (
        <ul>
          {eventsForDate.map((event, index) => (
            <Popover
              title={event.serviceName}
              content={
                <div>
                  <p>{`${event.customerName}, ${event.phone}`}</p>
                  <p>{event.address}</p>
                </div>
              }
            >
              <li key={index}>
                <Badge status={event.type} text={event.serviceName} />
              </li>
            </Popover>
          ))}
        </ul>
      );
    }

    return info.originNode;
  };

  return (
    <div className="StaffCalendarPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>
      <div className="calendar-content">
        <Calendar cellRender={cellRender} />
      </div>
    </div>
  );
}

export default StaffCalendar;
