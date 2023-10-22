import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Session } from '../../../App';

import axios from '../../../config/axios';
import StaffNavigation from '../../../components/StaffNavigation';
import ViewCalendar from './ViewCalendar';

import './StaffCalendar.css';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const localizer = momentLocalizer(moment);

function StaffCalendar() {
  const session = useContext(Session);
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

  const handleSelect = async ({ start, end }) => {
    const taskTitle = window.prompt('Enter new event title:');
    if (taskTitle !== null) {
      try {
        const staffResponse = await axios.get('/UserManagements', {
          params: {
            email: user.email,
          },
        });

        if (staffResponse.data.length > 0) {
          const staff = staffResponse.data[0];
          const staffId = staff.staffId;

          const orderId = window.prompt('Enter Order ID:');
          if (orderId) {
            const orderResponse = await axios.get(`/OrderManagements/${orderId}`);
            const order = orderResponse.data;

            const newEvent = {
              title: order.serviceName,
              start: moment(start).add(7, 'hours').toDate(),
              end: end,
              orderInfo: order,
            };

            try {
              await axios.post('/StaffOrderManagements', {
                taskTitle: taskTitle,
                orderId: orderId,
                staffId: staffId,
                dateShipping: newEvent.start,
              });

              setEventsData((prevEventsData) => [...prevEventsData, newEvent]);
              console.log('Event saved successfully.');
            } catch (error) {
              console.error('Error saving event:', error);
            }
          } else {
            const newEvent = {
              title: taskTitle,
              start: moment(start).add(7, 'hours').toDate(),
              end: end,
            };

            try {
              await axios.post('/StaffOrderManagements', {
                taskTitle: taskTitle,
                staffId: staffId,
                dateShipping: newEvent.start,
              });

              setEventsData((prevEventsData) => [...prevEventsData, newEvent]);
              console.log('Event saved successfully.');
            } catch (error) {
              console.error('Error saving event:', error);
            }
          }
        } else {
          console.error('No staff data found for the given email.');
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    } else {
      alert('Task title is required.');
    }
  };

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
        <Calendar
          views={['day', 'week', 'month']}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' }}
          onSelectSlot={handleSelect}
          showMultiDayTimes
          onSelectEvent={handleViewTaskDetailClick}
        />
      </div>

      {selectedEvent && <ViewCalendar task={selectedEvent} onClose={handleCloseTaskDetailModal} />}
    </div>
  );
}

export default StaffCalendar;
