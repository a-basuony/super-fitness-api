# 🏋️ Super Fitness API

A comprehensive, production-ready backend service for a fitness platform built with **NestJS**. This API provides complete authentication, user management, workout catalog, nutrition tracking, and AI-powered coaching capabilities.

**Status**: Active Development | **Version**: 1.0.0 | **License**: UNLICENSED

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🎯 Key Features](#-key-features)
- [💻 Tech Stack](#-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [📂 Project Structure](#-project-structure)
- [🔌 Core Modules](#-core-modules)
- [🚀 Getting Started](#-getting-started)
- [🗄️ Database](#️-database)
- [🔒 Authentication & Authorization](#-authentication--authorization)
- [📡 API Endpoints](#-api-endpoints)
- [🛠️ Development Guide](#️-development-guide)
- [🐳 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## ✨ Overview

**Super Fitness API** is a feature-rich NestJS backend for a comprehensive fitness platform. It handles:

- **Complete User Lifecycle**: Registration, email verification, multi-step onboarding, profile management
- **Flexible Authentication**: JWT-based with refresh tokens, password reset, email change workflows
- **Workout Management**: Hierarchical category system (Category → Group → Segment → Workout) with video support
- **Nutrition Tracking**: Comprehensive food and ingredient database with macro tracking
- **AI Coaching**: Intelligent chat with Gemini AI, personalized to user profiles and persistent session history
- **Asynchronous Tasks**: RabbitMQ-powered email delivery with nodemailer
- **Security & Quality**: Rate limiting, input validation, comprehensive error handling, logging, and code quality tools

---

## 🎯 Key Features

### 🔐 Authentication & Authorization

- **User Registration**: Email-based registration with verification flow
- **Multi-factor Security**: Email verification, password reset with OTP, email change with OTP
- **JWT Authentication**: Access token (15 min) + Refresh token (7 days)
- **Password Security**: Bcrypt hashing (10 rounds), strong password requirements
- **Session Management**: Stateless JWT, refresh token rotation, logout capability
- **Role-Based Access**: USER and ADMIN roles with granular permissions

### 👤 User Management

- **Progressive Onboarding**: 3-step wizard (personal info → body info → fitness goals)
- **Profile Management**:
  - Personal information (name, age, gender, height, weight)
  - Body metrics tracking (BMI, body type, fitness level)
  - Fitness goals (target, activity level, preferences)
- **Password Management**: Change password with current password verification
- **Email Management**: Request and verify email changes with OTP
- **Admin User Management**: View all users (admin only)

### 💪 Workout Management

- **Hierarchical Taxonomy**:
  - **Categories**: Top-level workout categories (e.g., Cardio, Strength, Flexibility)
  - **Category Groups**: Sub-categories within each category
  - **Category Segments**: Fine-grained workout segments with view tracking and statistics
  - **Workouts**: Individual exercises with video, difficulty, duration, calorie burn
- **Filtering & Search**:
  - Filter by difficulty (Beginner, Intermediate, Advanced)
  - Filter by duration
  - Filter by estimated calories
  - Paginated results
- **Video Support**: Upload and store workout videos on Cloudinary with secure URLs
- **Analytics**: Segment statistics and popularity tracking
- **CRUD Operations**: Full create, read, update, delete capabilities (admin)

### 🥗 Nutrition Tracking

- **Food Database**: Comprehensive food catalog with macro tracking
- **Ingredients**: Nested ingredient system with quantity and unit tracking
- **Macronutrients**: Automatic calculation of calories, protein, carbs, and fats
- **Meal Categories**: Foods categorized by meal type (breakfast, lunch, dinner, snacks)
- **Ingredient Management**: Create, update, delete ingredients within foods
- **Filtering**: Search and filter foods by category and macros

### 🤖 AI-Powered Coaching

- **Smart Chat Sessions**: Persistent conversation history with the AI coach
- **Personalized Context**: AI considers user's profile (name, age, goals, activity level)
- **Session Management**:
  - Auto-create sessions for first message
  - Session titles auto-generated from first message
  - Browse chat history with pagination
  - Delete sessions and start fresh
- **Advanced Integration**:
  - Google Gemini model (gemini-3-flash-preview)
  - LangChain for type-safe AI interactions
  - Streaming responses (internally buffered for HTTP)
  - Transaction-based message persistence
- **Rate Limiting**: Throttled to prevent abuse (10 requests per 60 seconds)

### 📧 Email Management

- **Asynchronous Delivery**: RabbitMQ queue for non-blocking email sends
- **HTML Templates**: Handlebars-based email templates
- **Email Types**:
  - Welcome emails on registration
  - Email verification links
  - Password reset OTP
  - Email change verification
- **SMTP Integration**: Full nodemailer integration with configurable SMTP
- **Retry Logic**: Automatic RabbitMQ retry handling

### 📱 Onboarding CMS

- **Admin-Managed Intro Slides**: Create and manage app intro slides for users
- **Rich Media**: Image support (JPEG, PNG, WebP, GIF) via Cloudinary
- **Ordering**: Customizable slide ordering
- **Activation**: Toggle slides on/off
- **CRUD**: Full admin control over onboarding flow

### 🔧 System Features

- **Health Monitoring**: Dedicated `/health` endpoint for monitoring and orchestration
- **Rate Limiting**: Global throttle (10 requests per 60 seconds), route-specific for sensitive endpoints
- **Error Handling**: Unified error responses with contextual messages
- **Logging**: Winston-based structured logging with daily rotation
- **API Documentation**: Auto-generated Swagger/OpenAPI docs at `/api-docs`
- **Input Validation**: Class-validator with whitelist enforcement
- **Response Envelope**: Consistent error response format with success/message/data/timestamp

---

## 💻 Tech Stack

| Layer              | Technology                       | Purpose                             |
| ------------------ | -------------------------------- | ----------------------------------- |
| **Framework**      | NestJS 11                        | Progressive Node.js framework       |
| **Language**       | TypeScript 5.7                   | Type-safe development               |
| **Database**       | PostgreSQL 12+                   | Primary data store                  |
| **ORM**            | TypeORM 0.3                      | Database abstraction & migrations   |
| **Authentication** | JWT + Bcrypt                     | Secure user sessions                |
| **API Docs**       | Swagger/OpenAPI                  | Interactive API documentation       |
| **Rate Limiting**  | @nestjs/throttler                | Request throttling & DOS protection |
| **Message Queue**  | RabbitMQ 3.12+                   | Asynchronous task processing        |
| **Email**          | Nodemailer + Handlebars          | SMTP email delivery                 |
| **Media Storage**  | Cloudinary SDK                   | Image & video hosting               |
| **AI Integration** | LangChain + Google Generative AI | Gemini model integration            |
| **Logging**        | Winston                          | Structured application logging      |
| **Validation**     | class-validator                  | DTO validation                      |
| **Testing**        | Jest + Supertest                 | Unit & integration tests            |
| **Containers**     | Docker + Docker Compose          | Container orchestration             |
| **Code Quality**   | ESLint + Prettier                | Linting & formatting                |
| **Git Hooks**      | Husky + lint-staged              | Pre-commit automation               |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   NestJS Hybrid App                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │          HTTP Server (Express)                   │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │   Middleware: Validation, Auth, Guards    │  │   │
│  │  │   ↓                                         │  │   │
│  │  │   Controllers (Routes)                     │  │   │
│  │  │   ├── Auth (login, register, etc.)        │  │   │
│  │  │   ├── Users (profile, onboarding)        │  │   │
│  │  │   ├── Workouts (CRUD, filtering)         │  │   │
│  │  │   ├── Foods (nutrition data)             │  │   │
│  │  │   ├── AI Chat (messaging)                │  │   │
│  │  │   └── Health (monitoring)                │  │   │
│  │  │   ↓                                         │  │   │
│  │  │   Services (Business Logic)                │  │   │
│  │  │   ├── AuthService                         │  │   │
│  │  │   ├── UsersService                        │  │   │
│  │  │   ├── WorkoutService                      │  │   │
│  │  │   ├── CloudinaryService                   │  │   │
│  │  │   ├── AiChatService                       │  │   │
│  │  │   └── MailService (Producer)              │  │   │
│  │  │   ↓                                         │  │   │
│  │  │   TypeORM Repositories                     │  │   │
│  │  │   ↓                                         │  │   │
│  │  │   PostgreSQL Database                      │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │   RabbitMQ Microservice (Consumer)               │   │
│  │   ├── MailProcessor                             │   │
│  │   └── @EventPattern('email.send')               │   │
│  │       └── nodemailer (SMTP)                     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
     │
     ├──── PostgreSQL
     ├──── RabbitMQ
     ├──── Cloudinary
     └──── Google Generative AI (Gemini)
```

---

## 📂 Project Structure

```
.
├── docker-compose.dev.yml          # Development environment setup
├── docker-compose.production.yml    # Production environment setup
├── Dockerfile                       # Development Docker image
├── Dockerfile.prod                  # Production Docker image
├── eslint.config.mjs                # ESLint configuration
├── nest-cli.json                    # NestJS CLI configuration
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.build.json              # Build-specific TS config
│
├── docs/
│   ├── NESTJS_LEARNING_BOOK.md     # NestJS concepts tutorial
│   ├── NESTJS_QUICK_REVIEW.md      # Quick reference guide
│   └── PROJECT_ANALYSIS.md          # Detailed project analysis
│
└── src/
    ├── main.ts                      # Application bootstrap
    ├── app.module.ts                # Root module
    │
    ├── common/                      # Shared resources
    │   ├── all-exceptions.filter.ts # Global exception handler
    │   ├── health.controller.ts     # Health check endpoint
    │   ├── logger.ts                # Winston logger setup
    │   │
    │   ├── decorators/              # Custom decorators
    │   │   ├── roles.decorator.ts   # @Roles() for authorization
    │   │   └── user.decorator.ts    # @User() for getting current user
    │   │
    │   ├── interceptors/            # Custom interceptors
    │   │   └── transform.interceptor.ts
    │   │
    │   ├── interface/               # TypeScript interfaces
    │   │   └── userreq.interface.ts # User request interface
    │   │
    │   ├── pipes/                   # Custom pipes
    │   │   └── file-validation.pipe.ts
    │   │
    │   ├── services/                # Shared services
    │   │   └── cloudinary.service.ts
    │   │
    │   └── utils/
    │       ├── constants.ts         # App constants
    │       ├── enums.ts             # TypeScript enums
    │       ├── types.ts             # Custom types
    │       ├── otp.util.ts          # OTP generation
    │       ├── fitness-prompt.ts    # AI prompt templates
    │       └── ai-client.js         # Dev CLI tool
    │
    └── modules/                     # Feature modules
        │
        ├── auth/                    # Authentication
        │   ├── auth.controller.ts   # Login, register, etc.
        │   ├── auth.service.ts      # Auth logic
        │   ├── auth.module.ts       # Auth module
        │   ├── auth.service.spec.ts # Unit tests
        │   │
        │   ├── dto/
        │   │   ├── login.dto.ts
        │   │   ├── register.dto.ts
        │   │   ├── forgot-password.dto.ts
        │   │   └── ...
        │   │
        │   └── entity/
        │       └── user.entity.ts
        │
        ├── users/                   # User management
        │   ├── users.controller.ts  # Profile endpoints
        │   ├── users.service.ts     # User logic
        │   ├── users.module.ts
        │   ├── users.service.spec.ts
        │   ├── dto/                 # DTOs
        │   └── entity/
        │       ├── user.entity.ts
        │       ├── user-metadata.entity.ts
        │       └── ...
        │
        ├── workout/                 # Workout management
        │   ├── workout.controller.ts
        │   ├── workout.service.ts
        │   ├── workout.module.ts
        │   ├── dto/
        │   └── entity/
        │       └── workout.entity.ts
        │
        ├── category/                # Workout categories
        │   ├── category.controller.ts
        │   ├── category.service.ts
        │   ├── category.module.ts
        │   ├── category.service.spec.ts
        │   ├── dto/
        │   └── entity/
        │       └── category.entity.ts
        │
        ├── category-group/          # Category groups
        │   ├── category-group.controller.ts
        │   ├── category-group.service.ts
        │   ├── category-group.module.ts
        │   ├── category-group.service.spec.ts
        │   ├── dto/
        │   └── entity/
        │
        ├── category-segment/        # Category segments
        │   ├── category-segment.controller.ts
        │   ├── category-segment.service.ts
        │   ├── category-segment.module.ts
        │   ├── dto/
        │   └── entity/
        │
        ├── food/                    # Nutrition/Food
        │   ├── food.controller.ts
        │   ├── food.service.ts
        │   ├── food.module.ts
        │   ├── dto/
        │   └── entity/
        │       ├── food.entity.ts
        │       └── ingredient.entity.ts
        │
        ├── ai-chat/                 # AI coaching
        │   ├── ai-chat.controller.ts
        │   ├── ai-chat.service.ts
        │   ├── ai-chat.module.ts
        │   ├── ai-chat.service.spec.ts
        │   ├── ai-chat.controller.spec.ts
        │   │
        │   ├── dto/
        │   │   └── sendmsg.dto.ts
        │   │
        │   └── entity/
        │       ├── chat-session.entity.ts
        │       └── chat-message.entity.ts
        │
        ├── ai/                      # AI model provider
        │   └── ai.module.ts         # Gemini model setup
        │
        ├── mail/                    # Email service
        │   ├── mail.service.ts      # SMTP sender
        │   ├── mail.processor.ts    # RabbitMQ consumer
        │   ├── mail.module.ts
        │   │
        │   └── templates/           # Email templates
        │       ├── welcome.hbs
        │       ├── verify-email.hbs
        │       ├── reset-password.hbs
        │       └── ...
        │
        └── onboarding/              # Onboarding CMS
            ├── onboarding.controller.ts
            ├── onboarding.service.ts
            ├── onboarding.module.ts
            ├── dto/
            └── entity/
                └── onboarding.entity.ts
```

---

## 🔌 Core Modules

### 🔐 Auth Module

**Endpoints**:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (clears refresh token)
- `GET /api/auth/verify-email?token=` - Email verification
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-reset-code` - Verify OTP for password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `POST /api/auth/change-email/request` - Request email change
- `POST /api/auth/change-email/verify` - Verify new email with OTP

**Features**:

- JWT-based authentication
- Email verification with token links
- Password reset with OTP (6 digits, 15 min validity)
- Email change with OTP (10 min validity)
- Bcrypt password hashing
- Refresh token rotation

---

### 👤 Users Module

**Endpoints**:

- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile
- `PATCH /api/users/personal-info` - Update personal info (step 1)
- `PATCH /api/users/body-info` - Update body info (step 2)
- `PATCH /api/users/fitness-goals` - Update fitness goals (step 3)
- `PATCH /api/users/change-password` - Change password
- `GET /api/users` - Get all users (admin only)

**Features**:

- Progressive onboarding (3-step wizard)
- Profile tracking (personal, body, fitness)
- Password change with verification
- Current onboarding step tracking
- Completion status tracking

---

### 💪 Workout Module

**Endpoints**:

- `POST /api/workouts` - Create workout (admin)
- `GET /api/workouts` - Get all workouts (with filtering)
- `GET /api/workouts/:id` - Get specific workout
- `GET /api/workouts/segment/:segmentId` - Get workouts by segment
- `PATCH /api/workouts/:id` - Update workout (admin)
- `DELETE /api/workouts/:id` - Delete workout (admin)
- `DELETE /api/workouts/:id/video` - Delete workout video (admin)

**Features**:

- Hierarchical structure (Category → Group → Segment → Workout)
- Video upload to Cloudinary
- Filter by difficulty, duration, calories
- Pagination support
- Relationship to category segments
- Full CRUD operations

---

### 🏆 Category Modules

**Category Endpoints**:

- `POST /api/category` - Create category (admin)
- `GET /api/category` - Get all categories
- `GET /api/category/:categoryId/groups` - Get groups in category
- `PATCH /api/category/:id` - Update category (admin)
- `DELETE /api/category/:id` - Delete category (admin)

**Category Group Endpoints**:

- `POST /api/category-group` - Create group (admin)
- `GET /api/category-group` - Get all groups
- `GET /api/category-group/:groupId/segments` - Get segments in group
- `PATCH /api/category-group/:id` - Update group (admin)
- `DELETE /api/category-group/:id` - Delete group (admin)

**Category Segment Endpoints**:

- `POST /api/segments` - Create segment (admin)
- `GET /api/segments` - Get all segments
- `GET /api/segments/:id` - Get specific segment
- `PATCH /api/segments/:id` - Update segment (admin)
- `DELETE /api/segments/:id` - Delete segment (admin)
- `POST /api/segments/:id/view` - Increment view count
- `GET /api/segments/:id/stats` - Get segment statistics

**Features**:

- 4-level hierarchy with unique name constraints
- Cascading deletes
- View tracking and statistics
- Full CRUD at each level

---

### 🥗 Food Module

**Endpoints**:

- `POST /api/foods` - Create food (admin)
- `GET /api/foods` - Get all foods (with filtering)
- `GET /api/foods/:id` - Get specific food
- `DELETE /api/foods/:id` - Delete food (admin)
- `POST /api/foods/:id/ingredients` - Add ingredient
- `PATCH /api/foods/:foodId/ingredients/:ingredientId` - Update ingredient
- `DELETE /api/foods/:foodId/ingredients/:ingredientId` - Delete ingredient

**Features**:

- Food database with macro tracking (calories, protein, carbs, fats)
- Nested ingredients system
- Meal categorization (breakfast, lunch, dinner, snacks)
- Cascading ingredient persistence
- Full CRUD for foods and ingredients

---

### 🤖 AI Chat Module

**Endpoints**:

- `POST /api/ai-chat` - Send message to AI (rate limited)
- `GET /api/ai-chat/history?page=&limit=` - Get chat history
- `DELETE /api/ai-chat/session/:id` - Delete chat session

**Features**:

- Persistent chat sessions
- Message history storage
- Personalized AI responses (considers user profile)
- Gemini model integration via LangChain
- Rate limiting (10 requests/60 seconds)
- Auto-create sessions on first message
- Session pagination
- Transaction-based persistence

---

### 📱 Onboarding Module (CMS)

**Endpoints**:

- `GET /api/onboarding` - Get all onboarding slides
- `POST /api/onboarding` - Create slide (admin, multipart image)
- `PATCH /api/onboarding/:id` - Update slide (admin)
- `DELETE /api/onboarding/:id` - Delete slide (admin)

**Features**:

- Admin-managed intro slides
- Image upload to Cloudinary (JPEG, PNG, WebP, GIF)
- 5MB file size limit
- Ordering system
- Activation/deactivation

---

### 📧 Mail Module

**Features**:

- Asynchronous email delivery via RabbitMQ
- Nodemailer SMTP integration
- Handlebars HTML templates
- Email types: welcome, verification, password reset, email change
- Automatic retry on failure

---

### 🏥 Health Module

**Endpoints**:

- `GET /api/health` - Health check with database connectivity

**Features**:

- Service status reporting
- Database connectivity verification
- Timestamp reporting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Docker**: Latest version (for dev environment)
- **Git**: For version control

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd super-fitness-api-team-a-main
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your local configuration
```

**Essential variables to set**:

```bash
# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=fitness-app
DATABASE_PASSWORD=fitness-app
DATABASE_NAME=fitness-app

# JWT
JWT_ACCESS_SECRET=your-secure-access-secret-at-least-32-chars
JWT_REFRESH_SECRET=your-secure-refresh-secret-at-least-32-chars

# Google AI
GOOGLE_API_KEY=your_google_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@fitness.app

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
```

#### 4. Start Development Infrastructure

```bash
# Start PostgreSQL, RabbitMQ, and other services
npm run docker
```

This command runs:

- PostgreSQL database (port 5432)
- RabbitMQ message broker (port 5672)
- Redis (optional)

#### 5. Run Database Migrations

TypeORM auto-syncs in development mode. For a fresh start:

```bash
# The app auto-creates/updates schema on startup in dev mode
npm run start:dev
```

#### 6. Start Development Server

```bash
npm run start:dev
```

Server runs at `http://localhost:3000`

#### 7. Access Documentation

Open in browser: `http://localhost:3000/api-docs`

---

## 🗄️ Database

### Connection Details

- **Type**: PostgreSQL
- **ORM**: TypeORM 0.3
- **Auto-sync**: Enabled in development
- **Migrations**: Required in production

### Database Setup

```bash
# Development - Auto-sync enabled
NODE_ENV=development npm run start:dev

# Production - No auto-sync, use migrations
NODE_ENV=production npm run start
```

### Database Schema

**Key Entities**:

1. **users** - User accounts and authentication
   - UUID primary key
   - Email (unique)
   - Password (bcrypt hashed)
   - Refresh token hash
   - Onboarding progress tracking
   - Role (USER/ADMIN)

2. **password_reset** - Password reset tokens
   - OTP (6 digits)
   - Expiry tracking
   - Used flag

3. **email_change** - Email change requests
   - New email
   - OTP
   - Expiry tracking

4. **chat_session** - AI chat sessions
   - User reference
   - Auto-generated title
   - Cascade delete with messages

5. **chat_message** - Individual messages
   - Content
   - Sender (USER/AI)
   - Session reference

6. **workout_categories** - Top-level categories
   - Name (unique)
   - Hierarchy level 1

7. **category_groups** - Second level
   - Unique by (category, name)
   - Parent reference

8. **category_segments** - Third level
   - Unique by (group, name)
   - View count
   - Statistics tracking

9. **workouts** - Individual exercises
   - Video URL (Cloudinary)
   - Difficulty, duration, calories
   - Eager load segments

10. **foods** - Nutrition database
    - Macro information
    - Meal categorization
    - Cascade ingredient relations

11. **ingredients** - Food components
    - Quantity and unit
    - Parent food reference

12. **onboarding** - App intro slides (CMS)
    - Image URL (Cloudinary)
    - Ordering
    - Activation status

### Relationships Diagram

```
Users (1) ──── (N) ChatSession
         ├──── (N) PasswordReset
         └──── (N) EmailChange

ChatSession (1) ──── (N) ChatMessage

WorkoutCategory (1) ──── (N) CategoryGroup
CategoryGroup (1) ──── (N) CategorySegment
CategorySegment (1) ──── (N) Workout
CategorySegment (1) ──── (1) CategorySegmentStats

Food (1) ──── (N) Ingredient (cascade)
```

---

## 🔒 Authentication & Authorization

### Authentication Flow

1. **Registration**
   - User submits email + password
   - Password validated (8 chars, uppercase, lowercase, number, special char)
   - Email link sent for verification
   - Account created but unverified

2. **Email Verification**
   - User clicks link with token
   - Token validated and marked as used
   - User can now login

3. **Login**
   - Email + password submitted
   - Password verified with bcrypt
   - JWT tokens generated (access + refresh)
   - Refresh token hash stored in DB

4. **Token Refresh**
   - Refresh token submitted
   - Verified against stored hash
   - New token pair issued
   - Old refresh token rotated out

5. **Password Reset**
   - User requests via email
   - 6-digit OTP sent to email
   - OTP verified (15 min validity)
   - New password set

6. **Email Change**
   - User requests change
   - OTP sent to new email
   - OTP verified (10 min validity)
   - Email updated

### Authorization

**Role-Based Access Control**:

- `UserType.USER` - Regular users
- `UserType.ADMIN` - Admin functions

**Guards**:

- `AuthGuard` - Checks JWT, loads user
- `RolesGuard` - Validates role permissions

**Application**:

```typescript
// Public endpoint
@Post('login')
async login(@Body() dto: LoginDto) { }

// Requires authentication
@Get('profile')
@UseGuards(AuthGuard)
async getProfile(@User() user: UserEntity) { }

// Requires authentication + admin role
@Post()
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
async create(@Body() dto: CreateDto) { }
```

### Security Measures

- JWT secrets (32+ char minimum)
- Bcrypt password hashing (10 rounds)
- Refresh token rotation
- OTP expiry (15 min for password, 10 min for email)
- Input validation & whitelist
- Rate limiting (10 requests/60 sec)
- Secure password requirements

---

## 📡 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint                     | Auth | Body                 | Returns      |
| ------ | ---------------------------- | ---- | -------------------- | ------------ |
| POST   | `/auth/register`             | ✗    | email, password      | user, tokens |
| POST   | `/auth/login`                | ✗    | email, password      | user, tokens |
| POST   | `/auth/refresh`              | ✗    | refreshToken         | tokens       |
| POST   | `/auth/logout`               | ✓    | -                    | message      |
| GET    | `/auth/verify-email`         | ✗    | token (query)        | message      |
| POST   | `/auth/forgot-password`      | ✗    | email                | message      |
| POST   | `/auth/verify-reset-code`    | ✗    | email, otp           | message      |
| POST   | `/auth/reset-password`       | ✗    | email, otp, password | message      |
| POST   | `/auth/change-email/request` | ✓    | newEmail             | message      |
| POST   | `/auth/change-email/verify`  | ✓    | otp                  | message      |

### User Endpoints

| Method | Endpoint                 | Auth    | Returns      |
| ------ | ------------------------ | ------- | ------------ |
| GET    | `/users/profile`         | ✓       | User profile |
| PATCH  | `/users/profile`         | ✓       | Updated user |
| PATCH  | `/users/personal-info`   | ✓       | Updated user |
| PATCH  | `/users/body-info`       | ✓       | Updated user |
| PATCH  | `/users/fitness-goals`   | ✓       | Updated user |
| PATCH  | `/users/change-password` | ✓       | Message      |
| GET    | `/users`                 | ✓ Admin | Users array  |

### Workout Endpoints

| Method | Endpoint                       | Auth    | Returns             |
| ------ | ------------------------------ | ------- | ------------------- |
| POST   | `/workouts`                    | ✓ Admin | Created workout     |
| GET    | `/workouts`                    | ✓       | Workouts array      |
| GET    | `/workouts/:id`                | ✓       | Workout details     |
| GET    | `/workouts/segment/:segmentId` | ✓       | Workouts in segment |
| PATCH  | `/workouts/:id`                | ✓ Admin | Updated workout     |
| DELETE | `/workouts/:id`                | ✓ Admin | 204 No Content      |
| DELETE | `/workouts/:id/video`          | ✓ Admin | Message             |

### Category Endpoints

| Method | Endpoint                       | Auth    | Returns          |
| ------ | ------------------------------ | ------- | ---------------- |
| POST   | `/category`                    | ✓ Admin | Created category |
| GET    | `/category`                    | ✓       | Categories array |
| GET    | `/category/:categoryId/groups` | ✓       | Groups array     |
| PATCH  | `/category/:id`                | ✓ Admin | Updated category |
| DELETE | `/category/:id`                | ✓ Admin | Message          |

### Category Group Endpoints

| Method | Endpoint                            | Auth    | Returns        |
| ------ | ----------------------------------- | ------- | -------------- |
| POST   | `/category-group`                   | ✓ Admin | Created group  |
| GET    | `/category-group`                   | ✓       | Groups array   |
| GET    | `/category-group/:groupId/segments` | ✓       | Segments array |
| PATCH  | `/category-group/:id`               | ✓ Admin | Updated group  |
| DELETE | `/category-group/:id`               | ✓ Admin | Message        |

### Category Segment Endpoints

| Method | Endpoint              | Auth    | Returns            |
| ------ | --------------------- | ------- | ------------------ |
| POST   | `/segments`           | ✓ Admin | Created segment    |
| GET    | `/segments`           | ✓       | Segments array     |
| GET    | `/segments/:id`       | ✓       | Segment details    |
| PATCH  | `/segments/:id`       | ✓ Admin | Updated segment    |
| DELETE | `/segments/:id`       | ✓ Admin | Message            |
| POST   | `/segments/:id/view`  | ✓       | View count updated |
| GET    | `/segments/:id/stats` | ✓       | Statistics         |

### Food Endpoints

| Method | Endpoint                                   | Auth    | Returns            |
| ------ | ------------------------------------------ | ------- | ------------------ |
| POST   | `/foods`                                   | ✓ Admin | Created food       |
| GET    | `/foods`                                   | ✓       | Foods array        |
| GET    | `/foods/:id`                               | ✓       | Food details       |
| DELETE | `/foods/:id`                               | ✓ Admin | Message            |
| POST   | `/foods/:id/ingredients`                   | ✓ Admin | Created ingredient |
| PATCH  | `/foods/:foodId/ingredients/:ingredientId` | ✓ Admin | Updated ingredient |
| DELETE | `/foods/:foodId/ingredients/:ingredientId` | ✓ Admin | Message            |

### AI Chat Endpoints

| Method | Endpoint               | Auth | Throttle | Returns        |
| ------ | ---------------------- | ---- | -------- | -------------- |
| POST   | `/ai-chat`             | ✓    | 10/60s   | AI response    |
| GET    | `/ai-chat/history`     | ✓    | -        | Sessions array |
| DELETE | `/ai-chat/session/:id` | ✓    | -        | Message        |

### Onboarding Endpoints

| Method | Endpoint          | Auth    | Returns       |
| ------ | ----------------- | ------- | ------------- |
| GET    | `/onboarding`     | ✓       | Slides array  |
| POST   | `/onboarding`     | ✓ Admin | Created slide |
| PATCH  | `/onboarding/:id` | ✓ Admin | Updated slide |
| DELETE | `/onboarding/:id` | ✓ Admin | Message       |

### Health Endpoints

| Method | Endpoint  | Auth | Returns       |
| ------ | --------- | ---- | ------------- |
| GET    | `/health` | ✗    | Health status |

---

## 🛠️ Development Guide

### Running Tests

```bash
# Run all unit tests
npm run test

# Run tests with coverage report
npm run test:cov

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint -- --fix

# Format code with Prettier
npm run format

# Build project
npm run build
```

### Available npm Scripts

```bash
# Development
npm run start              # Start in production mode
npm run start:dev          # Start with file watching
npm run start:debug        # Start in debug mode

# Building
npm run build              # Compile TypeScript to JavaScript
npm run build:prod         # Build for production

# Testing
npm run test               # Run unit tests
npm run test:cov           # Run with coverage
npm run test:watch         # Watch mode
npm run test:debug         # Debug mode
npm run test:e2e           # E2E tests

# Code Quality
npm run lint               # Run linter
npm run lint --fix         # Auto-fix
npm run format             # Format code
npm run format:check       # Check formatting

# Docker
npm run docker             # Start dev environment
npm run docker:prod        # Start prod environment

# CI/CD (if applicable)
git push                   # Triggers pre-commit hooks
```

### Environment Variables for Development

```bash
# Create .env file
cat > .env << EOF
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5440
DATABASE_USER=fitness-app
DATABASE_PASSWORD=change-me-for-local-dev
DATABASE_NAME=fitness-app

# JWT
JWT_ACCESS_SECRET=dev-secret-access-token-32-characters-minimum
JWT_REFRESH_SECRET=dev-secret-refresh-token-32-characters-minimum

# Google AI
GOOGLE_API_KEY=your_test_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=test_cloud
CLOUDINARY_API_KEY=test_key
CLOUDINARY_API_SECRET=test_secret

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=test@gmail.com
SMTP_PASS=app_password
SMTP_FROM=test@fitness.app

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# URLs
APP_URL=http://localhost:3000
EOF
```

### Git Workflow

1. Create feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and commit:

   ```bash
   git add .
   git commit -m "feat: your feature description"
   # Husky pre-commit hooks automatically lint and format
   ```

3. Push and create PR:
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards

- **ESLint**: Enforces consistent code style
- **Prettier**: Auto-formats code
- **TypeScript**: Strict type checking
- **Husky**: Pre-commit linting
- **Jest**: Unit testing framework

### Debugging

```bash
# Start in debug mode
npm run start:debug

# Then in VSCode, attach debugger or use:
node --inspect-brk -r tsconfig-paths/register -r ts-node/register dist/main.js
```

---

## 🐳 Deployment

### Docker Setup

#### Development Environment

```bash
npm run docker
```

Starts **only the dependencies** (not the API server):

- PostgreSQL: host port `5440` → container port `5432`
- RabbitMQ: host port `5672` (management UI `15672`)

The Compose file reads `DATABASE_NAME`, `DATABASE_USER`, and `DATABASE_PASSWORD` from your local `.env`. Set matching values in your application config before first run. If you previously initialized the `pgdata` volume with different credentials, changing `.env` does not update an existing database user; repair the credentials explicitly rather than deleting data.

Run `npm run start:dev` **in another terminal** to start the NestJS API on the host. Set `DATABASE_HOST=localhost` and `DATABASE_PORT=5440` for this arrangement; a Node process running inside the Compose network should instead use `postgres-db:5432`.

#### Production Build

```bash
# Build production image
docker build -t fitness-api:latest .

# Or with specific tag
docker build -t fitness-api:v1.0.0 -f Dockerfile.prod .
```

### Docker Compose

```bash
# Development: from the repository root with .env configured
docker compose -f docker-compose.dev.yml up -d

# Production
docker-compose -f docker-compose.production.yml up -d

# Stop the development dependencies (preserves the database volume)
docker compose -f docker-compose.dev.yml down

# View logs for the two services
docker compose -f docker-compose.dev.yml logs -f postgres-db rabbitmq
```

### Environment Setup for Production

1. Create `.env.production`:

```bash
NODE_ENV=production
PORT=3000
DATABASE_HOST=postgres-db
DATABASE_PORT=5432
DATABASE_USER=prod_user
DATABASE_PASSWORD=strong_password_here
DATABASE_NAME=fitness_prod

JWT_ACCESS_SECRET=production_access_secret_32_chars_minimum
JWT_REFRESH_SECRET=production_refresh_secret_32_chars_minimum

GOOGLE_API_KEY=production_google_key
CLOUDINARY_CLOUD_NAME=production_cloud
CLOUDINARY_API_KEY=production_key
CLOUDINARY_API_SECRET=production_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=production_email@gmail.com
SMTP_PASS=production_password
SMTP_FROM=noreply@fitness-app.com

RABBITMQ_URL=amqp://rabbitmq-user:rabbitmq-pass@rabbitmq-host:5672

APP_URL=https://api.fitness-app.com
```

2. Deploy:

```bash
docker-compose -f docker-compose.production.yml up -d
```

3. Verify:

```bash
curl https://api.fitness-app.com/health
```

### Kubernetes (Optional)

For Kubernetes deployment, create appropriate manifests for:

- API deployment
- PostgreSQL StatefulSet
- RabbitMQ StatefulSet
- ConfigMaps for environment variables
- Secrets for sensitive data

### Health Checks

The app includes a built-in health check endpoint:

```bash
GET /health
```

Returns:

```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "database": "connected",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🤝 Contributing

### Code Contribution Guidelines

1. **Fork and Clone**:

   ```bash
   git clone <your-fork>
   cd super-fitness-api-team-a-main
   ```

2. **Create Feature Branch**:

   ```bash
   git checkout -b feature/feature-name
   ```

3. **Make Changes**:
   - Follow code style (ESLint + Prettier)
   - Add/update tests
   - Update documentation

4. **Test**:

   ```bash
   npm run lint
   npm run format
   npm test
   npm run build
   ```

5. **Commit**:

   ```bash
   git commit -m "feat: description of changes"
   # Husky hooks run automatically
   ```

6. **Push and Create PR**:
   ```bash
   git push origin feature/feature-name
   ```

### Pull Request Process

1. Fill out PR template completely
2. Link related issues
3. Ensure all tests pass
4. Request review from maintainers
5. Address review comments
6. Merge when approved

### Reporting Issues

When reporting bugs:

- Describe expected vs actual behavior
- Include reproduction steps
- Provide environment details
- Include error logs if applicable

### Code Review Standards

- Tests included for new features
- Documentation updated
- No breaking changes without discussion
- Performance impact considered
- Security implications reviewed

---

## 📝 Additional Resources

- **NestJS Documentation**: https://docs.nestjs.com
- **TypeORM Documentation**: https://typeorm.io
- **Swagger UI**: Available at `/api-docs` when running
- **Project Analysis**: See `docs/PROJECT_ANALYSIS.md`
- **Learning Guide**: See `docs/NESTJS_LEARNING_BOOK.md`

---

## 📞 Support

For questions or issues:

1. Check existing issues on GitHub
2. Review documentation in `docs/`
3. Create new issue with detailed information
4. Contact team maintainers

---

## 📄 License

UNLICENSED - All rights reserved

---

## 🎉 Acknowledgments

Built with ❤️ by the Elevate Fitness Team

**Tech Stack Contributors**:

- NestJS Community
- TypeORM Contributors
- LangChain Team
- Cloudinary
- Google Generative AI

---

**Last Updated**: August 30, 2024  
**Status**: Active Development  
**Version**: 1.0.0
