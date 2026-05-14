import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const studentLinks = [
  { to: '/student/dashboard', label: '⊡  Dashboard' },
  { to: '/student/jobs', label: '◈  Browse Jobs' },
  { to: '/student/applied', label: '✓  Applied Jobs' },
];
const facultyLinks = [
  { to: '/faculty/dashboard', label: '⊡  Dashboard' },
  { to: '/faculty/students', label: '⊙  Students' },
  { to: '/faculty/jobs', label: '◈  All Jobs' },
  { to: '/faculty/companies', label: '▣  Companies' },
  { to: '/faculty/register-company', label: '+  Register Company' },
];
const companyLinks = [
  { to: '/company/dashboard', label: '⊡  Dashboard' },
  { to: '/company/post-job', label: '+  Post Job' },
  { to: '/company/jobs', label: '◈  My Jobs' },
];

const roleLabel = { student: 'Student', faculty: 'Placement Cell', company: 'Company' };

export default function Sidebar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const links = role === 'student' ? studentLinks : role === 'faculty' ? facultyLinks : companyLinks;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>PlacePort</h2>
        <span>{roleLabel[role] || 'Portal'}</span>
      </div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''}>{l.label}</NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <strong>{user?.name || 'User'}</strong>
          {user?.email}
        </div>
        <button className="btn btn-secondary btn-sm btn-full" onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
}