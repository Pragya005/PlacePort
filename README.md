# PlacePort – College Placement Portal

A full-stack **College Placement Management System** built using the **MERN Stack**. The application streamlines campus recruitment by providing separate portals for **Students**, **Placement Cell Faculty**, and **Companies**.

---
Website hosted on - https://placeport-wggj.onrender.com

Images available on docker hub
docker.io/pragyavarshney/placementportal-frontend
docker.io/pragyavarshney/placementportal-backend

Database hosted on Mongodb and deployed using **github actions + render**

## Features

### Student
- Register and login securely
- Complete and update profile
- Browse available job opportunities
- Apply for jobs
- Track application status

### Placement Cell Faculty
- Secure faculty login
- View dashboard statistics
- Manage students
- Register companies
- View all jobs and applicants

### Company
- Login using credentials provided by faculty
- Manage company profile
- Post job opportunities
- View applicants
- Update recruitment status

---

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

### Containerization
- Docker
- Docker Compose

---

# Project Structure

```
PlacePort/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# Running Locally

## Prerequisites

- Node.js (v18 or later)
- npm
- MongoDB

---

## 1. Clone Repository

```bash
git clone <repository-url>
cd PlacePort
```

---

## 2. Configure Backend

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/placement_portal
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 4. Seed Faculty Accounts

```bash
npm run seed
```

Faculty accounts created:

| Email | Password |
|---------|----------|
| sanjeev.kumar@college.edu | faculty123 |
| priti.varshney@college.edu | faculty123 |

---

## 5. Start Backend

```bash
npm run dev
```

Backend:

```
http://localhost:5000
```

---

## 6. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 7. Start Frontend

```bash
npm start
```

Frontend:

```
http://localhost:3000
```

---

# Running with Docker

## Prerequisites

- Docker Desktop
- Docker Compose

---

## Configure Backend Environment

Update `.env`

```env
PORT=5000
MONGO_URI=mongodb://mongodb:27017/placement_portal
JWT_SECRET=your_secret_key
NODE_ENV=development
```

> **Note:** Inside Docker, MongoDB is accessed using the service name `mongodb`, not `localhost`.

---

## Build and Run

From the project root:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

---

## Stop Containers

```bash
docker compose down
```

---

## Remove Containers and Volumes

```bash
docker compose down -v
```

---

## Services

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| MongoDB | localhost:27017 |

---

## View Logs

```bash
docker compose logs
```

Backend logs

```bash
docker compose logs backend
```

Follow logs

```bash
docker compose logs -f backend
```

---

## MongoDB Shell

```bash
docker exec -it mongodb mongosh
```

Useful commands

```javascript
show dbs

use placement_portal

show collections

db.students.find().pretty()
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/student/register` |
| POST | `/api/auth/student/login` |
| POST | `/api/auth/faculty/login` |
| POST | `/api/auth/company/login` |
| GET | `/api/auth/me` |

---

## Student

| Method | Endpoint |
|---------|----------|
| GET | `/api/student/profile` |
| PUT | `/api/student/profile` |
| POST | `/api/student/apply/:jobId` |
| GET | `/api/student/applied-jobs` |

---

## Faculty

| Method | Endpoint |
|---------|----------|
| GET | `/api/faculty/stats` |
| GET | `/api/faculty/students` |
| GET | `/api/faculty/students/:id` |
| GET | `/api/faculty/jobs` |
| GET | `/api/faculty/companies` |
| POST | `/api/faculty/register-company` |

---

## Company

| Method | Endpoint |
|---------|----------|
| GET | `/api/company/profile` |
| PUT | `/api/company/profile` |
| POST | `/api/company/jobs` |
| GET | `/api/company/jobs` |
| PUT | `/api/company/jobs/:id/status` |
| PUT | `/api/company/jobs/:id/applicants/:sid` |

---

## Jobs

| Method | Endpoint |
|---------|----------|
| GET | `/api/jobs` |
| GET | `/api/jobs/:id` |

---

# Application Workflow

```
                Student
                    │
                    ▼
            Browse & Apply Jobs
                    │
                    ▼
          Backend (Express API)
                    │
                    ▼
              MongoDB Database
                    ▲
                    │
          Company Reviews Applications
                    ▲
                    │
      Placement Cell Manages Companies
```

---

# Docker Architecture

```
                Browser
                    │
                    ▼
        +-----------------------+
        | React Frontend        |
        | localhost:3000        |
        +-----------+-----------+
                    │
                    ▼
        +-----------------------+
        | Express Backend       |
        | localhost:5000        |
        +-----------+-----------+
                    │
                    ▼
        +-----------------------+
        | MongoDB               |
        | mongodb:27017         |
        +-----------------------+
```

---

# Why Docker?

Docker is used to containerize the application into separate services for the frontend, backend, and MongoDB database. This provides:

- Consistent development environment
- Simplified project setup
- Isolation between services
- Easy deployment across different systems
- No manual MongoDB installation required
- Single-command application startup using Docker Compose

---

# Future Enhancements

- Resume upload
- Email notifications
- Interview scheduling
- Company analytics dashboard
- Admin role
- Password reset via email
- Deployment using Kubernetes

---

# License

This project is intended for educational purposes.
