import React from 'react';
import './CustomerTable.css';

const CustomerTable = ({ customers, onDelete, loading }) => {

  // ─── Loading State ────────────────────────────────────────
  if (loading) {
    return (
      <div className="table-card">
        <div className="table-header-row">
          <h2 className="table-title">All Customers</h2>
        </div>
        <div className="table-empty">
          <div className="table-empty-icon">⏳</div>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  // ─── Empty State ──────────────────────────────────────────
  if (!customers || customers.length === 0) {
    return (
      <div className="table-card">
        <div className="table-header-row">
          <h2 className="table-title">All Customers</h2>
        </div>
        <div className="table-empty">
          <div className="table-empty-icon">👤</div>
          <p>No customers found. Add one using the form above.</p>
        </div>
      </div>
    );
  }

  // ─── Table ────────────────────────────────────────────────
  return (
    <div className="table-card">
      <div className="table-header-row">
        <h2 className="table-title">
          All Customers
          <span className="table-count">{customers.length}</span>
        </h2>
      </div>

      <div className="table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={index % 2 === 0 ? 'row-even' : 'row-odd'}
              >
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;