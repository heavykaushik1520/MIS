import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';
import AdminProfile from './AdminProfile';
import Forbidden from './Forbidden';
import { isAdmin } from './Navbar';
import './index.css'
import GroupList from './groupComponents/GroupList';
import GroupDetails from './groupComponents/GroupDetails';
import GroupCreate from './groupComponents/GroupCreate';
import GroupUpdate from "./groupComponents/GroupUpdate";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route
        path="/admin-profile"
        element={isAdmin() ? <AdminProfile /> : <Navigate to="/forbidden" />}
      />
      <Route path="/forbidden" element={<Forbidden />} />

      {/* Group Management Routes */}
      <Route path="/groups" element={<GroupList />} />
      <Route path="/groups/:id" element={<GroupDetails />} />
      <Route path="/groups/admin/create" element={<GroupCreate />} />
      <Route path="/groups/admin/update/:groupId" element={<GroupUpdate />} />
    </Routes>
  </Router>
);
