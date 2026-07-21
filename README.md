# Super Fitness API

Welcome to the Super Fitness API! This project is the backend service for our cutting-edge fitness platform, providing essential APIs for user authentication, onboarding, profile management, and more.

## System Overview

The API is built using **NestJS**, a progressive Node.js framework for building efficient and scalable server-side applications. It relies on **PostgreSQL** as the primary database and **TypeORM** for object-relational mapping. We also utilize **RabbitMQ** for event-driven architecture (e.g., sending emails asynchronously).

## Features

- **Authentication**: User registration, login, logout, password reset, email verification, and email change management.
- **Profile Management**: Manage user personal info, body metrics, and fitness goals.
- **AI Integration**: AI chat session capabilities with type-safe LangChain integration.
- **Microservices**: Built with scalable message queuing for background tasks.
- **Security**: JWT-based authentication, password hashing, rate limiting, and throttler guards.
- **Health Monitoring**: Production-ready health check endpoint for container orchestration.
- **Error Handling**: Structured error logging with environment-aware responses.
- **Production Ready**: Docker deployment with optimized multi-stage builds.

---

## 🚀 Setup Instructions

### Local Development

#### 1. Install Dependencies
Make sure you have Node.js (v18+) installed, then run:
```bash
npm install
```

#### 2. Environment Variables
Copy the `.env.example` file to create a `.env` file:
```bash
cp .env.example .env
```
Fill in the variables in `.env` with your local configuration.

#### 3. Start Infrastructure (Docker)
We use Docker to easily spin up PostgreSQL and RabbitMQ. Ensure Docker is running, then execute:
```bash
npm run docker
```

#### 4. Start the Application
You can start the server in development mode using:
```bash
npm run start:dev
```
The server should now be running on `http://localhost:3000` (or whichever port is defined in `.env`).

### Production Deployment

#### 1. Environment Variables
Create a production environment file based on the template:
```bash
cp .env.production.example .env.production
```
Fill in all required production values (Cloudinary, JWT secrets, SMTP credentials, etc.).

#### 2. Build and Deploy
Build the production Docker image:
```bash
docker build -t fitness-api:latest .
```

Deploy using the production Docker Compose:
```bash
docker-compose -f docker-compose.production.yml up -d
```

#### 3. Health Check
Verify deployment by checking the health endpoint:
```bash
curl http://localhost:3000/health
```

---

## 📚 API Documentation

Once the server is running, the API documentation (Swagger) is available at:
`http://localhost:3000/api` (assuming default setup).

### Health Endpoint
```bash
GET /health
```
Returns service health status and database connectivity.

---

## 📂 Code Organization

The project is modularized by feature. Key directories include:
- `src/common/`: Shared resources, guards, interceptors, utilities, and health monitoring.
- `src/modules/auth/`: Controllers and services for authentication, session management, and password security.
- `src/modules/users/`: Logic for user profiles, onboarding, goal tracking, and password management.
- `src/modules/ai-chat/`: Features related to AI coaching and interactions with type-safe integration.
- `src/modules/mail/`: Email integration and templates.
- `src/modules/workout/`: Workout management with video upload capabilities.
- `src/modules/food/`: Food and ingredient management.
- `src/modules/category/`: Category, category group, and segment management.

Each module typically contains its own `controller`, `service`, `dto`, `entity`, and `spec` files.

---

## 🗄️ Database Schema Overview

We use **TypeORM** to manage our tables. The primary entities include:
- **Users (`users`)**: Stores user profile details, credentials, and progress.
- **Chat Sessions (`chat_session`)**: Logs interactions with the AI.
- **Password Resets / Email Changes**: Tracks OTPs and verification tokens for security operations.
- **Workouts**: Exercise data with video references.
- **Foods / Ingredients**: Nutritional information and ingredients.
- **Categories**: Hierarchical category structure for workouts.

### Database Migrations
- Development: Schema synchronization enabled for rapid prototyping
- Production: `synchronize` disabled - migrations required for schema changes

---

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- Must contain uppercase letters
- Must contain lowercase letters  
- Must contain numbers
- Must contain special characters (@$!%*?&)

### Security Measures
- JWT-based authentication with access/refresh tokens
- Password hashing with bcrypt (10 rounds)
- Rate limiting (10 requests per 60 seconds)
- Input validation with class-validator
- Type-safe TypeScript throughout
- Environment-based secret management
- Secure error handling (no sensitive data in production responses)

---

## 🧹 Code Quality & Formatting

We strictly follow code quality standards:
- **ESLint**: Enforces code style and catches common issues. Run `npm run lint`.
- **Prettier**: Guarantees consistent formatting. Run `npm run format`.
- **Husky**: Pre-commit hooks automatically lint and format code before every commit.
- **TypeScript**: Full type safety with strict mode enabled.

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

### Build & Lint
```bash
# Build the project
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

---

## 📊 Environment Variables

Required environment variables (see `.env.example`):

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5440
DATABASE_USER=fitness-app
DATABASE_PASSWORD=fitness-app
DATABASE_NAME=fitness-app

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT Authentication
JWT_ACCESS_SECRET=your_secure_jwt_access_secret_minimum_32_characters
JWT_REFRESH_SECRET=your_secure_jwt_refresh_secret_minimum_32_characters

# RabbitMQ (Message Queue)
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# Email Service (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_app_password
SMTP_FROM=noreply@fitness-app.com

# Google AI
GOOGLE_API_KEY=your_google_api_key

# Application
APP_URL=http://localhost:3000
```

---

## 🐳 Docker Deployment

### Development
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production
```bash
docker-compose -f docker-compose.production.yml up -d
```

### Docker Features
- Multi-stage builds for optimized image size
- Health checks for all services
- Persistent volumes for data
- Network isolation
- Production-ready configuration

---

## 📈 Monitoring & Logging

### Health Check Endpoint
The `/health` endpoint provides:
- Service status
- Database connectivity check
- Timestamp
- Environment information (development only)

### Error Handling
- Structured error logging with timestamps
- Request method and URL tracking
- HTTP status code logging
- Stack traces in development only
- Environment-aware responses

---

## 🔧 Available Scripts

```bash
# Development
npm run start              # Start in production mode
npm run start:dev          # Start in development mode with watch
npm run start:debug        # Start in debug mode

# Testing
npm run test               # Run tests
npm run test:cov           # Run tests with coverage
npm run test:watch         # Run tests in watch mode
npm run test:e2e           # Run end-to-end tests

# Quality
npm run lint               # Run linter
npm run format             # Format code
npm run build              # Build project

# Docker
npm run docker             # Start development Docker containers
```

---


**Super Fitness API** - TEAM A
#   s u p e r - f i t n e s s - a p i  
 #   s u p e r - f i t n e s s - a p i  
 