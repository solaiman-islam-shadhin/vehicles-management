-- Vehicle Rental System Database Setup
-- Run this script if you want to manually create the database and tables

-- Create database
CREATE DATABASE vehicle_rental;

-- Connect to the database
\c vehicle_rental;

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
);

-- Create Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
  registration_number VARCHAR(100) UNIQUE NOT NULL,
  daily_rent_price DECIMAL(10, 2) NOT NULL CHECK (daily_rent_price > 0),
  availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
);

-- Create Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES users(id),
  vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
  rent_start_date DATE NOT NULL,
  rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price > 0),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vehicles_registration ON vehicles(registration_number);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_vehicle ON bookings(vehicle_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Sample data (optional)
-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, phone, role) 
VALUES ('Admin User', 'admin@example.com', '$2b$10$YourHashedPasswordHere', '01712345678', 'admin');

-- Insert sample vehicles
INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
VALUES 
  ('Toyota Camry 2024', 'car', 'ABC-1234', 50.00, 'available'),
  ('Honda Civic 2023', 'car', 'XYZ-5678', 45.00, 'available'),
  ('Yamaha R15', 'bike', 'BK-9876', 20.00, 'available'),
  ('Toyota Hiace', 'van', 'VAN-1111', 80.00, 'available'),
  ('Toyota Land Cruiser', 'SUV', 'SUV-2222', 120.00, 'available');
