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
import ChainList from './chainComponent/ChainList';
import ChainDetails from './chainComponent/ChainDetails';
import CreateChain from './chainComponent/CreateChain';
import UpdateChain from './chainComponent/UpdateChain';
import BrandManagement from './brandComponent/BrandManagement';
import AddBrand from './brandComponent/AddBrand';
import BrandDetails from './brandComponent/BrandDetails';
import UpdateBrand from './brandComponent/UpdateBrand';
import DeleteBrand from './brandComponent/DeleteBrand';
import AddZone from './zoneComponent/AddZone';
import AllZones from './zoneComponent/AllZones';
import UpdateZone from './zoneComponent/UpdateZone';
import SearchZoneById from './zoneComponent/SearchZoneById';
import CreateEstimate from './estimateComponents/CreateEstimate';
import EstimateList from './estimateComponents/EstimateList';
import EstimateDetails from './estimateComponents/EstimateDetails';



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

      {/* Chain Management Routes */}
      <Route path="/chains" element={<ChainList />} />
      <Route path="/chains/:id" element={<ChainDetails />} />
      <Route path="/chains/admin/create" element={<CreateChain />} />
      <Route path="/chains/admin/update/:chainId" element={<UpdateChain />} />

      <Route path="/brands" element={<BrandManagement />} />
      <Route path="/chains/:id/add-brand" element={<AddBrand />} />
      <Route path="brands/:brandId" element={<BrandDetails />} />
      <Route path="brands/update/:brandId" element={<UpdateBrand />} />
      <Route path="/brands/delete/:brandId" element={<DeleteBrand />} />

      {/* zone management routes */}
      <Route path="/zone/create" element={<AddZone />} />
      <Route path="/zone/all" element={<AllZones />} />
      <Route path="/zones/update/:id" element={<UpdateZone />} />
      <Route path="/zone/search" element={<SearchZoneById />} />

      <Route path="/estimate/create" element={<CreateEstimate />} />
      <Route path="/estimate/all" element={<EstimateList />} />
      <Route path="/estimate/:id" element={<EstimateDetails />} />

    </Routes>
  </Router>
);

