# NotesApp - Full-Stack Note-Taking Application

A modern full-stack note-taking application built with **React (TypeScript)** frontend, **Node.js (TypeScript)** backend, and **MongoDB** database. Users can sign up using **email OTP** or **Google OAuth**, create, view, and delete notes, and have a fully responsive design using **Tailwind CSS**.

---

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Folder Structure](#folder-structure)
* [Getting Started](#getting-started)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [Deployment](#deployment)
* [License](#license)

---

## Features

* Sign up / Login using **email OTP** flow.
* Login with **Google OAuth**.
* JWT authentication for secure API access.
* Create, view, and delete notes.
* Responsive and mobile-friendly UI.
* Beautiful interface using **Tailwind CSS**.
* Centralized state management via **React Context API**.
* Proper input validation and error handling.
* Full CRUD functionality with backend API.

---

## Technology Stack

* **Frontend:** ReactJS, TypeScript, Tailwind CSS, Axios, React Router
* **Backend:** Node.js, Express (or your preferred Node framework), TypeScript, JWT
* **Database:** MongoDB
* **Authentication:** JWT, Google OAuth, Email OTP
* **Version Control:** Git

---

## Folder Structure

### Backend (Node.js + TypeScript)

```
backend/
│── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── server.ts
│── package.json
│── tsconfig.json
│── .env
```

### Frontend (React + TypeScript)

```
frontend/
│── src/
│   ├── api/               # Axios instance
│   ├── assets/            # Images, fonts, static files
│   ├── components/        # Reusable UI components
│   │   ├── common/
│   │   └── ui/
│   ├── context/           # Auth context
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout wrappers
│   ├── pages/             # Pages: Auth, Dashboard, Home
│   ├── routes/            # App routing
│   ├── services/          # API services
│   ├── styles/            # Tailwind + global CSS
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Helpers (validators, storage)
│── package.json
│── tsconfig.json
│── tailwind.config.js
│── postcss.config.js
```

---

## Getting Started

### Backend Setup

1. Navigate to backend folder:

```sh
cd backend
```

2. Install dependencies:

```sh
npm install
```

3. Add environment variables in `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
```

4. Compile and start backend (development):

```sh
npx tsc
node dist/server.js
```

---

### Frontend Setup

1. Navigate to frontend folder:

```sh
cd frontend
```

2. Install dependencies:

```sh
npm install
```

3. Add environment variables in `.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start development server:

```sh
npm start
```

5. Tailwind is already configured. For production build:

```sh
npm run build
```

---

## Running the Application

1. Start **backend**:

```sh
cd backend
npx tsc
node dist/server.js
```

2. Start **frontend**:

```sh
cd frontend
npm start
```

3. Open browser at `http://localhost:3000`.

* Sign up with email OTP or Google OAuth.
* Access dashboard to create, view, delete notes.

---

## Deployment

* **Backend:** Deploy to **Render, Heroku, Railway**, or **AWS**.
* **Frontend:** Deploy to **Vercel, Netlify**, or **Firebase Hosting**.
* **MongoDB:** Use **MongoDB Atlas** for production database.
* Ensure `.env` variables are correctly set in the production environment.
* Update `REACT_APP_API_URL` in frontend to point to deployed backend URL.

---

## License

This project is open source and free to use.

---

**Author:** Ayush Rai
**Assignment:** Full-Stack Note-Taking Application
