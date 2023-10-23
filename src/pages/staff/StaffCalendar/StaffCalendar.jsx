import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthContext } from '../../../App';

import axios from '../../../config/axios';
import StaffNavigation from '../../../components/StaffNavigation';
import ViewCalendar from './ViewCalendar';

import './StaffCalendar.css';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const localizer = momentLocalizer(moment);

function StaffCalendar() {
  const session = useContext(AuthContext);
  const user = session.user;
  const [eventsData, setEventsData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isTaskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const staffOrderResponse = await axios.get('/StaffOrderManagements');
        const staffOrderManagements = staffOrderResponse.data;

        const newEventsData = [];

        for (const staffOrder of staffOrderManagements) {
          const orderId = staffOrder.orderId;
          const staffId = staffOrder.staffId;
          const dateShipping = staffOrder.dateShipping;

          const staffResponse = await axios.get(`/UserManagements/${staffId}`);
          const staff = staffResponse.data;
          const staffEmail = staff.email;

          if (staffEmail === user.email) {
            if (orderId) {
              const orderResponse = await axios.get(`/OrderManagements/${orderId}`);
              const order = orderResponse.data;

              if (order.status === 'Completed') {
                continue;
              }

              const newEvent = {
                title: order.serviceName,
                start: new Date(dateShipping),
                end: new Date(dateShipping),
                orderInfo: order,
              };

              newEventsData.push(newEvent);
            } else {
              const taskTitle = staffOrder.taskTitle;
              const newEvent = {
                title: taskTitle,
                start: new Date(dateShipping),
                end: new Date(dateShipping),
              };

              newEventsData.push(newEvent);
            }
          }
        }

        setEventsData(newEventsData);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching staff orders:', error);
      }
    };

    fetchEvents();
  }, [user.email]);

  const handleViewTaskDetailClick = (event) => {
    setSelectedEvent(event);
    setTaskDetailModalVisible(true);
  };

  const handleCloseTaskDetailModal = () => {
    setSelectedEvent(null);
    setTaskDetailModalVisible(false);
  };

  return (
    <div className="StaffCalendarPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>
      <div className="calendar-content">
        
      </div>

      {selectedEvent && <ViewCalendar task={selectedEvent} onClose={handleCloseTaskDetailModal} />}
    </div>
  );
}

export default StaffCalendar;
