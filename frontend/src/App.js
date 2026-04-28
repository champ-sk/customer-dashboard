import React from 'react';
import Navbar from './components/Navbar';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import './App.css';

// ─── Temporary mock data for visual testing ───────────────
const mockCustomers = [
  // { id: '1', name: 'Alice Smith',  email: 'alice@example.com', phone: '9876543210' },
  // { id: '2', name: 'Bob Jones',    email: 'bob@example.com',   phone: '9123456789' },
  // { id: '3', name: 'Carol White',  email: 'carol@example.com', phone: '9988776655' },
];

const App = () => {
  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        <CustomerForm onCustomerAdded={() => console.log('Customer added!')} />
        <CustomerTable
          customers={mockCustomers}
          onDelete={(id) => console.log('Delete clicked for id:', id)}
          loading={false}
        />
      </div>

    </div>
  );
};

export default App;