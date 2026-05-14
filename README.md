# PlacePort — College Placement Portal (MERN Stack)

A full-stack placement portal with 3 roles: **Student**, **Placement Cell Faculty**, and **Company**.


## Prerequisites

- Node.js v18+ and npm
- MongoDB (local) OR MongoDB Atlas (cloud)

---

## Setup & Run

### Step 1 — Clone / copy the project

### Step 2 — Configure Backend

```bash
cd backend
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/placement_portal
JWT_SECRET=change_this_to_a_long_random_string
NODE_ENV=development
```

For MongoDB Atlas, replace MONGO_URI with your Atlas connection string.

### Step 3 — Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4 — Seed Faculty Accounts

```bash
npm run seed
```

This creates 2 faculty accounts:
| Email | Password | Employee ID |
|-------|----------|-------------|
| sanjeev.kumar@college.edu | faculty123 | FAC001 |
| priti.varshney@college.edu | faculty123 | FAC002 |

### Step 5 — Start Backend Server

```bash
npm run dev      # with auto-reload (nodemon)
# or
npm start        # without auto-reload
```

Backend runs at: **http://localhost:5000**

### Step 6 — Install Frontend Dependencies

Open a new terminal:
```bash
cd frontend
npm install
```

### Step 7 — Start Frontend

```bash
npm start
```

Frontend runs at: **http://localhost:3000**

---

## Usage Flow

### Students
1. Go to `http://localhost:3000/register` → Create account
2. Fill in personal & academic details (Profile Setup page)
3. Dashboard → view/update profile
4. Browse Jobs → apply to open positions
5. Applied Jobs → track application status

### Placement Cell Faculty
1. Login at `/login` → select "Faculty" tab
2. Use seeded credentials above
3. Dashboard → see stats (students, companies, jobs)
4. Students section → view all student profiles
5. Jobs section → see all jobs + applicants
6. Register Company → onboard new companies

### Companies
1. Faculty must register the company first (gives email + password)
2. Login at `/login` → select "Company" tab
3. Dashboard → view/update company profile
4. Post Job → create listings
5. My Jobs → view applicants, update their status (Applied → Shortlisted → Selected/Rejected)

---

## API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/student/register | Public |
| POST | /api/auth/student/login | Public |
| POST | /api/auth/faculty/login | Public |
| POST | /api/auth/company/login | Public |
| GET | /api/auth/me | Any logged-in |

### Student
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/student/profile | Student |
| PUT | /api/student/profile | Student |
| POST | /api/student/apply/:jobId | Student |
| GET | /api/student/applied-jobs | Student |

### Faculty
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/faculty/stats | Faculty |
| GET | /api/faculty/students | Faculty |
| GET | /api/faculty/students/:id | Faculty |
| GET | /api/faculty/jobs | Faculty |
| GET | /api/faculty/companies | Faculty |
| POST | /api/faculty/register-company | Faculty |

### Company
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/company/profile | Company |
| PUT | /api/company/profile | Company |
| POST | /api/company/jobs | Company |
| GET | /api/company/jobs | Company |
| PUT | /api/company/jobs/:id/status | Company |
| PUT | /api/company/jobs/:id/applicants/:sid | Company |

### Jobs (Public)
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/jobs | Any logged-in |
| GET | /api/jobs/:id | Any logged-in |

---

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT (JSON Web Tokens), bcryptjs
- **Frontend**: React 18, React Router v6, Axios
- **Styling**: Custom CSS (DM Sans font, minimal design system)
