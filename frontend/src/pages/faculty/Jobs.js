import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

export default function FacultyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { API.get('/faculty/jobs').then(r => { setJobs(r.data); setLoading(false); }); }, []);

  return (
    <div>
      <div className="page-header"><h1>All Job Postings</h1><p>{jobs.length} jobs across all companies</p></div>
      {loading ? <p>Loading...</p> : jobs.length === 0 ? (
        <div className="empty-state"><div className="icon">◈</div><p>No jobs posted yet</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {jobs.map(job => (
            <div key={job._id} className="card" style={{ padding: 20 }}>
              <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600 }}>{job.title}</h3>
                  <p style={{ color: 'var(--accent)', fontSize: 13 }}>{job.company?.name} · {job.location}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge ${job.isOpen ? 'badge-green' : 'badge-red'}`}>{job.isOpen ? 'Open' : 'Closed'}</span>
                  <span className="badge badge-blue">{job.jobType}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>
                <span>👥 {job.applicants?.length || 0} applicants</span>
                {job.openings && <span>🔢 {job.openings} openings</span>}
                {job.salary && <span>₹ {job.salary}</span>}
                <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              {job.applicants?.length > 0 && (
                <button className="btn btn-secondary btn-sm" onClick={() => setExpanded(expanded === job._id ? null : job._id)}>
                  {expanded === job._id ? '▲ Hide Applicants' : `▼ View ${job.applicants.length} Applicants`}
                </button>
              )}
              {expanded === job._id && (
                <div style={{ marginTop: 14 }}>
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Name</th><th>Email</th><th>Branch</th><th>CGPA</th><th>Applied On</th><th>Status</th></tr></thead>
                      <tbody>
                        {job.applicants.map(a => (
                          <tr key={a._id}>
                            <td><strong>{a.student?.name || '—'}</strong></td>
                            <td className="text-secondary">{a.student?.email || '—'}</td>
                            <td>{a.student?.branch || '—'}</td>
                            <td>{a.student?.cgpa || '—'}</td>
                            <td>{new Date(a.appliedAt).toLocaleDateString()}</td>
                            <td><span className={`badge ${a.status === 'Selected' ? 'badge-green' : a.status === 'Rejected' ? 'badge-red' : a.status === 'Shortlisted' ? 'badge-yellow' : 'badge-blue'}`}>{a.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}