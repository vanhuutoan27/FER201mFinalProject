import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Session } from '../../../App';

import StaffNavigation from '../../../components/StaffNavigation';
import ViewTask from '../StaffTask/ViewTask';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function StaffCalendar() {
  const session = useContext(Session);
  const user = session.user;
  const [eventsData, setEventsData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isTaskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios
      .get('https://localhost:7088/api/StaffOrderManagements')
      .then((response) => {
        const staffOrderManagements = response.data;
        const newEventsData = [];

        const fetchEvents = async () => {
          for (const staffOrder of staffOrderManagements) {
            const orderId = staffOrder.orderId;
            const staffId = staffOrder.staffId;
            const dateShipping = staffOrder.dateShipping;

            try {
              const staffResponse = await axios.get(
                `https://localhost:7088/api/StaffManagements/${staffId}`
              );
              const staff = staffResponse.data;
              const staffEmail = staff.email;

              if (staffEmail === user.email) {
                const orderResponse = await axios.get(
                  `https://localhost:7088/api/OrderManagements/${orderId}`
                );
                const order = orderResponse.data;

                const newEvent = {
                  title: order.serviceName,
                  start: new Date(dateShipping),
                  end: new Date(dateShipping),
                };

                newEventsData.push(newEvent);
              }
            } catch (error) {
              setIsError(true);
              console.error(error);
            }
          }

          setEventsData(newEventsData);
        };

        fetchEvents();
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      });
  }, [user.email]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEventsData((prevEventsData) => [
        ...prevEventsData,
        {
          title,
          start,
          end,
        },
      ]);
    }
  };

  const handleViewTaskDetailClick = (task) => {
    setSelectedTask(task);
    setTaskDetailModalVisible(true);
  };

  return (
    <div className="StaffCalendarPage">
      <div className="staff-nav">
        <StaffNavigation />
      </div>
      <div className="calendar-content">
        <Calendar
          views={['day', 'work_week', 'month']}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
          onSelectSlot={handleSelect}
          showMultiDayTimes
        />
      </div>

      {isTaskDetailModalVisible && (
        <ViewTask selectedTask={selectedTask} onClose={() => setTaskDetailModalVisible(false)} />
      )}
    </div>
  );
}

export default StaffCalendar;
