# 🏍️ Himalayan Cruiser — Bike Booking System
### Dehradun, Uttarakhand

Full-stack bike rental website — **one frontend, one backend**.

---

## 🚀 Quick Start

### 1. Start MongoDB
```bash
mongod
```

### 2. Start Backend
```bash
cd backend
npm install
npm run seed      # Creates admin + 6 sample bikes
npm start         # Runs on http://localhost:5000
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm start         # Runs on http://localhost:3000
```

---

[//]: # (🔐 Admin login: check with project owner for credentials)

## 🌐 User Pages (localhost:3000)
| Page        | URL           |
|-------------|---------------|
| Home        | /             |
| Our Bikes   | /bikes        |
| Book a Bike | /book/:id     |
| My Bookings | /my-bookings  |
| About       | /about        |
| Contact     | /contact      |
| Login       | /login        |
| Register    | /register     |

## 🛠 Admin Pages (localhost:3000/admin)
| Page       | URL               |
|------------|-------------------|
| Dashboard  | /admin            |
| Bikes      | /admin/bikes      |
| Bookings   | /admin/bookings   |
| Messages   | /admin/messages   |

---

## 📁 Structure
```
himalayan-cruiser/
├── backend/                  → Node.js + Express API
│   ├── models/               → MongoDB schemas
│   ├── routes/               → API routes
│   ├── middleware/auth.js    → JWT middleware
│   ├── seed.js               → DB seeder
│   └── server.js
└── frontend/                 → React app (users + admin)
    └── src/
        ├── components/
        │   ├── Navbar/
        │   ├── Footer/
        │   ├── BikeCard/
        │   └── Sidebar/      → Admin sidebar
        ├── pages/
        │   ├── Home, Bikes, BookBike, MyBookings
        │   ├── Login, Register, Contact, About
        │   └── admin/        → Admin pages
        │       ├── AdminDashboard
        │       ├── AdminBikes
        │       ├── AdminBookings
        │       └── AdminMessages
        ├── context/AuthContext.js
        └── utils/api.js
```
