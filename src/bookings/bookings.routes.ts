import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as bookingsController from './bookings.controller';

const router = Router();

router.post('/', authenticate, bookingsController.createBooking);
router.get('/', authenticate, bookingsController.getAllBookings);
router.put('/:bookingId', authenticate, bookingsController.updateBooking);

export default router;
