import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';

export default function CompanyDashboard() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ jobs: 0, applicants: 0, openJobs: 0 });

  useEffect(() => {
    Promise.all([API.get('/company/profile'), API.get('/company/jobs')]).then(([pr, jr]) => {
      setProfile(pr.data); setForm(pr.data);
      const jobs = jr.data;
      const total = jobs.reduce((a, j) => a + (j.applicants?.length || 0), 0);
      setStats({ jobs: jobs.length, applicants: total, openJobs: jobs.filter(j => j.isOpen).length });
      setLoading(false);
    });
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleUpdate = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      const r = await API.put('/company/profile', form);
      setProfile(r.data.company); setEditing(false); setMsg('Profile updated!');
    } catch (err) { setMsg('Update failed'); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header flex-between">
        <div><h1>{profile.name}</h1><p>Company Dashboard</p></div>
        <button className="btn btn-secondary" onClick={() => { setEditing(!editing); setMsg(''); }}>{editing ? 'Cancel' : '✎ Edit Profile'}</button>
      </div>

      {msg && <div className={`alert ${msg.includes('failed') ? 'alert-error' : 'alert-success'}`}>{msg}</div>}

      <div className="stats-grid mb-6">
        <div className="stat-card"><div className="stat-num">{stats.jobs}</div><div className="stat-label">Jobs Posted</div></div>
        <div className="stat-card"><div className="stat-num">{stats.openJobs}</div><div className="stat-label">Open Jobs</div></div>
        <div className="stat-card"><div className="stat-num">{stats.applicants}</div><div className="stat-label">Total Applicants</div></div>
      </div>

      {!editing ? (
        <>
          <div className="card mb-4">
            <p className="section-title">Company Details</p>
            <div className="detail-grid">
              <div className="detail-item"><label>Company Name</label><p>{profile.name}</p></div>
              <div className="detail-item"><label>Email</label><p>{profile.email}</p></div>
              <div className="detail-item"><label>Phone</label><p>{profile.phone || '—'}</p></div>
              <div className="detail-item"><label>Location</label><p>{profile.location || '—'}</p></div>
              <div className="detail-item"><label>Industry</label><p>{profile.industry || '—'}</p></div>
              <div className="detail-item"><label>CEO / Head</label><p>{profile.ceoName || '—'}</p></div>
              <div className="detail-item"><label>GST Number</label><p style={{ fontFamily: 'monospace' }}>{profile.gstNumber || '—'}</p></div>
              <div className="detail-item"><label>Website</label>
                {profile.website ? <a href={profile.website} className="link" target="_blank" rel="noreferrer">{profile.website} ↗</a> : <p>—</p>}
              </div>
              {profile.description && <div className="detail-item" style={{ gridColumn: '1/-1' }}><label>About</label><p>{profile.description}</p></div>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/company/post-job" className="btn btn-primary">+ Post New Job</Link>
            <Link to="/company/jobs" className="btn btn-secondary">My Jobs</Link>
          </div>
        </>
      ) : (
        <div className="card">
          <form onSubmit={handleUpdate}>
            <p className="section-title">Edit Profile</p>
            <div className="form-row">
              <div className="form-group"><label>Company Name</label><input value={form.name || ''} onChange={e => set('name', e.target.value)} /></div>
              <div className="form-group"><label>Phone</label><input value={form.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Location</label><input value={form.location || ''} onChange={e => set('location', e.target.value)} /></div>
              <div className="form-group"><label>Industry</label><input value={form.industry || ''} onChange={e => set('industry', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>CEO / Head Name</label><input value={form.ceoName || ''} onChange={e => set('ceoName', e.target.value)} /></div>
              <div className="form-group"><label>GST Number</label><input value={form.gstNumber || ''} onChange={e => set('gstNumber', e.target.value)} /></div>
            </div>
            <div className="form-group"><label>Website</label><input value={form.website || ''} onChange={e => set('website', e.target.value)} /></div>
            <div className="form-group"><label>About Company</label><textarea value={form.description || ''} onChange={e => set('description', e.target.value)} rows={3} /></div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
}