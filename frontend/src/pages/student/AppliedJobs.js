import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

const statusBadge = {
  Applied: 'badge-blue', Shortlisted: 'badge-yellow', Selected: 'badge-green', Rejected: 'badge-red'
};

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/student/applied-jobs').then(r => { setJobs(r.data); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Applied Jobs</h1>
        <p>{jobs.length} application{jobs.length !== 1 ? 's' : ''} submitted</p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state"><div className="icon">✓</div><p>You haven't applied to any jobs yet</p></div>
      ) : (
        <div className="job-grid">
          {jobs.map(job => {
            const myApp = job.applicants?.find(a => true);
            return (
              <div key={job._id} className="job-card">
                <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                  <div>
                    <h3>{job.title}</h3>
                    <p className="company-name">{job.company?.name}</p>
                  </div>
                  <span className={`badge ${statusBadge[myApp?.status] || 'badge-gray'}`}>{myApp?.status || 'Applied'}</span>
                </div>
                <div className="job-meta">
                  <span className="badge badge-blue">{job.jobType}</span>
                  <span className="badge badge-gray">📍 {job.location || job.company?.location}</span>
                  {job.salary && <span className="badge badge-gray">₹ {job.salary}</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{job.description?.substring(0, 100)}...</p>
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                  Applied on: {myApp?.appliedAt ? new Date(myApp.appliedAt).toLocaleDateString() : '—'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}