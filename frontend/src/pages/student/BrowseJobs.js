import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState('');
  const [msgs, setMsgs] = useState({});
  const [filter, setFilter] = useState({ jobType: '', location: '' });
  const [selected, setSelected] = useState(null);

  const fetchJobs = async () => {
    const params = {};
    if (filter.jobType) params.jobType = filter.jobType;
    if (filter.location) params.location = filter.location;
    const r = await API.get('/jobs', { params });
    setJobs(r.data); setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const apply = async (jobId) => {
    setApplying(jobId);
    try {
      await API.post(`/student/apply/${jobId}`);
      setMsgs(m => ({ ...m, [jobId]: { type: 'success', text: 'Applied successfully!' } }));
    } catch (err) {
      setMsgs(m => ({ ...m, [jobId]: { type: 'error', text: err.response?.data?.message || 'Failed' } }));
    } finally { setApplying(''); }
  };

  const JobDetail = ({ job }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} onClick={() => setSelected(null)}>
      <div style={{ background: 'var(--surface)', width: 480, height: '100%', overflowY: 'auto', padding: 32, boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: 20 }} onClick={() => setSelected(null)}>← Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{job.title}</h2>
        <p style={{ color: 'var(--accent)', marginBottom: 16 }}>{job.company?.name}</p>
        <div className="job-meta">
          <span className="badge badge-blue">{job.jobType}</span>
          <span className="badge badge-gray">📍 {job.location}</span>
          {job.salary && <span className="badge badge-green">₹ {job.salary}</span>}
          {job.openings && <span className="badge badge-gray">{job.openings} openings</span>}
        </div>
        <div className="divider" />
        <p className="section-title">Job Description</p>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 20 }}>{job.description}</p>
        {job.skills?.length > 0 && <>
          <p className="section-title">Required Skills</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {job.skills.map(s => <span key={s} className="badge badge-gray">{s}</span>)}
          </div>
        </>}
        {job.eligibility && (job.eligibility.minCGPA || job.eligibility.passingYear || job.eligibility.branches?.length > 0) && <>
          <p className="section-title">Eligibility</p>
          <div style={{ fontSize: 13.5, marginBottom: 20 }}>
            {job.eligibility.minCGPA > 0 && <p>Min CGPA: {job.eligibility.minCGPA}</p>}
            {job.eligibility.passingYear && <p>Batch: {job.eligibility.passingYear}</p>}
            {job.eligibility.branches?.length > 0 && <p>Branches: {job.eligibility.branches.join(', ')}</p>}
          </div>
        </>}
        {job.deadline && <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16 }}>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>}
        {msgs[job._id] && <div className={`alert ${msgs[job._id].type === 'success' ? 'alert-success' : 'alert-error'}`}>{msgs[job._id].text}</div>}
        <button className="btn btn-primary btn-full" onClick={() => apply(job._id)} disabled={applying === job._id || msgs[job._id]?.type === 'success'}>
          {applying === job._id ? 'Applying...' : msgs[job._id]?.type === 'success' ? '✓ Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header"><h1>Browse Jobs</h1><p>Explore all open positions</p></div>
      <div className="card mb-4" style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select value={filter.jobType} onChange={e => setFilter(f => ({ ...f, jobType: e.target.value }))} style={{ width: 'auto', minWidth: 140 }}>
            <option value="">All Types</option>
            <option>Full-Time</option><option>Internship</option><option>Part-Time</option><option>Contract</option>
          </select>
          <input placeholder="Filter by location..." value={filter.location} onChange={e => setFilter(f => ({ ...f, location: e.target.value }))} style={{ width: 200 }} />
          <button className="btn btn-primary btn-sm" onClick={fetchJobs}>Search</button>
          <button className="btn btn-secondary btn-sm" onClick={() => { setFilter({ jobType: '', location: '' }); setTimeout(fetchJobs, 50); }}>Clear</button>
        </div>
      </div>

      {loading ? <p>Loading jobs...</p> : jobs.length === 0 ? (
        <div className="empty-state"><div className="icon">◈</div><p>No open jobs at the moment</p></div>
      ) : (
        <div className="job-grid">
          {jobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.company?.name}</p>
                </div>
                <span className="badge badge-green">Open</span>
              </div>
              <div className="job-meta">
                <span className="badge badge-blue">{job.jobType}</span>
                <span className="badge badge-gray">📍 {job.location}</span>
                {job.salary && <span className="badge badge-gray">₹ {job.salary}</span>}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{job.description?.substring(0, 120)}...</p>
              {job.deadline && <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>}
              {msgs[job._id] && <div className={`alert ${msgs[job._id].type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginTop: 8, marginBottom: 0 }}>{msgs[job._id].text}</div>}
              <div className="actions">
                <button className="btn btn-secondary btn-sm" onClick={() => setSelected(job)}>View Details</button>
                <button className="btn btn-primary btn-sm" onClick={() => apply(job._id)} disabled={applying === job._id || msgs[job._id]?.type === 'success'}>
                  {applying === job._id ? 'Applying...' : msgs[job._id]?.type === 'success' ? '✓ Applied' : 'Quick Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selected && <JobDetail job={selected} />}
    </div>
  );
}