import React, { useState } from 'react';
import axios from 'axios';
import './CustomerForm.css';

const CustomerForm = ({ onCustomerAdded }) => {
  // ─── Local State ──────────────────────────────────────────
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  // ─── Validation ───────────────────────────────────────────
  const validate = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required.');
      return false;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Basic phone: at least 7 digits
    const phoneRegex = /^\+?[\d\s\-]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number.');
      return false;
    }
    return true;
  };

  // ─── Submit Handler ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/customers', {
        name:  name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      // Clear form on success
      setName('');
      setEmail('');
      setPhone('');

      // Tell App.js to re-fetch the customer list
      onCustomerAdded();

    } catch (err) {
      setError(
        err.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="form-card">
      <h2 className="form-title">Add New Customer</h2>

      {/* Error Message */}
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Alice Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. alice@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Customer'}
        </button>

      </form>
    </div>
  );
};

export default CustomerForm;