import React, { useState } from 'react';


const InviteeForm = ({ eventId, onAddInvitee }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    response: 'pending',
    eventId: eventId,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddInvitee(form);
      alert('Invitee added successfully!');
      setForm({
        name: '',
        email: '',
        response: 'pending',
        eventId: eventId,
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-card">
      <h3>Add New Invitee</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Response</label>
          <select
            name="response"
            value={form.response}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Add Invitee
        </button>
      </form>
    </div>
  );
};

export default InviteeForm;