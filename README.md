
---

# CodeMitra 🚀

**AI-Assisted Developer Collaboration Platform**

CodeMitra is a **full-stack developer platform** inspired by Stack Overflow, built to support **Q&A, real-time collaboration, AI-assisted coding, and secure user interactions**.
The system is designed with a **backend-first, scalable architecture**, focusing on performance, security, and extensibility.

> Live: [https://code-mitra-ad.vercel.app/](https://code-mitra-ad.vercel.app/)
> Backend-focused system built and maintained by **Aditya Sharma**

---

## 🎯 Project Objective

The goal of CodeMitra is to build a **scalable developer community platform** that supports:

* Structured Q&A workflows
* Secure authentication and authorization
* Real-time collaboration and communication
* AI-assisted developer productivity
* Performance optimization using caching and rate limiting

This project emphasizes **backend engineering, distributed system concepts, and API design**.

---

## ✨ Key Features

### Core Platform

* Ask & Answer system with structured questions and answers
* Tag-based categorization and search
* User profiles and role-based access (Admin / User)

### Authentication & Security

* JWT-based authentication
* Google OAuth 2.0 using Passport.js
* Role-Based Access Control (RBAC)
* API rate limiting to prevent abuse
* Secure headers via Helmet
* Input validation using Express Validator

### Performance & Scalability

* Redis-based caching and session management
* Optimized MongoDB schemas and indexes
* Stateless REST APIs
* Centralized error handling and logging

### Real-Time & AI Capabilities

* Real-time communication using Socket.io
* AI-powered endpoints using Google Gemini APIs
* Asynchronous workflows for AI responses and processing

### Media & Utilities

* Image uploads using ImageKit
* Email notifications using Nodemailer
* File handling via Multer

---

## 🧠 System Architecture (High Level)

```
Client (React + Vite)
        |
        v
REST APIs (Express.js)
        |
Authentication & Authorization
        |
Business Logic Layer
        |
MongoDB  <---->  Redis (Cache / Sessions)
        |
External Services (AI, ImageKit, Email)
```

---

## 🛠️ Tech Stack

### Frontend

* React 19 (Vite)
* Redux Toolkit + Redux Persist
* Tailwind CSS
* Socket.io Client
* Axios
* Monaco Editor (Code Editor)
* Radix UI / Headless UI

### Backend

* Node.js (ES Modules)
* Express.js
* MongoDB + Mongoose
* Redis (ioredis)
* Socket.io
* Passport.js (Google OAuth)
* JWT Authentication
* Express Session
* Express Rate Limit
* Helmet, CORS, Morgan

### External Services

* Google Gemini (GenAI)
* ImageKit (Media Storage)
* Nodemailer (Email)
* Judge0 API (Code Execution – configured)

---

## 📁 Backend Structure (Simplified)

```
backend/
├── config/           # Environment & app configuration
├── routes/           # API route definitions
├── controllers/      # Request handling logic
├── services/         # Passport, AI, Redis, external services
├── models/           # MongoDB schemas
├── middlewares/      # Auth, validation, rate limiting
├── utils/            # Helper utilities
├── app.js            # Express app configuration
└── server.js         # Server entry point
```

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/CodeMitra

JWT_SECRET=your_secret
JWT_EXPAIRE_IN=1d

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=/api/auth/google/callback

GEMINI_API_KEY=your_key

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL=your_url

EMAIL_USER=your_email
EMAIL_PASSWORD=your_password

BASE_URL=http://localhost:5173
```

---

## ▶️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Adit122022/CodeMitra.git
cd CodeMitra
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow (Simplified)

1. User authenticates via Email/Password or Google OAuth
2. JWT issued and stored securely
3. Protected routes validated via middleware
4. Role-based access enforced at API level

---

## 🛣️ Roadmap

| Feature                      | Status        |
| ---------------------------- | ------------- |
| Core Q&A System              | ✅ Completed   |
| JWT Authentication           | ✅ Completed   |
| Google OAuth                 | ✅ Completed   |
| Role-Based Access Control    | ✅ Completed   |
| Redis Caching                | ✅ Completed   |
| Rate Limiting & Security     | ✅ Completed   |
| AI Integration               | ✅ Completed   |
| Real-Time Collaboration      | ⏳ In Progress |
| Notification System          | 📝 Planned    |
| Collaborative Code Execution | 📝 Planned    |

---

## 🧪 Engineering Focus Areas

* API design & security
* Backend scalability & caching
* Distributed system fundamentals
* Async workflows
* Clean architecture & separation of concerns

---

## 👤 Author

**Aditya Sharma**
📧 Email: [adity122022@gmail.com](mailto:adity122022@gmail.com)
🐙 GitHub: [https://github.com/Adit122022](https://github.com/Adit122022)

---

## 📄 License

MIT License

---

