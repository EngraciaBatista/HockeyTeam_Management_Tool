# Hockey Team Management Tool

## Overview

The Hockey Team Management Tool is a full-stack microservices application designed to manage hockey teams and players through a modern web interface and scalable backend architecture.

This project demonstrates how to build a distributed system using:

* **React.js** for the frontend UI
* **Spring Boot WebFlux** for reactive backend services
* **MongoDB Reactive** for database operations
* **Netflix Eureka** for service discovery
* **Spring Security** for backend security
* **REST APIs** for communication between frontend and backend services

The system is divided into independent microservices responsible for different business domains such as team management and player management.

---

# Project Architecture

The application is composed of the following modules:

## 1. Hockey React Frontend

A React-based frontend application that allows users to:

* View hockey teams
* Manage player information
* Interact with backend APIs
* Perform CRUD operations
* Consume reactive microservice endpoints

### Technologies Used

* React 18
* Axios
* React Scripts
* JavaScript
* HTML/CSS

---

## 2. Hockey Team Service

A Spring Boot reactive microservice responsible for:

* Managing hockey teams
* Team-related CRUD operations
* Reactive REST APIs
* Service registration with Eureka
* Secured API endpoints

### Technologies Used

* Spring Boot 3
* Spring WebFlux
* Spring Security
* Reactive MongoDB
* Eureka Client
* Lombok

---

## 3. Hockey Player Service

A Spring Boot reactive microservice responsible for:

* Managing hockey players
* Player-related CRUD operations
* Reactive REST APIs
* Service discovery integration

### Technologies Used

* Spring Boot 3
* Spring WebFlux
* Reactive MongoDB
* Eureka Client
* Lombok

---

## 4. Eureka Discovery Server

The Eureka server acts as the service registry for all backend microservices.

It allows:

* Dynamic service registration
* Service discovery
* Communication between microservices
* Load balancing support

### Technologies Used

* Spring Cloud Netflix Eureka
* Spring Boot

---

# How the Application Works

The system follows a microservices architecture where each service has a dedicated responsibility.

## Application Flow

1. The React frontend sends HTTP requests to backend microservices.
2. Backend services process requests asynchronously using Spring WebFlux.
3. Data is stored and retrieved from MongoDB using reactive repositories.
4. Services register themselves with the Eureka Discovery Server.
5. Microservices communicate using service discovery instead of hardcoded URLs.
6. Results are returned to the frontend and displayed to users.

---

# Folder Structure

```bash
HockeyTeam_Management_Tool/
│
├── hockey-react-frontend/      # React frontend application
├── HockeyTeamService/          # Team management microservice
├── HockeyPlayerService/        # Player management microservice
├── HockeyEurekaServer/         # Eureka discovery server
└── README.md
```

---

# Prerequisites

Before running the project, make sure the following software is installed:

## Backend Requirements

* Java 17+
* Maven 3+
* MongoDB

## Frontend Requirements

* Node.js
* npm

---

# How to Run the Project

## Step 1: Start MongoDB

Ensure MongoDB is running locally.

Default MongoDB URL:

```bash
mongodb://localhost:27017
```

---

## Step 2: Run Eureka Discovery Server

Navigate to the Eureka server directory:

```bash
cd HockeyEurekaServer
```

Run the application:

```bash
mvn spring-boot:run
```

The Eureka dashboard should be available at:

```bash
http://localhost:8761
```

---

## Step 3: Run Hockey Team Service

Open a new terminal:

```bash
cd HockeyTeamService
```

Run the service:

```bash
mvn spring-boot:run
```

---

## Step 4: Run Hockey Player Service

Open another terminal:

```bash
cd HockeyPlayerService
```

Run the service:

```bash
mvn spring-boot:run
```

---

## Step 5: Run React Frontend

Open another terminal:

```bash
cd hockey-react-frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

The React application should run at:

```bash
http://localhost:3000
```

---

# API Communication

The frontend communicates with backend services using REST APIs.

Example operations include:

* Create a team
* View all teams
* Add players
* Update player information
* Delete records

The backend services expose reactive endpoints powered by Spring WebFlux.

---

# Features

* Reactive microservices architecture
* Service discovery with Eureka
* MongoDB reactive database integration
* Secure backend APIs
* Frontend and backend separation
* Scalable and modular design
* RESTful API communication
* Modern React frontend

---

# Future Improvements

Potential enhancements for the project include:

* API Gateway integration
* JWT authentication
* Docker containerization
* Kubernetes deployment
* Role-based authorization
* CI/CD pipelines
* Unit and integration testing improvements
* Real-time updates using WebSockets

---

# Educational Purpose

This project is ideal for learning:

* Microservices architecture
* Reactive programming with Spring WebFlux
* Frontend/backend integration
* Service discovery patterns
* Full-stack application development
* REST API development

---

# Author

Developed as a full-stack hockey management microservices project using React and Spring Boot by Engracia Batista.

---

# License

This project is open for educational and portfolio purposes.
