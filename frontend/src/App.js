import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import './App.css';

// ─── Base URL ─────────────────────────────────────────────
const API_BASE = 'http://localhost:5000';

const App = () => {

  // ─── State ──────────────────────────────────────────────
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [appError, setAppError]   = useState('');

  // ─── Fetch All Customers ─────────────────────────────────
  const fetchCustomers = async () => {
    setLoading(true);
    setAppError('');

    try {
      const response = await axios.get(`${API_BASE}/customers`);
      setCustomers(response.data);
    } catch (err) {
      setAppError('Failed to load customers. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete a Customer ───────────────────────────────────
  const handleDelete = async (id) => {
    // Optimistic UI — remove from state immediately
    const previous = customers;
    setCustomers(customers.filter(c => c.id !== id));

    try {
      await axios.delete(`${API_BASE}/customers/${id}`);
    } catch (err) {
      // Rollback if delete fails
      setCustomers(previous);
      setAppError('Failed to delete customer. Please try again.');
    }
  };

  // ─── Fetch on Mount ──────────────────────────────────────
  useEffect(() => {
    fetchCustomers();
  }, []);

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="app-container">

      {/* Navbar */}
      <Navbar />

      <div className="main-content">

        {/* Global Error Banner */}
        {appError && (
          <div className="app-error">
            {appError}
            <button
              className="app-error-close"
              onClick={() => setAppError('')}
            >
              ✕
            </button>
          </div>
        )}

        {/* Add Customer Form */}
        <CustomerForm onCustomerAdded={fetchCustomers} />

        {/* Customer Table */}
        <CustomerTable
          customers={customers}
          onDelete={handleDelete}
          loading={loading}
        />

      </div>
    </div>
  );
};

export default App;