import React, { useState } from 'react';


const ResponseForm = ({ onUpdateResponse }) => {
  const [form, setForm] = useState({
    inviteeId: '',
    response: 'pending',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateResponse(form.inviteeId, form.response);
      alert('Response updated successfully!');
      setForm({
        inviteeId: '',
        response: 'pending',
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-card">
      <h3>Update Invitee Response</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Invitee ID</label>
          <input
            name="inviteeId"
            value={form.inviteeId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Response</label>
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
          Update Response
        </button>
      </form>
    </div>
  );
};

export default ResponseForm;