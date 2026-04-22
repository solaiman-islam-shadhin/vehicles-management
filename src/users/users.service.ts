import { pool } from '../config/database';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT id, name, email, phone, role FROM users');
  return result.rows;
};

export const updateUser = async (userId: number, updates: any, requesterId: number, requesterRole: string) => {
  if (requesterRole !== 'admin' && userId !== requesterId) {
    throw new Error('Forbidden');
  }

  const fields = [];
  const values = [];
  let index = 1;

  if (updates.name) {
    fields.push(`name = $${index++}`);
    values.push(updates.name);
  }
  if (updates.email) {
    fields.push(`email = $${index++}`);
    values.push(updates.email.toLowerCase());
  }
  if (updates.phone) {
    fields.push(`phone = $${index++}`);
    values.push(updates.phone);
  }
  if (updates.role && requesterRole === 'admin') {
    fields.push(`role = $${index++}`);
    values.push(updates.role);
  }

  if (fields.length === 0) {
    throw new Error('No valid fields to update');
  }

  values.push(userId);
  const result = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, name, email, phone, role`,
    values
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};

export const deleteUser = async (userId: number) => {
  const bookingCheck = await pool.query('SELECT id FROM bookings WHERE customer_id = $1 AND status = $2', [userId, 'active']);
  
  if (bookingCheck.rows.length > 0) {
    throw new Error('Cannot delete user with active bookings');
  }

  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
  
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};
