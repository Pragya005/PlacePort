import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', description: '', location: '', salary: '', jobType: 'Full-Time',
    skills: '', deadline: '', openings: 1,
    minCGPA: '', branches: '', passingYear: ''
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setMsg(''); setLoading(true);
    try {
      await API.post('/company/jobs', {
        ...form,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()) : [],
        eligibility: {
          minCGPA: form.minCGPA || 0,
          branches: form.branches ? form.branches.split(',').map(b => b.trim()) : [],
          passingYear: form.passingYear || null
        }
      });
      setMsg('success');
      setTimeout(() => navigate('/company/jobs'), 1500);
    } catch (err) { setMsg(err.response?.data?.message || 'Failed to post job'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-header"><h1>Post a Job</h1><p>Create a new job listing for students</p></div>
      {msg === 'success' && <div className="alert alert-success">Job posted successfully! Redirecting...</div>}
      {msg && msg !== 'success' && <div className="alert alert-error">{msg}</div>}
      <div className="card" style={{ maxWidth: 680 }}>
        <form onSubmit={handleSubmit}>
          <p className="section-title">Job Details</p>
          <div className="form-group"><label>Job Title *</label><input placeholder="e.g. Software Engineer, Data Analyst" value={form.title} onChange={e => set('title', e.target.value)} required /></div>
          <div className="form-group"><label>Job Description *</label><textarea placeholder="Describe the role, responsibilities, requirements..." value={form.description} onChange={e => set('description', e.target.value)} rows={5} required /></div>
          <div className="form-row">
            <div className="form-group"><label>Location *</label><input placeholder="City or Remote" value={form.location} onChange={e => set('location', e.target.value)} required /></div>
            <div className="form-group"><label>Job Type</label>
              <select value={form.jobType} onChange={e => set('jobType', e.target.value)}>
                <option>Full-Time</option><option>Internship</option><option>Part-Time</option><option>Contract</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Salary / Stipend</label><input placeholder="e.g. 8 LPA or 25,000/month" value={form.salary} onChange={e => set('salary', e.target.value)} /></div>
            <div className="form-group"><label>No. of Openings</label><input type="number" min="1" value={form.openings} onChange={e => set('openings', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Required Skills (comma separated)</label><input placeholder="React, Node.js, SQL, Python" value={form.skills} onChange={e => set('skills', e.target.value)} /></div>
          <div className="form-group"><label>Application Deadline</label><input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} /></div>

          <div className="divider" />
          <p className="section-title">Eligibility Criteria</p>
          <div className="form-row">
            <div className="form-group"><label>Minimum CGPA</label><input type="number" step="0.1" min="0" max="10" placeholder="e.g. 7.0" value={form.minCGPA} onChange={e => set('minCGPA', e.target.value)} /></div>
            <div className="form-group"><label>Passing Year</label><input type="number" placeholder="e.g. 2025" value={form.passingYear} onChange={e => set('passingYear', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Eligible Branches (comma separated, leave blank for all)</label><input placeholder="CSE, ECE, IT, ME" value={form.branches} onChange={e => set('branches', e.target.value)} /></div>

          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Posting...' : 'Post Job'}</button>
        </form>
      </div>
    </div>
  );
}