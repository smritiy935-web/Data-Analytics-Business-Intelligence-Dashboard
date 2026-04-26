# InsightFlow — Deep Business Intelligence & Data Analytics

## 🌌 Overview

**InsightFlow** is a premium, full-stack Business Intelligence (BI) platform designed for the modern enterprise. Built with the **MERN stack**, it transforms raw data into meaningful, aesthetic visualizations, empowering teams to make data-driven decisions with confidence.

With a focus on **Silent Luxury** design, the interface is glassmorphic, responsive, and meticulously crafted to provide a high-performance analytics experience.

---

## 💎 Core Features

- 🔐 **Multi-Role Authentication**: Secure login system with Admin and User partitions.
- 📊 **Dynamic KPI Ecosystem**: Real-time monitoring of sales, trends, and user growth.
- 📁 **Seamless Data Ingestion**: Bulk CSV uploads with automated parsing and validation.
- ⚡ **Prophetic Analytics**: Interactive charts powered by Recharts with smooth transitions.
- 📡 **Live Sync**: Socket.io integration ensuring data updates reflect instantly across all clients.
- 💅 **Luxury UI/UX**: A dark-themed, glassmorphic design system using Tailwind CSS & Framer Motion.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Visualization** | Recharts, Chart.js |
| **Real-time** | Socket.io |
| **Security** | JWT, Bcrypt |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local instance or Atlas URI

### 2. Environment Configuration
Create a `.env` file in the `/server` directory:
```env
PORT=5081
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_ultra_secret_key
```

### 3. Installation

**Backend Setup:**
```bash
cd server
npm install
npm run dev
```

**Frontend Setup:**
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Administrative Access

To access the administrative dashboard, use the following default credentials:

- **Email:** `admin@system.io`
- **Password:** `admin123`

> [!IMPORTANT]
> If the admin user does not exist in your database, you must seed the database first by visiting:
> `http://localhost:4000/api/auth/seed` (assuming your backend is running on port 4000).

---

## 📂 CSV Schema Definition
To maintain data integrity, please ensure your CSV files follow this structure:
`Category, Label, Value, Date, Type`

*Example:* `Tech, MacBook Pro, 2400, 2024-04-15, sales`

---

<p align="center"><i>SMRITI YADAV - MERN STACK DEVELOPER</i></p>

