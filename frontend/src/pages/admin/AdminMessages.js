import React, { useState, useEffect } from 'react';
import API from '../../utils/api';
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { API.get('/contact').then(res => setMessages(res.data)); }, []);

  const handleSelect = async (msg) => {
    setSelected(msg);
    if (!msg.isRead) {
      await API.put(`/contact/${msg._id}/read`);
      setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Messages</h1>
        <p>{messages.filter(m => !m.isRead).length} unread messages</p>
      </div>

      <div className="messages-layout">
        <div className="messages-list">
          {messages.length === 0 && <div className="no-data">No messages yet</div>}
          {messages.map(m => (
            <div key={m._id}
              className={`msg-item ${!m.isRead ? 'unread' : ''} ${selected?._id === m._id ? 'selected' : ''}`}
              onClick={() => handleSelect(m)}
            >
              <div className="msg-top">
                <strong>{m.name}</strong>
                <span>{new Date(m.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              <p className="msg-email">{m.email}</p>
              <p className="msg-preview">{m.message.slice(0, 55)}...</p>
              {!m.isRead && <span className="unread-dot" />}
            </div>
          ))}
        </div>

        <div className="msg-detail">
          {selected ? (
            <>
              <div className="detail-header">
                <h3>{selected.name}</h3>
                <span>{new Date(selected.createdAt).toLocaleString('en-IN')}</span>
              </div>
              <div className="detail-meta">
                <p>📧 {selected.email}</p>
                {selected.phone && <p>📞 {selected.phone}</p>}
              </div>
              <div className="detail-body">{selected.message}</div>
              <a href={`mailto:${selected.email}`} className="btn-reply">📧 Reply via Email</a>
            </>
          ) : (
            <div className="no-selected"><span>✉️</span><p>Select a message to read</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
