import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

import Loading from './components/Loading';

// ADMIN
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import UserManagement from './pages/admin/UserManagement/UserManagement';
import PackageServiceManagement from './pages/admin/PackageServiceManagement/PackageServiceManagement';
import ServiceManagement from './pages/admin/ServiceManagement/ServiceManagement';

// STAFF
import StaffDashboard from './pages/staff/StaffDashboard/StaffDashboard';
import StaffProfile from './pages/staff/StaffProfile/StaffProfile';
import StaffCalendar from './pages/staff/StaffCalendar/StaffCalendar';
import StaffOrder from './pages/staff/StaffOrder/StaffOrder';

// CUSTOMER
import Profile from './pages/customer/Profile/Profile';
import History from './pages/customer/History/History';

//COMMON
import Login from './pages/common/Login/Login';
import Home from './pages/common/Home/Home';
import About from './pages/common/About/About';
import Service from './pages/common/Service/Service';
import Contact from './pages/common/Contact/Contact';
import Detail from './pages/common/Detail/Detail';
import Order from './pages/common/Order/Order';
import Completion from './pages/common/Order/Completion';

export const Session = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  useEffect(() => {
    // Create a custom Axios instance with headers
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`, // Attach the access token as a Bearer token
      },
    });

    // Make the GET request using the custom Axios instance
    axiosInstance
      .get('https://localhost:7088/api/CustomerManagements/Launch')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });

    // Simulate an API call or data loading
    setTimeout(() => {
      // Set data and loading state to false when data is ready
      setData(/* your data */);
      setIsLoading(false);
    }, 500); // Simulate a 2-second delay
  }, []);

  return (
    <Session.Provider value={{ user, setUser }}>
      <div className="App">
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            {/* ROUTES FOR ADMIN */}
            {user?.email === 'admin1@gmail.com' ? (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-overview" element={<AdminDashboard />} />
                <Route path="/admin-analysis" element={<AdminDashboard />} />
                <Route path="/admin-feedback" element={<AdminDashboard />} />
                <Route path="/admin-user-management" element={<UserManagement />} />
                <Route
                  path="/admin-package-service-management"
                  element={<PackageServiceManagement />}
                />
                <Route path="/admin-service-management" element={<ServiceManagement />} />
              </>
            ) : null}

            {/* ROUTES FOR STAFF */}
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/staff-profile" element={<StaffProfile />} />
            <Route path="/staff-calendar" element={<StaffCalendar />} />
            <Route path="/staff-order" element={<StaffOrder />} />

            {/* ROUTES FOR CUSTOMER */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />

            {/* ROUTES FOR COMMON */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order-completion" element={<Completion />} />

            {/* Redirect to login for non-admin users */}
            {user?.email !== 'admin1@gmail.com' && <Route path="*" element={<Navigate to="/" />} />}
          </Routes>
        )}
      </div>
    </Session.Provider>
  );
}

export default App;
