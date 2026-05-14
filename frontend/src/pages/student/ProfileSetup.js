import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

export default function ProfileSetup() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: '', address: '', age: '', sex: '', dob: '', city: '', state: '',
    college: '', branch: '', degree: '', cgpa: '', passingYear: '', rollNumber: '',
    skills: '', resumeLink: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await API.put('/student/profile', form);
      setUser({ ...user, profileComplete: true });
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: 40 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 40, width: '100%', maxWidth: 680, margin: '0 auto', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Complete your profile</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 28 }}>This information helps companies find and evaluate you</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <p className="section-title">Personal Information</p>
          <div className="form-row">
            <div className="form-group"><label>Mobile</label><input placeholder="10-digit number" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group"><label>Age</label><input type="number" placeholder="Age" value={form.age} onChange={e => set('age', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Sex</label>
              <select value={form.sex} onChange={e => set('sex', e.target.value)}>
                <option value="">Select</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="form-group"><label>Date of Birth</label><input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Address</label><textarea placeholder="Full address" value={form.address} onChange={e => set('address', e.target.value)} rows={2} /></div>
          <div className="form-row">
            <div className="form-group"><label>City</label><input placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} /></div>
            <div className="form-group"><label>State</label><input placeholder="State" value={form.state} onChange={e => set('state', e.target.value)} /></div>
          </div>

          <div className="divider" />
          <p className="section-title">Academic Information</p>
          <div className="form-group"><label>College / University</label><input placeholder="Name of your institution" value={form.college} onChange={e => set('college', e.target.value)} /></div>
          <div className="form-row">
            <div className="form-group"><label>Degree</label><input placeholder="B.Tech / B.Sc etc." value={form.degree} onChange={e => set('degree', e.target.value)} /></div>
            <div className="form-group"><label>Branch</label><input placeholder="CSE / ECE etc." value={form.branch} onChange={e => set('branch', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>CGPA</label><input type="number" step="0.01" min="0" max="10" placeholder="e.g. 8.5" value={form.cgpa} onChange={e => set('cgpa', e.target.value)} /></div>
            <div className="form-group"><label>Passing Year</label><input type="number" placeholder="e.g. 2025" value={form.passingYear} onChange={e => set('passingYear', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Roll Number</label><input placeholder="College roll number" value={form.rollNumber} onChange={e => set('rollNumber', e.target.value)} /></div>

          <div className="divider" />
          <p className="section-title">Skills & Resume</p>
          <div className="form-group"><label>Skills (comma separated)</label><input placeholder="React, Node.js, Python, SQL" value={form.skills} onChange={e => set('skills', e.target.value)} /></div>
          <div className="form-group"><label>Resume Link</label><input placeholder="Google Drive / LinkedIn / Dropbox link" value={form.resumeLink} onChange={e => set('resumeLink', e.target.value)} /></div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? 'Saving...' : 'Save & Continue to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}