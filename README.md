# 📝 Task Management API

[![NestJS](https://img.shields.io/badge/NestJS-v10.2.0-red)](https://nestjs.com/)  
[![Node.js](https://img.shields.io/badge/Node.js-v20.6.0-green)](https://nodejs.org/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue)](https://www.postgresql.org/)  

A **RESTful Task Management API** built with **NestJS**, **TypeORM**, and **PostgreSQL**, featuring:

- JWT authentication & password hashing  
- User registration & login  
- CRUD operations for tasks  
- Task filtering & pagination  
- API documentation with Swagger 

---

## 🧩 Features

- **User Authentication**: Register, login, and protect routes with JWT  
- **Tasks Module**: Create, read, update, delete tasks  
- **Validation**: Title required, dueDate must be future  
- **Authorization**: Users can only access their own tasks  
- **Database**: PostgreSQL with TypeORM  
- **Swagger**: API documentation & testing  
- **Pagination & Filtering**: Retrieve tasks with query params  

---

## 🏗️ Project Structure
src/
├── auth/
│ ├── auth.module.ts
│ ├── auth.service.ts
│ ├── auth.controller.ts
│ ├── strategies/jwt.strategy.ts
│ ├── login.dto.ts
│ └── register.dto.ts
├── tasks/
│ ├── tasks.module.ts
│ ├── tasks.service.ts
│ ├── tasks.controller.ts
│ ├── create-task.dto.ts
│ └── update-task.dto.ts
├── users/
│ └── user.entity.ts
├── app.module.ts
└── main.ts


---

## ⚡ Technologies

- **Backend Framework**: NestJS  
- **Database**: PostgreSQL  
- **ORM**: TypeORM  
- **Authentication**: JWT, Passport  
- **Validation**: class-validator & class-transformer  
- **API Docs**: Swagger  

---

## 💻 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ARASIF1-6/task-management-api.git
cd task-management-api

```

### 2️⃣ Install dependencies

```bash
npm install

```

### 3️⃣ Configure environment variables

Create a .env file in the root:

```bash
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=taskdb
JWT_SECRET=super_secret_key_12345
JWT_EXPIRES_IN=1d
TYPEORM_SYNC=true

```

### 4️⃣ Run the application

```bash
npm run start:dev

```

API will run on: http://localhost:3000

Swagger docs: http://localhost:3000/api-docs
