# 🏗️ SmartInfra GIS Platform

A Full-Stack GIS-Based Infrastructure Management System built using React, TypeScript, Node.js, PostgreSQL, Prisma, and PostGIS.

SmartInfra helps government agencies, municipalities, and organizations manage infrastructure assets, maintenance operations, complaints, and service workflows through an interactive GIS dashboard.

---

# 🚀 Features

## 👤 Authentication & Authorization

- JWT Authentication
- Secure Login/Register
- Role-Based Access Control

### Roles

- Admin
- Engineer
- Citizen

---

## 🗺️ GIS Asset Management

- Create Assets
- Update Assets
- Delete Assets
- View Asset Details
- Location Tracking
- Asset Categorization
- Asset Status Monitoring

---

## 📊 Asset Health Monitoring

- Health Score Tracking
- Health History Timeline
- Maintenance History
- Asset Activity Timeline

---

## 🛠️ Maintenance Management

- Create Maintenance Tickets
- Assign Engineers
- Update Ticket Status
- Ticket Tracking
- Maintenance Logs

---

## 📝 Complaint Management

- Create Complaints
- Complaint Tracking
- Assign Complaint to Engineer
- Resolve Complaints
- Complaint Timeline

---

## 🔔 Notifications

- Real-Time Notification System
- Complaint Updates
- Ticket Updates
- Asset Updates

---

## 📈 Dashboard

### Admin Dashboard

- Asset Overview
- Complaint Overview
- Maintenance Overview
- System Statistics

### Engineer Dashboard

- Assigned Complaints
- Assigned Tickets
- Asset Monitoring

### Citizen Dashboard

- Complaint Tracking
- Complaint Status Monitoring

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM
- PostGIS

## Authentication

- JWT
- bcrypt

---

# 📂 Project Structure

```bash
smartinfra-gis/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── api/
│   │   └── context/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── prisma/
│
└── README.md
```

---

# 🗄️ Database Models

## User

- Authentication
- Roles
- Profile Management

## Asset

- Infrastructure Assets
- Health Monitoring
- GIS Coordinates

## Ticket

- Maintenance Workflow
- Engineer Assignment

## Complaint

- Complaint Lifecycle
- Engineer Assignment
- Resolution Tracking

## MaintenanceLog

- Maintenance Records
- Audit History

## ComplaintTimeline

- Complaint Activity Tracking

## Notification

- User Notifications

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/smartinfra-gis.git
```

```bash
cd smartinfra-gis
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create .env file

```env
DATABASE_URL="postgresql://username:password@localhost:5432/smartinfra_gis"

JWT_SECRET="your_secret_key"

PORT=5000
```

Run Prisma

```bash
npx prisma generate
```

```bash
npx prisma db push
```

Start Server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start frontend

```bash
npm run dev
```

---

# 🔐 Environment Variables

## Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

---

# 📡 Main API Routes

## Auth

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

## Assets

```http
GET /api/assets
GET /api/assets/:id
POST /api/assets
PUT /api/assets/:id
DELETE /api/assets/:id
```

## Tickets

```http
GET /api/tickets
POST /api/tickets
PATCH /api/tickets/:id
```

## Complaints

```http
GET /api/complaints
POST /api/complaints
PATCH /api/complaints/:id/assign
PATCH /api/complaints/:id/resolve
```

## Maintenance Logs

```http
GET /api/maintenance-logs
POST /api/maintenance-logs
```

---

# 🎯 Key Highlights

- GIS-Based Infrastructure Monitoring
- Role-Based Access Control
- Complaint Lifecycle Management
- Maintenance Workflow Automation
- Infrastructure Health Tracking
- PostgreSQL + PostGIS Integration
- Full TypeScript Stack
- Production Ready Architecture

---

# 👨‍💻 Developer

**Aman Kumar Singh**
Civil Engineering Student, NIT Goa

---

# 📄 License

This project is for educational, research, and portfolio purposes.