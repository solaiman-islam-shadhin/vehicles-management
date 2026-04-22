# 🚗 Vehicle Rental System

A professional backend API for a vehicle rental management system built with Node.js, TypeScript, Express.js, and PostgreSQL. This system provides comprehensive vehicle rental management with role-based access control, automated pricing calculations, and real-time availability tracking.

## 🌐 Live URL

**Live Deployment:** [Your deployment URL here]

**GitHub Repository:** [Your repository URL here]

## ✨ Features

### Core Functionality
- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Role-based access control (Admin & Customer)
  - Password hashing with bcrypt
  - Token-based session management

- **Vehicle Management**
  - Complete CRUD operations for vehicles
  - Real-time availability tracking
  - Support for multiple vehicle types (car, bike, van, SUV)
  - Admin-only vehicle management

- **Booking System**
  - Automated price calculation based on rental duration
  - Vehicle availability validation
  - Booking status management (active, cancelled, returned)
  - Customer booking history
  - Admin booking oversight

- **User Management**
  - User profile management
  - Admin user oversight
  - Role-based permissions
  - Active booking constraints

### Business Rules
- Automatic total price calculation: `daily_rent_price × rental_days`
- Vehicle status automatically updates on booking/return
- Customers can only cancel bookings before start date
- Users and vehicles with active bookings cannot be deleted
- All emails stored in lowercase for consistency

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

## 📁 Project Structure

```
src/
├── auth/               # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.routes.ts
├── users/              # Users module
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.routes.ts
├── vehicles/           # Vehicles module
│   ├── vehicles.controller.ts
│   ├── vehicles.service.ts
│   └── vehicles.routes.ts
├── bookings/           # Bookings module
│   ├── bookings.controller.ts
│   ├── bookings.service.ts
│   └── bookings.routes.ts
├── config/             # Configuration
│   └── database.ts
├── middleware/         # Middleware
│   └── auth.ts
├── types/              # TypeScript types
│   └── index.ts
├── app.ts              # Express app setup
└── server.ts           # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd assignment-2
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up PostgreSQL database**

Create a new PostgreSQL database:
```sql
CREATE DATABASE vehicle_rental;
```

Or use the provided SQL script:
```bash
psql -U postgres -f database_setup.sql
```

4. **Configure environment variables**

Create a `.env` file in the root directory (or copy from `.env.example`):
```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

Replace `username` and `password` with your PostgreSQL credentials.

5. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically create the required database tables.

### Production Build

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## 📚 Usage

### Quick Start

1. **Register an admin user** (first user should be admin):
```bash
POST http://localhost:3000/api/v1/auth/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "01712345678",
  "role": "admin"
}
```

2. **Login to get JWT token**:
```bash
POST http://localhost:3000/api/v1/auth/signin
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

3. **Use the token for authenticated requests**:
```bash
Authorization: Bearer <your_token_here>
```

For detailed API examples, see [API_TESTING.md](API_TESTING.md)

## 🌐 API Endpoints

### Authentication

#### Register User
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer"
}
```

#### Login
```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Vehicles

#### Create Vehicle (Admin only)
```http
POST /api/v1/vehicles
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicle_name": "Toyota Camry",
  "type": "car",
  "registration_number": "ABC123",
  "daily_rent_price": 50.00,
  "availability_status": "available"
}
```

#### Get All Vehicles (Public)
```http
GET /api/v1/vehicles
```

#### Get Vehicle by ID (Public)
```http
GET /api/v1/vehicles/:vehicleId
```

#### Update Vehicle (Admin only)
```http
PUT /api/v1/vehicles/:vehicleId
Authorization: Bearer <token>
Content-Type: application/json

{
  "daily_rent_price": 60.00,
  "availability_status": "available"
}
```

#### Delete Vehicle (Admin only)
```http
DELETE /api/v1/vehicles/:vehicleId
Authorization: Bearer <token>
```

### Users

#### Get All Users (Admin only)
```http
GET /api/v1/users
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/v1/users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+9876543210"
}
```

#### Delete User (Admin only)
```http
DELETE /api/v1/users/:userId
Authorization: Bearer <token>
```

### Bookings

#### Create Booking
```http
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicle_id": 1,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

#### Get All Bookings
```http
GET /api/v1/bookings
Authorization: Bearer <token>
```
- Admin: Returns all bookings
- Customer: Returns only their own bookings

#### Update Booking (Cancel/Return)
```http
PUT /api/v1/bookings/:bookingId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "cancelled"
}
```
or
```json
{
  "status": "returned"
}
```

## 🔐 Authentication & Authorization

- Passwords are hashed using bcrypt
- JWT tokens are issued upon successful login
- Protected endpoints require: `Authorization: Bearer <token>`
- Role-based access control:
  - **Admin**: Full system access
  - **Customer**: Limited to own resources

## 📊 Database Schema

### Users Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR UNIQUE)
- `password` (VARCHAR)
- `phone` (VARCHAR)
- `role` (VARCHAR: 'admin' or 'customer')

### Vehicles Table
- `id` (SERIAL PRIMARY KEY)
- `vehicle_name` (VARCHAR)
- `type` (VARCHAR: 'car', 'bike', 'van', 'SUV')
- `registration_number` (VARCHAR UNIQUE)
- `daily_rent_price` (DECIMAL)
- `availability_status` (VARCHAR: 'available' or 'booked')

### Bookings Table
- `id` (SERIAL PRIMARY KEY)
- `customer_id` (INTEGER REFERENCES users)
- `vehicle_id` (INTEGER REFERENCES vehicles)
- `rent_start_date` (DATE)
- `rent_end_date` (DATE)
- `total_price` (DECIMAL)
- `status` (VARCHAR: 'active', 'cancelled', 'returned')

## 🏗️ Build & Deploy

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Deployment Recommendations

**Backend Hosting:**
- Railway
- Render
- Heroku
- AWS EC2

**Database Hosting:**
- Railway PostgreSQL
- Supabase
- AWS RDS
- ElephantSQL

**Important:** Configure all environment variables in your deployment platform.

## 📋 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": "Error details"
}
```

### HTTP Status Codes
- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## 📝 Notes

- Total price is automatically calculated: `daily_rent_price × number_of_days`
- Vehicle status automatically updates when booked/returned
- Customers can only cancel bookings before the start date
- Users and vehicles with active bookings cannot be deleted
- All emails are stored in lowercase
