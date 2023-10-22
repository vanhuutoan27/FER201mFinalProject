import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

// ADMIN
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import AdminAnalysis from './pages/admin/AdminAnalysis/AdminAnalysis';
import OrderManagement from './pages/admin/OrderManagement/OrderManagement';
import StaffManagement from './pages/admin/StaffManagement/StaffManagement';
import UserManagement from './pages/admin/UserManagement/UserManagement';
import PackageServiceManagement from './pages/admin/PackageServiceManagement/PackageServiceManagement';
import ServiceManagement from './pages/admin/ServiceManagement/ServiceManagement';

// STAFF
import StaffTask from './pages/staff/StaffTask/StaffTask';
import StaffProfile from './pages/staff/StaffProfile/StaffProfile';
import StaffCalendar from './pages/staff/StaffCalendar/StaffCalendar';
import StaffOrder from './pages/staff/StaffOrder/StaffOrder';

// CUSTOMER
import Profile from './pages/customer/Profile/Profile';
import MyOrder from './pages/customer/MyOrder/MyOrder';

//COMMON
import Loading from './components/Loading';
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

  const admin = ['admin1@gmail.com', 'vhtoan27@gmail.com'];
  const staff = [
    'admin1@gmail.com',
    'vhtoan27@gmail.com',
    'phamhoaiduy@gmail.com',
    'nguyentanloc@gmail.com',
    'phamhoangthuyan@gmail.com',
  ];

  const isAdmin = admin.includes(user?.email);
  const isStaff = staff.includes(user?.email);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  useEffect(() => {
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Make the GET request using the custom Axios instance
    axiosInstance
      .get('https://localhost:7088/api/UserManagements/Launch')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setData(/* your data */);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Session.Provider value={{ user, setUser }}>
      <div className="App">
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            {/* ROUTES FOR ADMIN */}
            {isAdmin && (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-analysis" element={<AdminAnalysis />} />
                <Route path="/admin-order-management" element={<OrderManagement />} />
                <Route path="/admin-staff-management" element={<StaffManagement />} />
                <Route path="/admin-user-management" element={<UserManagement />} />
                <Route path="/admin-service-management" element={<ServiceManagement />} />
                <Route
                  path="/admin-package-service-management"
                  element={<PackageServiceManagement />}
                />
              </>
            )}

            {/* ROUTES FOR STAFF */}
            {isStaff && (
              <>
                <Route path="/staff-profile" element={<StaffProfile />} />
                <Route path="/staff-order" element={<StaffOrder />} />
                <Route path="/staff-task" element={<StaffTask />} />
                <Route path="/staff-calendar" element={<StaffCalendar />} />
              </>
            )}

            {/* ROUTES FOR CUSTOMER */}
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/my-order/:id" element={<MyOrder />} />

            {/* ROUTES FOR COMMON */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order-completion" element={<Completion />} />

            {/* Redirect to login for non-admin or non-staff users */}
            {(!isAdmin || !isStaff) && <Route path="*" element={<Navigate to="/" />} />}
          </Routes>
        )}
      </div>
    </Session.Provider>
  );
}

export default App;
