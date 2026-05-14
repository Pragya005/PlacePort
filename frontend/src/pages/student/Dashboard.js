import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/student/profile').then(r => {
      setProfile(r.data);
      setForm(r.data);
      setLoading(false);
    });
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleUpdate = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      await API.put('/student/profile', { ...form, skills: Array.isArray(form.skills) ? form.skills.join(', ') : form.skills });
      const r = await API.get('/student/profile');
      setProfile(r.data); setEditing(false); setMsg('Profile updated!');
    } catch (err) { setMsg('Update failed: ' + (err.response?.data?.message || err.message)); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header flex-between">
        <div><h1>My Profile</h1><p>Your personal and academic information</p></div>
        <button className="btn btn-secondary" onClick={() => { setEditing(!editing); setMsg(''); }}>
          {editing ? 'Cancel' : '✎ Edit Profile'}
        </button>
      </div>

      {msg && <div className={`alert ${msg.includes('failed') ? 'alert-error' : 'alert-success'}`}>{msg}</div>}

      {!editing ? (
        <>
          <div className="card mb-4">
            <p className="section-title">Personal Details</p>
            <div className="detail-grid">
              <div className="detail-item"><label>Full Name</label><p>{profile.name}</p></div>
              <div className="detail-item"><label>Email</label><p>{profile.email}</p></div>
              <div className="detail-item"><label>Mobile</label><p>{profile.mobile || '—'}</p></div>
              <div className="detail-item"><label>Age</label><p>{profile.age || '—'}</p></div>
              <div className="detail-item"><label>Sex</label><p>{profile.sex || '—'}</p></div>
              <div className="detail-item"><label>Date of Birth</label><p>{profile.dob ? new Date(profile.dob).toLocaleDateString() : '—'}</p></div>
              <div className="detail-item"><label>City</label><p>{profile.city || '—'}</p></div>
              <div className="detail-item"><label>State</label><p>{profile.state || '—'}</p></div>
              <div className="detail-item" style={{ gridColumn: '1/-1' }}><label>Address</label><p>{profile.address || '—'}</p></div>
            </div>
          </div>
          <div className="card mb-4">
            <p className="section-title">Academic Details</p>
            <div className="detail-grid">
              <div className="detail-item"><label>College</label><p>{profile.college || '—'}</p></div>
              <div className="detail-item"><label>Degree</label><p>{profile.degree || '—'}</p></div>
              <div className="detail-item"><label>Branch</label><p>{profile.branch || '—'}</p></div>
              <div className="detail-item"><label>CGPA</label><p>{profile.cgpa || '—'}</p></div>
              <div className="detail-item"><label>Passing Year</label><p>{profile.passingYear || '—'}</p></div>
              <div className="detail-item"><label>Roll Number</label><p>{profile.rollNumber || '—'}</p></div>
            </div>
          </div>
          <div className="card">
            <p className="section-title">Skills & Resume</p>
            <div className="detail-item mb-4">
              <label>Skills</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {profile.skills?.length ? profile.skills.map(s => <span key={s} className="badge badge-blue">{s}</span>) : <p>—</p>}
              </div>
            </div>
            <div className="detail-item">
              <label>Resume</label>
              {profile.resumeLink ? <a href={profile.resumeLink} className="link" target="_blank" rel="noreferrer">View Resume ↗</a> : <p>—</p>}
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <Link to="/student/jobs" className="btn btn-primary">Browse Jobs →</Link>
            <Link to="/student/applied" className="btn btn-secondary">Applied Jobs</Link>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="card mb-4">
            <p className="section-title">Personal Details</p>
            <div className="form-row">
              <div className="form-group"><label>Mobile</label><input value={form.mobile || ''} onChange={e => set('mobile', e.target.value)} /></div>
              <div className="form-group"><label>Age</label><input type="number" value={form.age || ''} onChange={e => set('age', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Sex</label><select value={form.sex || ''} onChange={e => set('sex', e.target.value)}>
                <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
              </select></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" value={form.dob ? form.dob.split('T')[0] : ''} onChange={e => set('dob', e.target.value)} /></div>
            </div>
            <div className="form-group"><label>Address</label><textarea value={form.address || ''} onChange={e => set('address', e.target.value)} rows={2} /></div>
            <div className="form-row">
              <div className="form-group"><label>City</label><input value={form.city || ''} onChange={e => set('city', e.target.value)} /></div>
              <div className="form-group"><label>State</label><input value={form.state || ''} onChange={e => set('state', e.target.value)} /></div>
            </div>
          </div>
          <div className="card mb-4">
            <p className="section-title">Academic Details</p>
            <div className="form-group"><label>College</label><input value={form.college || ''} onChange={e => set('college', e.target.value)} /></div>
            <div className="form-row">
              <div className="form-group"><label>Degree</label><input value={form.degree || ''} onChange={e => set('degree', e.target.value)} /></div>
              <div className="form-group"><label>Branch</label><input value={form.branch || ''} onChange={e => set('branch', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>CGPA</label><input type="number" step="0.01" value={form.cgpa || ''} onChange={e => set('cgpa', e.target.value)} /></div>
              <div className="form-group"><label>Passing Year</label><input type="number" value={form.passingYear || ''} onChange={e => set('passingYear', e.target.value)} /></div>
            </div>
            <div className="form-group"><label>Roll Number</label><input value={form.rollNumber || ''} onChange={e => set('rollNumber', e.target.value)} /></div>
          </div>
          <div className="card mb-4">
            <p className="section-title">Skills & Resume</p>
            <div className="form-group"><label>Skills (comma separated)</label>
              <input value={Array.isArray(form.skills) ? form.skills.join(', ') : form.skills || ''} onChange={e => set('skills', e.target.value)} />
            </div>
            <div className="form-group"><label>Resume Link</label><input value={form.resumeLink || ''} onChange={e => set('resumeLink', e.target.value)} /></div>
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      )}
    </div>
  );
}