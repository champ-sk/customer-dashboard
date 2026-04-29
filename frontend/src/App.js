import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import './App.css';

const API_BASE = process.env.REACT_APP_API_BASE;

const App = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [appError, setAppError]   = useState('');

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

  const handleDelete = async (id) => {
    const previous = customers;
    setCustomers(customers.filter(c => c.id !== id));
    try {
      await axios.delete(`${API_BASE}/customers/${id}`);
    } catch (err) {
      setCustomers(previous);
      setAppError('Failed to delete customer. Please try again.');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">

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

        <CustomerForm onCustomerAdded={fetchCustomers} />
        <CustomerTable
          customers={customers}
          onDelete={handleDelete}
          loading={loading}
        />

      </div>

      {/* Footer */}
      <footer className="footer">
        Customer Management Dashboard &copy; {new Date().getFullYear()}
      </footer>

    </div>
  );
};

export default App;