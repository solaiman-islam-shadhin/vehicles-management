# Quick Reference Guide

## Environment Setup

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

## NPM Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
```

## API Base URL

```
http://localhost:3000/api/v1
```

## Authentication Flow

1. **Register**: POST `/auth/signup`
2. **Login**: POST `/auth/signin` → Get token
3. **Use token**: Add header `Authorization: Bearer <token>`

## User Roles

- **admin**: Full access to all resources
- **customer**: Limited to own bookings and profile

## Common Operations

### Create Admin User
```json
POST /auth/signup
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "01712345678",
  "role": "admin"
}
```

### Create Vehicle (Admin)
```json
POST /vehicles
Authorization: Bearer <token>
{
  "vehicle_name": "Toyota Camry",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

### Create Booking (Customer/Admin)
```json
POST /bookings
Authorization: Bearer <token>
{
  "vehicle_id": 1,
  "rent_start_date": "2024-12-15",
  "rent_end_date": "2024-12-20"
}
```

### Cancel Booking (Customer - before start date)
```json
PUT /bookings/1
Authorization: Bearer <token>
{
  "status": "cancelled"
}
```

### Mark as Returned (Admin only)
```json
PUT /bookings/1
Authorization: Bearer <token>
{
  "status": "returned"
}
```

## Response Format

### Success
```json
{
  "success": true,
  "message": "...",
  "data": { }
}
```

### Error
```json
{
  "success": false,
  "message": "...",
  "errors": "..."
}
```

## Status Codes

- 200: Success (GET, PUT, DELETE)
- 201: Created (POST)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Database Tables

### users
- id, name, email, password, phone, role

### vehicles
- id, vehicle_name, type, registration_number, daily_rent_price, availability_status

### bookings
- id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status

## Business Rules

- Price = daily_rent_price × days
- Vehicle status: available → booked (on booking)
- Vehicle status: booked → available (on cancel/return)
- Cancel only before start date
- Cannot delete users/vehicles with active bookings
- Emails stored in lowercase
- Password minimum 6 characters

## File Structure

```
src/
├── auth/          # Authentication
├── users/         # User management
├── vehicles/      # Vehicle management
├── bookings/      # Booking management
├── config/        # Database config
├── middleware/    # Auth middleware
├── types/         # TypeScript types
├── app.ts         # Express app
└── server.ts      # Entry point
```

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify database exists

### JWT Token Error
- Check JWT_SECRET in .env
- Verify token format: `Bearer <token>`
- Check token expiration

### Permission Denied
- Verify user role (admin/customer)
- Check token is valid
- Ensure correct endpoint access

## Testing Tools

- **Postman**: Import requests from API_TESTING.md
- **cURL**: Use examples in API_TESTING.md
- **Thunder Client**: VS Code extension
- **Insomnia**: REST client

## Deployment Checklist

1. Build project: `npm run build`
2. Set environment variables on hosting
3. Create PostgreSQL database
4. Deploy application
5. Test all endpoints
6. Update README with URLs
