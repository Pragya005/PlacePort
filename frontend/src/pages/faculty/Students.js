import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

export default function FacultyStudents() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { API.get('/faculty/students').then(r => { setStudents(r.data); setLoading(false); }); }, []);

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.branch?.toLowerCase().includes(search.toLowerCase())
  );

  const StudentModal = ({ student }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
      <div style={{ background: 'var(--surface)', width: 560, maxHeight: '85vh', overflowY: 'auto', padding: 32, borderRadius: 12, boxShadow: 'var(--shadow-md)' }} onClick={e => e.stopPropagation()}>
        <div className="flex-between mb-4">
          <h2 style={{ fontSize: 18 }}>{student.name}</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>✕ Close</button>
        </div>
        <div className="detail-grid">
          <div className="detail-item"><label>Email</label><p>{student.email}</p></div>
          <div className="detail-item"><label>Mobile</label><p>{student.mobile || '—'}</p></div>
          <div className="detail-item"><label>College</label><p>{student.college || '—'}</p></div>
          <div className="detail-item"><label>Branch</label><p>{student.branch || '—'}</p></div>
          <div className="detail-item"><label>Degree</label><p>{student.degree || '—'}</p></div>
          <div className="detail-item"><label>CGPA</label><p>{student.cgpa || '—'}</p></div>
          <div className="detail-item"><label>Passing Year</label><p>{student.passingYear || '—'}</p></div>
          <div className="detail-item"><label>Roll No.</label><p>{student.rollNumber || '—'}</p></div>
          <div className="detail-item"><label>City</label><p>{student.city || '—'}</p></div>
          <div className="detail-item"><label>State</label><p>{student.state || '—'}</p></div>
        </div>
        <div className="divider" />
        <p className="section-title">Skills</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {student.skills?.length ? student.skills.map(s => <span key={s} className="badge badge-blue">{s}</span>) : <span className="text-secondary">—</span>}
        </div>
        <div className="detail-item">
          <label>Resume</label>
          {student.resumeLink ? <a href={student.resumeLink} className="link" target="_blank" rel="noreferrer">View Resume ↗</a> : <p>—</p>}
        </div>
        <div className="detail-item mt-4">
          <label>Applications</label><p>{student.appliedJobs?.length || 0} jobs applied</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header"><h1>All Students</h1><p>{students.length} students registered</p></div>
      <div className="card">
        <div style={{ marginBottom: 16 }}>
          <input placeholder="Search by name, email or branch..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 340 }} />
        </div>
        {loading ? <p>Loading...</p> : filtered.length === 0 ? <div className="empty-state"><p>No students found</p></div> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>College</th><th>Branch</th><th>CGPA</th><th>Applications</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s._id}>
                    <td><strong>{s.name}</strong></td>
                    <td className="text-secondary">{s.email}</td>
                    <td>{s.college || '—'}</td>
                    <td>{s.branch || '—'}</td>
                    <td>{s.cgpa || '—'}</td>
                    <td>{s.appliedJobs?.length || 0}</td>
                    <td><span className={`badge ${s.profileComplete ? 'badge-green' : 'badge-yellow'}`}>{s.profileComplete ? 'Complete' : 'Pending'}</span></td>
                    <td><button className="btn btn-secondary btn-sm" onClick={() => setSelected(s)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selected && <StudentModal student={selected} />}
    </div>
  );
}