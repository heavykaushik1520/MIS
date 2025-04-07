import React from 'react';
import { Link } from 'react-router-dom';

// export const isAdmin = () => {
//     const token = localStorage.getItem('token');
//     const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
//     return decodedToken?.role === 'ROLE_ADMIN';
// };

export function isAdmin() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded Token:', decodedToken);
        if (decodedToken && decodedToken.role === 'ROLE_ADMIN') {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}

export default function Navbar() {
    return (
      <div className="navbar bg-primary text-primary-content px-4">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>

        {/* Group Operations Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Group
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/groups">All Groups</Link>
            </li>
            <li>
              <Link to="/groups/admin/create">Create</Link>
            </li>
            <li>
              <Link to="/groups/admin/update/:groupId">Update</Link>
            </li>
            <li>
              <Link to="/groups/details"> Details</Link>
            </li>
          </ul>
        </div>

        {/* Chain Operations Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Chain
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/chains"> All Chains</Link>
            </li>
            <li>
              <Link to="/chains/admin/create">Create </Link>
            </li>
            <li>
              <Link to="/chains/admin/update/:chainId">Update </Link>
            </li>
            <li>
              <Link to="/chains/details"> Details</Link>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Brand
          </label>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/brands">Manage Brands</Link>
            </li>
          </ul>
        </div>

        {/* zone operations */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Zone
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/zone/create">Create </Link>
            </li>
            <li>
              <Link to="/zone/all">Zones</Link>
            </li>
            <li>
              <Link to="/zone/search">Search</Link>
            </li>
          </ul>
        </div>

        <Link to="/login" className="btn btn-outline btn-success">
          Login
        </Link>
        <Link to="/logout" className="btn btn-soft">
          Logout
        </Link>
        <Link to="/user-profile" className="btn btn-outline btn-info">
          User Profile
        </Link>

        {isAdmin() && (
          <Link to="/admin-profile" className="btn btn-ghost">
            Admin Profile
          </Link>
        )}
      </div>
    );
}

