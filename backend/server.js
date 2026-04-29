const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS — allow both local dev and production frontend ──
const allowedOrigins = [
  'http://localhost:3000',
  'https://customer-dashboard-frontend-xqp9.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// ─── In-Memory Storage ────────────────────────────────────
let customers = [];

// ─── Health Check ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Customer Management API is running.' });
});

// ─── POST /customers ──────────────────────────────────────
app.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are all required.' });
  }

  const newCustomer = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// ─── GET /customers ───────────────────────────────────────
app.get('/customers', (req, res) => {
  res.json(customers);
});

// ─── DELETE /customers/:id ────────────────────────────────
app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;

  const exists = customers.find(c => c.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Customer not found.' });
  }

  customers = customers.filter(c => c.id !== id);
  res.json({ message: `Customer ${id} deleted successfully.` });
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});