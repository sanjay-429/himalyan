import React, { useState, useEffect } from 'react';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import './AdminBikes.css';

const empty = { name: '', brand: '', type: 'Adventure', cc: '', pricePerDay: '', description: '', image: '', features: '', isAvailable: true };

const AdminBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchBikes(); }, []);
  const fetchBikes = () => API.get('/bikes').then(res => setBikes(res.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      cc: Number(form.cc),
      pricePerDay: Number(form.pricePerDay),
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
    };
    try {
      if (editId) { await API.put(`/bikes/${editId}`, payload); toast.success('Bike updated!'); }
      else { await API.post('/bikes', payload); toast.success('Bike added!'); }
      setShowModal(false); setForm(empty); setEditId(null); fetchBikes();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleEdit = (bike) => {
    setForm({ ...bike, features: bike.features?.join(', ') || '' });
    setEditId(bike._id); setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this bike?')) return;
    await API.delete(`/bikes/${id}`);
    toast.success('Deleted'); fetchBikes();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Manage Bikes</h1>
          <p>Add, edit or remove bikes from your fleet</p>
        </div>
        <button className="btn-add" onClick={() => { setForm(empty); setEditId(null); setShowModal(true); }}>+ Add Bike</button>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Bike</th><th>Type</th><th>CC</th><th>Price/Day</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {bikes.map(b => (
              <tr key={b._id}>
                <td>
                  <div className="table-bike">
                    <div className="table-bike-img">
                      {b.image ? <img src={b.image} alt={b.name} /> : '🏍️'}
                    </div>
                    <div><strong>{b.name}</strong><p>{b.brand}</p></div>
                  </div>
                </td>
                <td><span className="type-tag">{b.type}</span></td>
                <td>{b.cc}cc</td>
                <td>₹{b.pricePerDay}</td>
                <td><span className={`status-tag ${b.isAvailable ? 'available' : 'unavailable'}`}>{b.isAvailable ? 'Available' : 'Booked'}</span></td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(b)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(b._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bikes.length === 0 && <div className="no-data">No bikes yet. Add your first bike!</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? 'Edit Bike' : 'Add New Bike'}</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group"><label>Bike Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div className="form-group"><label>Brand</label><input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    {['Adventure', 'Cruiser', 'Sport', 'Commuter'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>CC</label><input type="number" value={form.cc} onChange={e => setForm({...form, cc: e.target.value})} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Price Per Day (₹)</label><input type="number" value={form.pricePerDay} onChange={e => setForm({...form, pricePerDay: e.target.value})} required /></div>
                <div className="form-group">
                  <label>Available</label>
                  <select value={form.isAvailable} onChange={e => setForm({...form, isAvailable: e.target.value === 'true'})}>
                    <option value="true">Yes</option><option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Image URL</label><input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." /></div>
              <div className="form-group"><label>Features (comma separated)</label><input value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="ABS, GPS, USB Charging" /></div>
              <div className="form-group"><label>Description</label><textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea></div>
              <button type="submit" className="btn-submit">{editId ? 'Update Bike' : 'Add Bike'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBikes;
