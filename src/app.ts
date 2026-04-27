import express from 'express';
import authRoutes from './auth/auth.routes';
import usersRoutes from './users/users.routes';
import vehiclesRoutes from './vehicles/vehicles.routes';
import bookingsRoutes from './bookings/bookings.routes';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/vehicles', vehiclesRoutes);
app.use('/api/v1/bookings', bookingsRoutes);

export default app;
