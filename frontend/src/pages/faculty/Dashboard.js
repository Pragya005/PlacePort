import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/faculty/stats').then(r => setStats(r.data));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Placement Cell · {user?.employeeId}</p>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num">{stats.totalStudents}</div><div className="stat-label">Total Students</div></div>
          <div className="stat-card"><div className="stat-num">{stats.profileComplete}</div><div className="stat-label">Profiles Completed</div></div>
          <div className="stat-card"><div className="stat-num">{stats.totalCompanies}</div><div className="stat-label">Companies</div></div>
          <div className="stat-card"><div className="stat-num">{stats.openJobs}</div><div className="stat-label">Open Jobs</div></div>
          <div className="stat-card"><div className="stat-num">{stats.totalJobs}</div><div className="stat-label">Total Jobs</div></div>
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <p className="section-title" style={{ marginBottom: 16 }}>Quick Actions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/faculty/register-company" className="btn btn-primary">+ Register New Company</Link>
            <Link to="/faculty/students" className="btn btn-secondary">View All Students</Link>
            <Link to="/faculty/jobs" className="btn btn-secondary">View All Jobs</Link>
            <Link to="/faculty/companies" className="btn btn-secondary">View Companies</Link>
          </div>
        </div>
        <div className="card">
          <p className="section-title">Overview</p>
          <div style={{ fontSize: 13.5, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="flex-between"><span>Students registered</span><strong>{stats?.totalStudents ?? '—'}</strong></div>
            <div className="flex-between"><span>Profiles filled</span><strong>{stats?.profileComplete ?? '—'}</strong></div>
            <div className="flex-between"><span>Companies onboarded</span><strong>{stats?.totalCompanies ?? '—'}</strong></div>
            <div className="flex-between"><span>Active job postings</span><strong>{stats?.openJobs ?? '—'}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}