# Personal Expense Management System (PEMS)

A full-stack web application for managing personal expenses, organizing categories, and viewing expense summaries through a dashboard.

Overview

**Personal Expense Management System (PEMS)** provides a centralized way to record and manage personal expenses.

### Features

- User registration and login
- JWT-based authentication
- BCrypt password encryption
- Protected frontend routes
- Category management
- Expense CRUD operations
- Dashboard expense summaries
- REST APIs
- Input validation
- MySQL database integration

## 🏗️ Architecture

```text
React + Vite Frontend
        │
        │ REST API / JSON
        ▼
Spring Boot Backend
        │
        ├── Controller
        ├── Service
        └── Repository
                │
                ▼
              MySQL
```

### Authentication Flow

```text
Login
  ↓
Password Verification
  ↓
JWT Generation
  ↓
Frontend Token Storage
  ↓
Authorization: Bearer <JWT>
  ↓
JwtAuthenticationFilter
  ↓
Protected API
```

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Java, Spring Boot |
| ORM | Spring Data JPA |
| Security | Spring Security |
| Authentication | JWT |
| Password Encryption | BCrypt |
| Database | MySQL |
| Build Tool | Maven |
| API Testing | Postman |

## ✨ Modules

### Authentication
- User registration
- User login
- BCrypt password hashing
- JWT generation and validation
- Logout
- Protected routes

### User Management
- Create user
- Get all users
- Get user by ID
- Find user by email
- Update user
- Delete user

### Category Management
- Create category
- Get categories
- Update category
- Delete category

### Expense Management
- Create expense
- Get expenses
- Get expense by ID
- Update expense
- Delete expense

An expense supports:

- Amount
- Category
- Expense date
- Expense time
- Description
- Payment method
- Currency

### Dashboard

The dashboard provides:

- Total expense
- Monthly expense
- Today's expense
- Total transactions
- Category-wise expense
- Payment-method-wise expense

## 🔐 Security

PEMS uses stateless JWT authentication with Spring Security.

Protected requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

Passwords are encrypted using `BCryptPasswordEncoder` and are not stored as plain text.

The `JwtAuthenticationFilter` validates bearer tokens for protected requests.

## 🗄️ Database Structure

### Users

```text
users
----------------
id
name
email
password
created_at
updated_at
```

### Categories

```text
categories
----------------
id
name
```

### Expenses

```text
expenses
----------------
id
user_id
category_id
amount
expense_date
expense_time
description
payment_method
currency
created_at
updated_at
```

### Relationships

```text
User 1 ───────── N Expense N ───────── 1 Category
```

## 🔗 API Endpoints

### Authentication

```http
POST /api/auth/login
```

### Users

```http
POST   /api/users
GET    /api/users
GET    /api/users/{id}
GET    /api/users/email/{email}
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### Categories

```http
POST   /api/categories
GET    /api/categories
GET    /api/categories/{id}
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

### Expenses

```http
POST   /api/expenses
GET    /api/expenses
GET    /api/expenses/{id}
PUT    /api/expenses/{id}
DELETE /api/expenses/{id}
```

### Dashboard

```http
GET /api/dashboard
```

## 📊 Example Dashboard Response

```json
{
  "totalExpense": 120000.00,
  "monthlyExpense": 0.00,
  "todayExpense": 0.00,
  "totalTransactions": 1,
  "categoryWise": {
    "Education": 120000.00
  },
  "paymentMethodWise": {
    "UPI": 120000.00
  }
}
```

## ✅ Validation

The backend uses Bean Validation annotations including:

```text
@NotBlank
@NotNull
@Email
@Size
@DecimalMin
```

Example validation response:

```json
{
  "message": "Validation failed",
  "errors": {
    "name": "must not be blank"
  },
  "status": 400
}
```

## 🚀 Getting Started

### Prerequisites

Install:

- Java
- Maven
- MySQL
- Node.js
- npm

### Backend

1. Clone the repository.
2. Open the Spring Boot backend.
3. Configure the MySQL database in the application configuration.
4. Start the Spring Boot application using Maven or your IDE.

### Frontend

Open the frontend directory:

```bash
npm install
npm run dev
```

Use the Vite development URL displayed in the terminal.

## 🧪 Testing

The application has been tested using Postman and the React frontend.

Tested areas:

- User registration
- Valid login
- Invalid login
- Input validation
- JWT authentication
- Protected endpoints
- Category CRUD
- Expense CRUD
- Dashboard calculations
- Logout
- Protected frontend routes
- End-to-end application flow

## 📁 Backend Structure

```text
src/main/java/com/example/pems/

├── controller/
│   ├── AuthController
│   ├── UserController
│   ├── CategoryController
│   ├── ExpenseController
│   └── DashboardController
│
├── service/
│   ├── UserService
│   ├── CategoryService
│   ├── ExpenseService
│   ├── DashboardService
│   └── JwtService
│
├── repository/
│   ├── UserRepository
│   ├── CategoryRepository
│   └── ExpenseRepository
│
├── entity/
│   ├── User
│   ├── Category
│   └── Expense
│
├── dto/
│   └── LoginRequest
│
├── security/
│   └── JwtAuthenticationFilter
│
└── config/
    └── SecurityConfig
```

## 🎯 Project Status

**Core PEMS application: Complete ✅**

- Authentication ✅
- JWT Security ✅
- User Management ✅
- Category CRUD ✅
- Expense CRUD ✅
- Dashboard ✅
- React Frontend ✅
- Protected Routes ✅
- Validation ✅
- End-to-End Testing ✅

## 🔮 Future Scope

- Advanced graphical reports
- Monthly and yearly expense analysis
- Budget planning
- Spending-limit alerts
- PDF/Excel report generation
- Recurring expense management
- Cloud deployment
- Mobile application
- Advanced role-based authorization
- Financial insights and recommendations

## 👨‍💻 Project

**Personal Expense Management System (PEMS)**

A full-stack project demonstrating REST APIs, CRUD operations, database relationships, JWT authentication, Spring Security, React routing, frontend-backend integration, and expense analytics.
