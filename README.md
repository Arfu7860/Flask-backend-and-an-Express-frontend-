This repository contains a full-stack web application featuring a microservices-style architecture. It separates concerns between a Python-based backend for data processing/API logic and a Node.js-based frontend for client-side interactions.

---

# 🚀 Flask-backend-and-Express-frontend Integration

This project demonstrates how to bridge two popular web frameworks—**Flask (Python)** and **Express (Node.js)**—to create a unified full-stack application. By using this decoupled architecture, the project allows for specialized processing in Python while maintaining a highly performant and scalable JavaScript frontend.

---

## 🏗️ System Architecture

The application is divided into two primary directories:

### 1. **Backend (Flask)**

* **Language:** Python 3.x
* **Role:** Acts as the RESTful API provider.
* **Key Features:**
* Handles data processing and business logic.
* Manages database connections or external API integrations.
* Provides JSON endpoints for the frontend to consume.



### 2. **Frontend (Express)**

* **Language:** JavaScript (Node.js)
* **Role:** Serves the user interface and handles client-side routing.
* **Key Features:**
* Uses **EJS** or **Pug** (or standard HTML) for templating.
* Proxies requests to the Flask backend using libraries like `axios` or `node-fetch`.
* Manages user sessions and UI-specific middleware.



---

## 🛠️ Installation & Setup

To run this project locally, you will need to set up both environments simultaneously.

### **Prerequisites**

* Python 3.7+ installed.
* Node.js (v14+) and npm installed.

### **Step 1: Backend Setup**

Navigate to the Flask directory and set up a virtual environment:

```bash
cd Flask-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

```

*The backend typically runs on `http://127.0.0.1:5000`.*

### **Step 2: Frontend Setup**

Open a new terminal and navigate to the Express directory:

```bash
cd Express-frontend
npm install
npm start

```

*The frontend typically runs on `http://localhost:3000`.*

---

## 🔌 API Interaction Workflow

The interaction between the two services follows a standard **Request-Response** cycle:

1. **Client Request:** A user interacts with the Express frontend (e.g., submits a form).
2. **Frontend Logic:** Express captures the input and makes an internal `POST` or `GET` request to the Flask API.
3. **Backend Processing:** Flask processes the data, performs any necessary calculations, and returns a JSON response.
4. **UI Update:** Express receives the JSON data and renders it back to the user's browser.

---

## 📂 Repository Structure

```text
.
├── Flask-backend/
│   ├── app.py              # Entry point for Flask
│   ├── requirements.txt    # Python dependencies
│   └── ...                 # Logic and routes
└── Express-frontend/
    ├── app.js              # Entry point for Express
    ├── package.json        # Node.js dependencies
    ├── public/             # Static assets (CSS, JS, Images)
    └── views/              # UI templates

```

---
To simplify the deployment of your Flask backend and Express frontend, you can use **Docker Compose**. This allows you to spin up both services (and any necessary databases) with a single command.

## 🐋 Dockerizing the Project

To use Docker Compose, you must first have a `Dockerfile` in both the `Flask-backend` and `Express-frontend` directories.

### 1. Backend Dockerfile (`/Flask-backend/Dockerfile`)

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]

```

### 2. Frontend Dockerfile (`/Express-frontend/Dockerfile`)

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

```

---

## 🛠️ The Docker Compose Configuration

Create a file named `docker-compose.yml` in the **root** of your project (where both folders are located).

```yaml
version: '3.8'

services:
  # Flask Backend
  backend:
    build: ./Flask-backend
    container_name: flask_api
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=development
    networks:
      - app-network

  # Express Frontend
  frontend:
    build: ./Express-frontend
    container_name: express_web
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - BACKEND_URL=http://backend:5000
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

```

### **How to Run**

1. Ensure Docker Desktop is running.
2. Open your terminal in the root directory.
3. Run: `docker-compose up --build`
4. Access your frontend at `http://localhost:3000`.

---

## 💡 Key Features of this Setup

* **Service Discovery:** The Express frontend can reach the Flask backend using the hostname `http://backend:5000` because they share the same Docker network.
* **Dependency Management:** The `depends_on` flag ensures the backend container starts before the frontend.
* **Port Mapping:** Maps container ports to your local machine so you can still use `localhost` for testing.
