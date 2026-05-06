<div align="center">
  <h1>🚀 TaskFlow – Team Task Manager</h1>
  <p><strong>A production-grade, role-based full-stack task management platform</strong></p>
  
  ![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
</div>

<br />

## 📖 2. Professional Project Description
**TaskFlow** is a modern, full-stack task management web application designed to streamline team collaboration. Built with a robust Spring Boot backend and a highly responsive React frontend, the platform enforces strict Role-Based Access Control (RBAC). 

Administrators have the power to create organization-wide projects, dynamically assign tasks to members, and track real-time aggregate statistics. Members enjoy a personalized, distraction-free dashboard tailored strictly to their assigned duties. This project was developed with clean code principles, leveraging Data Transfer Objects (DTOs) for secure data exposure and an intelligent Service-layer architecture to manage complex business logic natively.

---

## ✨ 3. Live Features List
- 🔐 **Secure User Authentication**: Complete signup and login flow.
- 🛡️ **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` and `MEMBER` accounts.
- 📂 **Project Management**: Admins can create, delete, and oversee large-scale projects.
- ✅ **Task Delegation**: Tasks can be created and specifically assigned to active organization members.
- 👥 **Dynamic User Discovery**: Frontend assignment dropdowns populate automatically from a secure backend user directory endpoint.
- 📊 **Real-Time Dashboards**: Dashboards intelligently display aggregate (Admin) or personal (Member) statistics without stale caching.
- 🔄 **Interactive Status Tracking**: Members can instantly update their task statuses (Pending, In Progress, Completed).
- 🌐 **Protected Frontend Routing**: React Router prevents unauthorized access to internal dashboards.
- ☁️ **Environment Separation**: Clean configuration separation for local development vs. cloud deployment.

---

## 🛠️ 4. Tech Stack

### Frontend
| Technology | Description |
|------------|-------------|
| ⚛️ **React.js** | Core UI library for building responsive interfaces |
| ⚡ **Vite** | Next-generation frontend tooling and rapid bundling |
| 🛣️ **React Router** | Client-side routing for seamless SPA navigation |
| 📡 **Axios** | Promise-based HTTP client for intercepting backend requests |
| 🎨 **Vanilla CSS** | Custom, modular styling tailored for a clean, modern aesthetic |

### Backend
| Technology | Description |
|------------|-------------|
| ☕ **Java 17** | Core backend programming language |
| 🌱 **Spring Boot** | Framework for building production-ready RESTful web services |
| 🪪 **Spring Security** | Backend authentication and security context (conceptual implementation) |
| 💾 **JPA / Hibernate** | ORM for mapping Java entities to relational database tables |
| 🏗️ **Maven** | Dependency management and build automation |

### Database
| Technology | Description |
|------------|-------------|
| 🐬 **MySQL** | Highly reliable relational database management system |

---

## 🏛️ 5. System Architecture Overview
The application follows a classic **Three-Tier Architecture**:
1. **Presentation Layer (React)**: Handles UI rendering, global state, API interceptors, and route protection.
2. **Application Layer (Spring Boot)**: 
   - **Controllers**: Thin endpoints strictly responsible for handling HTTP requests and returning JSON.
   - **Services**: Thick business logic layer where all role-checking, security filtering, and data aggregation occurs.
   - **DTOs**: Data Transfer Objects used to safely serialize data to the frontend (e.g., stripping passwords from user directories).
3. **Data Layer (MySQL / JPA)**: Manages persistence using Hibernate with dynamic, role-aware aggregate queries.

---

## 📁 6. Folder Structure

```text
TaskFlow/
│
├── backend/                       # Spring Boot Application
│   ├── src/main/java/com/example/taskmanager/
│   │   ├── controller/            # REST API Endpoints
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── entity/                # JPA Database Models (User, Task, Project)
│   │   ├── exception/             # Global Exception Handling
│   │   ├── repository/            # Spring Data JPA Interfaces
│   │   └── service/               # Core Business Logic & RBAC
│   └── src/main/resources/
│       ├── application.properties      # Local DB Config
│       └── application-prod.properties # Cloud DB Config
│
└── frontend/                      # React / Vite Application
    ├── src/
    │   ├── api.js                 # Global Axios Instance & API Calls
    │   ├── components/            # Reusable UI Cards & Navbars
    │   ├── pages/                 # Protected Views (Dashboard, Tasks, Projects)
    │   └── styles/                # Modular CSS
    └── package.json
```

---

## 🗄️ 7. Database Design Overview
The relational MySQL database relies on three primary entities:
- **`users`**: Stores user credentials, emails, and roles (`ADMIN`, `MEMBER`).
- **`projects`**: Created by an Admin, acts as a high-level container for tasks. (One-to-Many relationship with Tasks).
- **`tasks`**: The core operational unit. Contains a status enum (`PENDING`, `IN_PROGRESS`, `COMPLETED`), due dates, and foreign keys linking back to both `projects` and assigned `users`.

---

## 🎭 8. Role-Based Workflow Explanation

### 👑 Administrator Workflow
- **Visibility**: Sees the entire organization. The Admin Dashboard reflects total counts of all tasks in the database.
- **Capabilities**: Can create new projects, view the global directory of users, create tasks, and delegate tasks to specific members.
- **Tracking**: Admins can monitor the status of all delegated tasks across the system.

### 👷 Member Workflow
- **Visibility**: Restricted. The Member Dashboard only calculates statistics for tasks explicitly assigned to them.
- **Capabilities**: Can view assigned tasks and dynamically change task statuses as they progress through their workflow.
- **Restrictions**: Cannot access Admin routes (e.g., Project Creation) or view other users' tasks.

---

## 🔌 9. API Flow Explanation
All communication between the frontend and backend occurs via RESTful JSON APIs.
1. **Authentication**: Upon successful login, the backend responds with the user's `userId` and `role`.
2. **Interceptor**: The frontend stores this in `localStorage`. The `api.js` Axios interceptor dynamically injects the `userId` into the header of *every* subsequent request.
3. **Service Logic**: The Spring Boot backend reads the request, queries the `UserRepository`, determines if the user is an `ADMIN` or `MEMBER`, and branches the database queries accordingly to return the correct dataset.

---

## ⚙️ 10. Setup & Installation Steps
Follow these instructions to run the application locally on your machine.

### 📥 15. GitHub Clone Instructions
```bash
# Clone the repository
git clone https://github.com/yourusername/taskflow.git

# Navigate into the directory
cd taskflow
```

---

### 🐬 13. MySQL Setup Instructions
Ensure MySQL is installed and running locally.
```bash
# Log into MySQL
mysql -u root -p

# Execute this SQL command to create the database:
CREATE DATABASE IF NOT EXISTS taskmanager;
EXIT;
```

---

### 🔐 14. Environment Variables / application.properties Example
Navigate to `backend/src/main/resources/application.properties` and configure your local database credentials:

```properties
spring.application.name=taskmanager

# Local Development Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.show-sql=true
```
*(Hibernate will automatically generate all necessary tables upon startup).*

---

### ☕ 11. Backend Setup Instructions
```bash
# Navigate to the backend directory
cd backend

# Compile and run the Spring Boot application
./mvnw clean compile spring-boot:run
```
*The backend will start on `http://localhost:8080`.*

---

### ⚛️ 12. Frontend Setup Instructions
Open a new terminal window:
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend will start on `http://localhost:5173`. Open this in your browser.*

---

## 📸 16. Screenshots

| Admin Dashboard | Task Creation & Assignment |
| :---: | :---: |
| *(Replace with image URL)*<br> `![Admin Dashboard](docs/admin-dash.png)` | *(Replace with image URL)*<br> `![Create Task](docs/create-task.png)` |

| Member Workspace | Project Overview |
| :---: | :---: |
| *(Replace with image URL)*<br> `![Member Tasks](docs/member-tasks.png)` | *(Replace with image URL)*<br> `![Projects](docs/projects.png)` |

---

## 🚀 17. Future Improvements
While the application is fully functional, potential future enhancements include:
- **JWT Implementation**: Upgrading the current header-based authentication to fully stateless JSON Web Tokens for industry-standard security.
- **Email Notifications**: Integrating Spring Mail to automatically notify members when a new task is assigned to them.
- **Task Comments**: Allowing Admins and Members to leave real-time feedback on specific task cards.
- **Dockerization**: Containerizing both the MySQL database and the Spring Boot application using Docker Compose for 1-click deployments.

---

## 🧠 18. Learning Outcomes
Building TaskFlow provided immense practical experience in:
- Designing and implementing strict **Role-Based Access Control (RBAC)** across the full stack.
- Understanding the importance of **Data Transfer Objects (DTOs)** to prevent sensitive database entities from leaking to the client.
- Orchestrating complex **JPA/Hibernate Aggregate Queries** to power dynamic, live-updating dashboards.
- Managing asynchronous state and global API interceptors in React.
- Professionally separating **Development and Production environments** using Spring profiles and property files.

---

## 👨‍💻 19. Author
**[Your Name Here]**
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [github.com/yourusername](https://github.com/yourusername)
- 📧 Email: your.email@example.com

---

<div align="center">
  <b>Thank you for checking out TaskFlow!</b><br>
  <i>If you found this project interesting or helpful, consider leaving a ⭐ on the repository!</i>
</div>
