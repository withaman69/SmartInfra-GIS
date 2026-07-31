# SmartInfra GIS Platform

A full-stack infrastructure management system with a GIS-oriented dashboard, built with React, TypeScript, Node.js, PostgreSQL, and Prisma. It helps municipal teams track infrastructure assets, maintenance workflows, and citizen complaints from a single interface.

**Status:** Active development — see [Roadmap](#roadmap--status) below for what's built vs. planned.

---

## Why I Built This

I'm a Civil Engineering student, and most infrastructure-management tools I looked at either ignored the spatial dimension of asset data entirely or treated it as an afterthought. SmartInfra started as an attempt to combine real spatial querying (via PostGIS) with practical workflow tooling — maintenance tickets, complaint tracking, engineer assignment — that municipal teams actually need day to day.

---

## Screenshots


<img width="1920" height="1080" alt="Screenshot 2026-07-31 185506" src="https://github.com/user-attachments/assets/feaac894-04d9-4659-87ac-ad6991f13eb2" />
<img width="1920" height="1080" alt="Screenshot 2026-07-31 190048" src="https://github.com/user-attachments/assets/66511adb-57dc-478d-ac57-c9b75a2dfb61" />
<img width="1920" height="1080" alt="Screenshot 2026-07-31 185613" src="https://github.com/user-attachments/assets/a35670fa-f824-46a5-a292-1c97c8ef0409" />

---

## Features

**Authentication & Access Control**
JWT-based auth with role-based access for Admin, Engineer, and Citizen roles.

**Asset Management**
Create, update, and track infrastructure assets, including location, category, and status. Health-score tracking with historical timeline.

**Maintenance Workflow**
Ticket creation, engineer assignment, status tracking, and maintenance logs.

**Complaint Management**
Citizen-submitted complaints, assignment to engineers, resolution tracking, and a full activity timeline.

**Notifications**
Real-time updates for complaint, ticket, and asset changes.

**Role-Specific Dashboards**
Separate views for Admin (system-wide stats), Engineer (assigned work), and Citizen (their own complaints).

---

## Roadmap / Status

| Area | Status |
|---|---|
| Core CRUD (assets, tickets, complaints) | ✅ Built |
| Auth & role-based access | ✅ Built |
| Notifications | ✅ Built |
| Real PostGIS geometry columns & spatial queries (`ST_Intersects`, `ST_DWithin`, etc.) | 🚧 In progress — currently using plain lat/lng fields, migrating to native PostGIS geometry types |
| Interactive map view (Leaflet/MapLibre) rendering spatial query results | ✅ Built  |
| Automated tests | 🚧 Planned |

I'm being upfront here: the "GIS" in the name currently reflects the domain and long-term direction more than the current data layer. The PostGIS migration is the active next milestone.

---

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, TypeScript
**Database:** PostgreSQL, Prisma ORM (PostGIS integration in progress — see Roadmap)
**Auth:** JWT, bcrypt

---

## Project Structure

```
smartinfra-gis/
├── client/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── routes/
│       ├── api/
│       └── context/
├── server/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── middleware/
│       ├── utils/
│       └── prisma/
└── README.md
```

---

## Database Models

- **User** — auth, roles, profile
- **Asset** — infrastructure assets, health monitoring, location data
- **Ticket** — maintenance workflow, engineer assignment
- **Complaint** — complaint lifecycle, assignment, resolution
- **MaintenanceLog** — maintenance records, audit history
- **ComplaintTimeline** — complaint activity tracking
- **Notification** — user notifications

---

## Installation

### Clone

```bash
git clone https://github.com/withaman69/SmartInfra-GIS.git
cd SmartInfra-GIS
```

### Backend

```bash
cd server
npm install
```

Create a `.env` file (never commit this file):

```env
DATABASE_URL="postgresql://username:password@localhost:5432/smartinfra_gis"
JWT_SECRET="your_secret_key"
PORT=5000
```

```bash
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Main API Routes

**Auth**
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

**Assets**
```
GET    /api/assets
GET    /api/assets/:id
POST   /api/assets
PUT    /api/assets/:id
DELETE /api/assets/:id
```

**Tickets**
```
GET   /api/tickets
POST  /api/tickets
PATCH /api/tickets/:id
```

**Complaints**
```
GET   /api/complaints
POST  /api/complaints
PATCH /api/complaints/:id/assign
PATCH /api/complaints/:id/resolve
```

**Maintenance Logs**
```
GET  /api/maintenance-logs
POST /api/maintenance-logs
```

---

## Developer

**Aman Kumar Singh** — Civil Engineering, NIT Goa
Building toward a PostGIS-based spatial data layer for this project as part of open-source contribution work with OSGeo (PostGIS/pgRouting).

---

## License

For educational, research, and portfolio purposes.
