import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

export default function FacultyCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/faculty/companies').then(r => { setCompanies(r.data); setLoading(false); }); }, []);

  return (
    <div>
      <div className="page-header"><h1>Registered Companies</h1><p>{companies.length} companies onboarded</p></div>
      {loading ? <p>Loading...</p> : companies.length === 0 ? (
        <div className="empty-state"><div className="icon">▣</div><p>No companies registered yet</p></div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Company</th><th>Email</th><th>Industry</th><th>Location</th><th>CEO / Head</th><th>GST No.</th><th>Registered By</th></tr></thead>
              <tbody>
                {companies.map(c => (
                  <tr key={c._id}>
                    <td><strong>{c.name}</strong></td>
                    <td className="text-secondary">{c.email}</td>
                    <td>{c.industry || '—'}</td>
                    <td>{c.location || '—'}</td>
                    <td>{c.ceoName || '—'}</td>
                    <td><span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{c.gstNumber || '—'}</span></td>
                    <td className="text-secondary">{c.registeredBy?.name || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}