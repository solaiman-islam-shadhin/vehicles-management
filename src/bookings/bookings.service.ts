import { pool } from '../config/database';

export const createBooking = async (customerId: number, vehicleId: number, rentStartDate: string, rentEndDate: string) => {
  const vehicleResult = await pool.query('SELECT * FROM vehicles WHERE id = $1', [vehicleId]);
  
  if (vehicleResult.rows.length === 0) {
    throw new Error('Vehicle not found');
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== 'available') {
    throw new Error('Vehicle is not available');
  }

  const start = new Date(rentStartDate);
  const end = new Date(rentEndDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    throw new Error('End date must be after start date');
  }

  const totalPrice = days * parseFloat(vehicle.daily_rent_price);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const bookingResult = await client.query(
      'INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customerId, vehicleId, rentStartDate, rentEndDate, totalPrice, 'active']
    );

    await client.query('UPDATE vehicles SET availability_status = $1 WHERE id = $2', ['booked', vehicleId]);

    await client.query('COMMIT');
    
    const booking = bookingResult.rows[0];
    return {
      ...booking,
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: parseFloat(vehicle.daily_rent_price)
      }
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getAllBookings = async (userId: number, userRole: string) => {
  if (userRole === 'admin') {
    const result = await pool.query(`
      SELECT 
        b.*,
        json_build_object('name', u.name, 'email', u.email) as customer,
        json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) as vehicle
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
    `);
    return result.rows;
  } else {
    const result = await pool.query(`
      SELECT 
        b.*,
        json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number, 'type', v.type) as vehicle
      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1
    `, [userId]);
    return result.rows;
  }
};

export const updateBooking = async (bookingId: number, userId: number, userRole: string, status: string) => {
  const bookingResult = await pool.query('SELECT * FROM bookings WHERE id = $1', [bookingId]);
  
  if (bookingResult.rows.length === 0) {
    throw new Error('Booking not found');
  }

  const booking = bookingResult.rows[0];

  if (status === 'cancelled') {
    if (userRole !== 'admin' && booking.customer_id !== userId) {
      throw new Error('Forbidden');
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);

    if (today >= startDate) {
      throw new Error('Cannot cancel booking after start date');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('UPDATE bookings SET status = $1 WHERE id = $2', ['cancelled', bookingId]);
      await client.query('UPDATE vehicles SET availability_status = $1 WHERE id = $2', ['available', booking.vehicle_id]);

      await client.query('COMMIT');
      return {
        message: 'Booking cancelled successfully',
        booking: { ...booking, status: 'cancelled' }
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } else if (status === 'returned') {
    if (userRole !== 'admin') {
      throw new Error('Forbidden');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('UPDATE bookings SET status = $1 WHERE id = $2', ['returned', bookingId]);
      await client.query('UPDATE vehicles SET availability_status = $1 WHERE id = $2', ['available', booking.vehicle_id]);

      await client.query('COMMIT');
      return {
        message: 'Booking marked as returned. Vehicle is now available',
        booking: { 
          ...booking, 
          status: 'returned',
          vehicle: { availability_status: 'available' }
        }
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } else {
    throw new Error('Invalid status');
  }
};
