import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

const STATUS_OPTIONS = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];
const statusBadge = { Applied: 'badge-blue', Shortlisted: 'badge-yellow', Selected: 'badge-green', Rejected: 'badge-red' };

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchJobs = () => API.get('/company/jobs').then(r => { setJobs(r.data); setLoading(false); });
  useEffect(() => { fetchJobs(); }, []);

  const toggleStatus = async (jobId, isOpen) => {
    await API.put(`/company/jobs/${jobId}/status`, { isOpen: !isOpen });
    fetchJobs();
  };

  const updateApplicant = async (jobId, studentId, status) => {
    await API.put(`/company/jobs/${jobId}/applicants/${studentId}`, { status });
    fetchJobs();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header"><h1>My Jobs</h1><p>{jobs.length} job{jobs.length !== 1 ? 's' : ''} posted</p></div>
      {jobs.length === 0 ? (
        <div className="empty-state"><div className="icon">◈</div><p>No jobs posted yet</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {jobs.map(job => (
            <div key={job._id} className="card" style={{ padding: 20 }}>
              <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className="badge badge-blue">{job.jobType}</span>
                    <span className="badge badge-gray">📍 {job.location}</span>
                    {job.salary && <span className="badge badge-gray">₹ {job.salary}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge ${job.isOpen ? 'badge-green' : 'badge-red'}`}>{job.isOpen ? 'Open' : 'Closed'}</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => toggleStatus(job._id, job.isOpen)}>
                    {job.isOpen ? 'Close Job' : 'Reopen Job'}
                  </button>
                </div>
              </div>

              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {job.applicants?.length || 0} applicants · {job.openings} opening{job.openings !== 1 ? 's' : ''} ·
                Posted {new Date(job.createdAt).toLocaleDateString()}
                {job.deadline && ` · Deadline: ${new Date(job.deadline).toLocaleDateString()}`}
              </div>

              {job.applicants?.length > 0 && (
                <>
                  <button className="btn btn-secondary btn-sm" onClick={() => setExpanded(expanded === job._id ? null : job._id)}>
                    {expanded === job._id ? '▲ Hide' : `▼ Show ${job.applicants.length} Applicants`}
                  </button>
                  {expanded === job._id && (
                    <div style={{ marginTop: 14 }}>
                      <div className="table-wrap">
                        <table>
                          <thead><tr><th>Name</th><th>Email</th><th>Branch</th><th>CGPA</th><th>College</th><th>Mobile</th><th>Applied On</th><th>Status</th></tr></thead>
                          <tbody>
                            {job.applicants.map(a => (
                              <tr key={a._id}>
                                <td><strong>{a.student?.name || '—'}</strong></td>
                                <td className="text-secondary">{a.student?.email || '—'}</td>
                                <td>{a.student?.branch || '—'}</td>
                                <td>{a.student?.cgpa || '—'}</td>
                                <td>{a.student?.college || '—'}</td>
                                <td>{a.student?.mobile || '—'}</td>
                                <td>{new Date(a.appliedAt).toLocaleDateString()}</td>
                                <td>
                                  <select value={a.status} onChange={e => updateApplicant(job._id, a.student?._id, e.target.value)}
                                    style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }}>
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
              {job.applicants?.length === 0 && <p className="text-secondary text-sm">No applicants yet</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}