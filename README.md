# Full-Stack Task Manager

A simple full-stack application for managing tasks, built with Spring Boot (Java) for the backend and React (Vite) for the frontend.

## Folder Structure

```
TaskManager/
├── backend/                  # Spring Boot application
│   ├── pom.xml               # Maven dependencies
│   └── src/main/java/...     # Java source code
│       ├── controller/       # REST API endpoints (TaskController.java)
│       ├── service/          # Business logic (TaskService.java)
│       ├── repository/       # Database access (TaskRepository.java)
│       ├── entity/           # JPA Entities (Task.java)
│       └── exception/        # Global exception handling
├── frontend/                 # React application
│   ├── package.json          # NPM dependencies
│   ├── vite.config.js        # Vite configuration
│   └── src/                  # React source code
│       ├── App.jsx           # Main React component
│       ├── api.js            # Axios API integration
│       └── index.css         # Styles
```

## Prerequisites

- Java 17 or higher
- Maven
- Node.js and npm
- MySQL Server (running on `localhost:3306`)

## Setup & Running Locally

### 1. Database Setup

Ensure your MySQL server is running. The application will automatically create a database named `taskmanager` if it doesn't exist, provided the credentials match.

In `backend/src/main/resources/application.properties`, the default credentials are:
- Username: `root`
- Password: `root123`

### 2. Run the Backend (Spring Boot)

Navigate to the `backend` directory and run the application using Maven:

```bash
cd backend
./mvnw spring-boot:run
# OR if you have maven installed globally:
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`.

### 3. Run the Frontend (React)

Navigate to the `frontend` directory, install dependencies, and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## API Endpoints (Postman Examples)

The backend exposes the following REST APIs:

### 1. Get All Tasks
- **URL**: `GET http://localhost:8080/api/tasks`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Learn Spring Boot",
      "description": "Study layered architecture",
      "status": "Pending",
      "createdAt": "2026-05-03T10:00:00"
    }
  ]
  ```

### 2. Create a Task
- **URL**: `POST http://localhost:8080/api/tasks`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread",
    "status": "Pending"
  }
  ```

### 3. Get Task by ID
- **URL**: `GET http://localhost:8080/api/tasks/1`

### 4. Update Task
- **URL**: `PUT http://localhost:8080/api/tasks/1`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread, and Coffee",
    "status": "Completed"
  }
  ```

### 5. Delete Task
- **URL**: `DELETE http://localhost:8080/api/tasks/1`

## Error Handling Example

If you try to create a task without a title, the server will return a clean JSON response with a `400 Bad Request` status:

```json
{
    "error": "Validation Failed",
    "message": {
        "title": "Title cannot be empty"
    },
    "status": 400,
    "timestamp": "2026-05-03T10:05:00"
}
```
