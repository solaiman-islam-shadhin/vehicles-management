import { Response } from 'express';
import { AuthRequest } from '../types';
import * as bookingsService from './bookings.service';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
    const customerId = customer_id || req.user!.id;
    const booking = await bookingsService.createBooking(customerId, vehicle_id, rent_start_date, rent_end_date);
    res.status(201).json({ 
      success: true,
      message: 'Booking created successfully', 
      data: booking 
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await bookingsService.getAllBookings(req.user!.id, req.user!.role);
    const message = req.user!.role === 'admin' ? 'Bookings retrieved successfully' : 'Your bookings retrieved successfully';
    res.json({
      success: true,
      message,
      data: bookings
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const updateBooking = async (req: AuthRequest, res: Response) => {
  try {
    const bookingId = parseInt(req.params.bookingId);
    const { status } = req.body;
    const result = await bookingsService.updateBooking(bookingId, req.user!.id, req.user!.role, status);
    res.json({ 
      success: true,
      message: result.message, 
      data: result.booking 
    });
  } catch (error: any) {
    const status = error.message === 'Booking not found' ? 404 : error.message === 'Forbidden' ? 403 : 400;
    res.status(status).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};
