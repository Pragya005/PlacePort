import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';

export default function RegisterCompany() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', location: '', gstNumber: '', ceoName: '', website: '', industry: '', description: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setMsg(''); setLoading(true);
    try {
      await API.post('/faculty/register-company', form);
      setMsg('success');
      setTimeout(() => navigate('/faculty/companies'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to register company');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-header"><h1>Register Company</h1><p>Add a new company to the placement portal</p></div>
      {msg === 'success' && <div className="alert alert-success">Company registered successfully! Redirecting...</div>}
      {msg && msg !== 'success' && <div className="alert alert-error">{msg}</div>}
      <div className="card" style={{ maxWidth: 640 }}>
        <form onSubmit={handleSubmit}>
          <p className="section-title">Company Information</p>
          <div className="form-group"><label>Company Name *</label><input placeholder="e.g. TCS, Infosys" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
          <div className="form-row">
            <div className="form-group"><label>Email *</label><input type="email" placeholder="company@email.com" value={form.email} onChange={e => set('email', e.target.value)} required /></div>
            <div className="form-group"><label>Login Password *</label><input type="password" placeholder="Set login password" value={form.password} onChange={e => set('password', e.target.value)} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Phone</label><input placeholder="Contact number" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            <div className="form-group"><label>Location</label><input placeholder="City, State" value={form.location} onChange={e => set('location', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Industry</label><input placeholder="e.g. IT, Finance, Core" value={form.industry} onChange={e => set('industry', e.target.value)} /></div>
            <div className="form-group"><label>CEO / Head Name</label><input placeholder="Name of CEO or head" value={form.ceoName} onChange={e => set('ceoName', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>GST Number</label><input placeholder="15-digit GST no." value={form.gstNumber} onChange={e => set('gstNumber', e.target.value)} /></div>
            <div className="form-group"><label>Website</label><input placeholder="https://company.com" value={form.website} onChange={e => set('website', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>About Company</label><textarea placeholder="Brief description about the company..." value={form.description} onChange={e => set('description', e.target.value)} rows={3} /></div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Registering...' : 'Register Company'}</button>
        </form>
      </div>
    </div>
  );
}