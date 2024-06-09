import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SuperAdminConsole from './pages/SuperAdminConsole';
import AdminConsole from './pages/AdminConsole';
import StudentConsole from './pages/StudentConsole';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import { useNavigate, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage/>} exact />
        <Route path="/superadmin" element={<PrivateRoute><SuperAdminConsole/></PrivateRoute>} role="superadmin" />
        <Route path="/admin" element={<PrivateRoute><AdminConsole/></PrivateRoute>} role="admin" />
        <Route path="/student" element={<PrivateRoute><StudentConsole/></PrivateRoute>} role="student" />
      </Routes>
    </Router>
  );
};

export default App;
