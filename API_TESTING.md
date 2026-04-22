# API Testing Examples

This file contains example requests for testing all API endpoints.

## Base URL
```
http://localhost:3000
```

## 1. Authentication

### Register Admin User
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

### Register Customer User
```bash
POST http://localhost:3000/api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "01798765432",
  "role": "customer"
}
```

### Login
```bash
POST http://localhost:3000/api/v1/auth/signin
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:** Save the `token` from response for authenticated requests.

---

## 2. Vehicles

### Create Vehicle (Admin Only)
```bash
POST http://localhost:3000/api/v1/vehicles
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

### Get All Vehicles (Public)
```bash
GET http://localhost:3000/api/v1/vehicles
```

### Get Vehicle by ID (Public)
```bash
GET http://localhost:3000/api/v1/vehicles/1
```

### Update Vehicle (Admin Only)
```bash
PUT http://localhost:3000/api/v1/vehicles/1
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "daily_rent_price": 55,
  "availability_status": "available"
}
```

### Delete Vehicle (Admin Only)
```bash
DELETE http://localhost:3000/api/v1/vehicles/1
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 3. Users

### Get All Users (Admin Only)
```bash
GET http://localhost:3000/api/v1/users
Authorization: Bearer YOUR_TOKEN_HERE
```

### Update User
```bash
PUT http://localhost:3000/api/v1/users/1
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "01798765433"
}
```

### Delete User (Admin Only)
```bash
DELETE http://localhost:3000/api/v1/users/2
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 4. Bookings

### Create Booking
```bash
POST http://localhost:3000/api/v1/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "customer_id": 1,
  "vehicle_id": 1,
  "rent_start_date": "2024-12-15",
  "rent_end_date": "2024-12-20"
}
```

### Get All Bookings
```bash
GET http://localhost:3000/api/v1/bookings
Authorization: Bearer YOUR_TOKEN_HERE
```

### Cancel Booking (Customer - Before Start Date)
```bash
PUT http://localhost:3000/api/v1/bookings/1
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "status": "cancelled"
}
```

### Mark Booking as Returned (Admin Only)
```bash
PUT http://localhost:3000/api/v1/bookings/1
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "status": "returned"
}
```

---

## Testing with cURL

### Example: Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "01712345678",
    "role": "customer"
  }'
```

### Example: Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Example: Get All Vehicles
```bash
curl http://localhost:3000/api/v1/vehicles
```

### Example: Create Booking (with token)
```bash
curl -X POST http://localhost:3000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "vehicle_id": 1,
    "rent_start_date": "2024-12-15",
    "rent_end_date": "2024-12-20"
  }'
```

---

## Testing with Postman

1. Import the requests above into Postman
2. Create an environment variable `token` 
3. After login, save the token: `{{token}}`
4. Use `Bearer {{token}}` in Authorization header

---

## Expected Response Format

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
