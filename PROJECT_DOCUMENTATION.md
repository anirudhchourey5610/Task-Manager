# 🚀 TaskFlow: Full-Stack Project Documentation
**Version:** 1.0.0  
**Author:** AI Coding Assistant (Antigravity) & [Your Name]  
**Tech Stack:** React, Spring Boot, MySQL

---

## 1. Project Vision
TaskFlow is a high-performance, role-based task management system designed to solve the complexity of team delegation. It focuses on **security**, **data integrity**, and **real-time synchronization**, providing distinct operational environments for Administrators and Team Members.

---

## 2. Technical Architecture
The application is built on a **Decoupled N-Tier Architecture**:

### A. Frontend (React + Vite)
- **Engine:** Vite (for near-instant HMR and optimized production builds).
- **Routing:** `react-router-dom` with a custom `<ProtectedRoute>` wrapper.
- **State Management:** Functional components with `useState` and `useEffect`.
- **API Layer:** Centralized `api.js` using an **Axios Interceptor** to dynamically inject `userId` and `role` headers into every outgoing request.

### B. Backend (Spring Boot 3.x)
- **Security:** Logic-based RBAC enforced at the Service layer.
- **Persistence:** Spring Data JPA with Hibernate.
- **Data Protection:** 
  - **DTO Pattern:** Use of `UserDTO`, `AuthResponse`, and `DashboardSummaryDTO` to prevent sensitive fields (like password hashes) from leaving the server.
  - **Jackson Annotations:** `@JsonProperty(access = WRITE_ONLY)` on passwords to allow signup but block exfiltration.
- **Exception Handling:** A `@ControllerAdvice` global handler that maps custom domain exceptions (`ProjectNotFoundException`, `UnauthorizedException`) into standardized JSON error responses.

---

## 3. Database Schema (MySQL)
The relational schema is optimized for relational integrity:

| Entity | Primary Keys | Foreign Keys | Key Attributes |
| :--- | :--- | :--- | :--- |
| **User** | `id` | - | `email` (Unique), `password` (Hashed), `role` (Enum) |
| **Project** | `id` | `created_by_id` | `name`, `description` |
| **Task** | `id` | `project_id`, `assigned_to_id` | `title`, `status` (Enum: PENDING, IN_PROGRESS, COMPLETED) |

---

## 4. Deep-Dive: Role-Based Logic (RBAC)

### 👑 Administrator (ADMIN)
- **Dashboard Service:** Uses aggregate repository queries (`taskRepository.count()`) to view organization-wide health.
- **Project Access:** Can create, view, and delete any project in the system.
- **Task Assignment:** Has access to the `/api/users` directory to discover and assign tasks to members via a dynamic dropdown.

### 👷 Team Member (MEMBER)
- **Data Isolation:** All queries are strictly appended with `WHERE assigned_to_id = ?` in the repository layer.
- **Restricted Access:** Frontend routes to `/projects` or `/create-task` are blocked by the `ProtectedRoute` component.
- **Operational Scope:** Can only view their personal task board and update the status of tasks specifically assigned to them.

---

## 5. API Reference (Core Endpoints)

| Method | Endpoint | Description | Auth Requirement |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register new user | Public |
| `POST` | `/api/auth/login` | Authenticate user | Public |
| `GET` | `/api/dashboard/summary` | Get role-aware stats | `userId` Header |
| `GET` | `/api/users` | List organization directory | `userId` (Admin only logic) |
| `POST` | `/api/tasks` | Create/Assign task | `userId` (Admin only logic) |
| `PUT` | `/api/tasks/{id}` | Update task status | `userId` |

---

## 6. Security Implementation Details
1. **Password Hashing:** Uses `BCrypt` with a salt rounds factor of 10.
2. **CORS Policy:** Strict Cross-Origin Resource Sharing (CORS) configured for `http://localhost:5173`.
3. **Frontend Interceptor:**
   ```javascript
   api.interceptors.request.use((config) => {
       const user = JSON.parse(localStorage.getItem('user'));
       if (user) config.headers['userId'] = user.userId;
       return config;
   });
   ```

---

## 7. Setup & Deployment
### Environment Profiles
- **`application.properties`**: Configured for local development on `localhost:3306`.
- **`application-prod.properties`**: Template provided for cloud deployment (e.g., Clever Cloud, Railway) using environment variable placeholders.

### Build Commands
- **Backend:** `./mvnw clean compile spring-boot:run`
- **Frontend:** `npm install && npm run dev`

---

## 8. Development Milestones
- [x] Hardened backend exception handling for production stability.
- [x] Implemented "Dark Sidebar / Light Workspace" professional UI.
- [x] Solved Jackson `@JsonIgnore` conflict to allow secure password signup.
- [x] Built dynamic user discovery for professional task assignment.
- [x] Synchronized role-based datasets to prevent data leakage between Admins and Members.
