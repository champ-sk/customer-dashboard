const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// ─── Middleware ───────────────────────────────────────────
app.use(cors());          
app.use(express.json());   

// ─── In-Memory Storage ────────────────────────────────────
let customers = [];      

// ─── Health Check Route ───────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Customer Management API is running.' });
});

// ─── POST /customers ──────────────────────────────────────
app.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;

  // Validate: all fields are required
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are all required.' });
  }

  // Build new customer object
  const newCustomer = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };

  // Add to in-memory array
  customers.push(newCustomer);

  // Return the new customer with 201 Created
  res.status(201).json(newCustomer);
});

// ─── GET /customers ───────────────────────────────────────
app.get('/customers', (req, res) => {
  res.json(customers);
});

// ─── DELETE /customers/:id ────────────────────────────────
app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;

  // Check if customer exists
  const exists = customers.find(c => c.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Customer not found.' });
  }

  // Remove customer from array
  customers = customers.filter(c => c.id !== id);

  res.json({ message: `Customer ${id} deleted successfully.` });
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});