# Customer Management Dashboard

A simple full-stack web application to manage customers.
Built with React.js (frontend) and Node.js + Express (backend).
Data is stored in an in-memory array — no database required.


##  Project Structure

customer-dashboard/
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── CustomerForm.jsx
    │   │   └── CustomerTable.jsx
    │   ├── App.js
    │   └── App.css
    └── package.json


##  Features

- Add a new customer (Name, Email, Phone)
- View all customers in a table
- Delete a customer with one click
- Input validation on both frontend and backend
- Clean, responsive UI


### Prerequisites
- Node.js v16+ installed
- npm installed

### 1. Clone the repository
git clone https://github.com/champ-sk/customer-dashboard.git
cd customer-dashboard

### 2. Backend Setup
cd backend
npm install
npm start
→ Server runs on http://localhost:5000

### 3. Frontend Setup
Open a new terminal tab:
cd frontend
npm install
npm start
→ App runs on http://localhost:3000

---

##  API Endpoints

| Method | Endpoint             | Description            | Response                  |
|--------|----------------------|------------------------|---------------------------|
| GET    | /customers           | Get all customers      | Array of customer objects |
| POST   | /customers           | Add a new customer     | New customer object       |
| DELETE | /customers/:id       | Delete customer by ID  | Success message           |

### Request Body (POST /customers)
{
  "name": "Shubham Kumar",
  "email": "shubhamkumar3183@gmail.com",
  "phone": "8193834848"
}

---

##  Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React.js, Axios     |
| Backend  | Node.js, Express    |
| Storage  | In-memory array     |
| Styling  | Plain CSS           |

---

##  Assumptions

- Data resets every time the backend server restarts (by design)
- No authentication or authorization required
- Phone number is stored as a string to support formats like +91-XXXXXXXXXX

## Components

| Component     | Description                                          |
|---------------|------------------------------------------------------|
| Navbar        | App title bar, sticky at top                         |
| CustomerForm  | Form with validation, sends POST to backend          |
| CustomerTable | Displays all customers, alternating rows, delete btn |


##  App Flow

1. On load → App.js calls GET /customers → table renders
2. User fills form → CustomerForm calls POST /customers
3. On success → fetchCustomers() re-fetches → table updates
4. User clicks Delete → DELETE /customers/:id is called
5. Table updates instantly (optimistic UI)
6. If backend is down → global error banner appears