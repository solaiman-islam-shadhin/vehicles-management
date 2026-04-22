import { pool } from '../config/database';

export const createVehicle = async (data: any) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = data;
  
  const result = await pool.query(
    'INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [vehicle_name, type, registration_number, daily_rent_price, availability_status || 'available']
  );

  return result.rows[0];
};

export const getAllVehicles = async () => {
  const result = await pool.query('SELECT * FROM vehicles');
  return result.rows;
};

export const getVehicleById = async (vehicleId: number) => {
  const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [vehicleId]);
  
  if (result.rows.length === 0) {
    throw new Error('Vehicle not found');
  }

  return result.rows[0];
};

export const updateVehicle = async (vehicleId: number, updates: any) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (updates.vehicle_name) {
    fields.push(`vehicle_name = $${index++}`);
    values.push(updates.vehicle_name);
  }
  if (updates.type) {
    fields.push(`type = $${index++}`);
    values.push(updates.type);
  }
  if (updates.registration_number) {
    fields.push(`registration_number = $${index++}`);
    values.push(updates.registration_number);
  }
  if (updates.daily_rent_price !== undefined) {
    fields.push(`daily_rent_price = $${index++}`);
    values.push(updates.daily_rent_price);
  }
  if (updates.availability_status) {
    fields.push(`availability_status = $${index++}`);
    values.push(updates.availability_status);
  }

  if (fields.length === 0) {
    throw new Error('No valid fields to update');
  }

  values.push(vehicleId);
  const result = await pool.query(
    `UPDATE vehicles SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    throw new Error('Vehicle not found');
  }

  return result.rows[0];
};

export const deleteVehicle = async (vehicleId: number) => {
  const bookingCheck = await pool.query('SELECT id FROM bookings WHERE vehicle_id = $1 AND status = $2', [vehicleId, 'active']);
  
  if (bookingCheck.rows.length > 0) {
    throw new Error('Cannot delete vehicle with active bookings');
  }

  const result = await pool.query('DELETE FROM vehicles WHERE id = $1 RETURNING id', [vehicleId]);
  
  if (result.rows.length === 0) {
    throw new Error('Vehicle not found');
  }

  return result.rows[0];
};
