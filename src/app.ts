import express from 'express';
import authRoutes from './auth/auth.routes';
import usersRoutes from './users/users.routes';
import vehiclesRoutes from './vehicles/vehicles.routes';
import bookingsRoutes from './bookings/bookings.routes';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/vehicles', vehiclesRoutes);
app.use('/bookings', bookingsRoutes);

export default app;
