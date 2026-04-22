import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import * as vehiclesService from './vehicles.service';

export const createVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const vehicle = await vehiclesService.createVehicle(req.body);
    res.status(201).json({ 
      success: true,
      message: 'Vehicle created successfully', 
      data: vehicle 
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehiclesService.getAllVehicles();
    const message = vehicles.length === 0 ? 'No vehicles found' : 'Vehicles retrieved successfully';
    res.json({
      success: true,
      message,
      data: vehicles
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicleId = parseInt(req.params.vehicleId);
    const vehicle = await vehiclesService.getVehicleById(vehicleId);
    res.json({
      success: true,
      message: 'Vehicle retrieved successfully',
      data: vehicle
    });
  } catch (error: any) {
    const status = error.message === 'Vehicle not found' ? 404 : 500;
    res.status(status).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const updateVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleId = parseInt(req.params.vehicleId);
    const vehicle = await vehiclesService.updateVehicle(vehicleId, req.body);
    res.json({ 
      success: true,
      message: 'Vehicle updated successfully', 
      data: vehicle 
    });
  } catch (error: any) {
    const status = error.message === 'Vehicle not found' ? 404 : 400;
    res.status(status).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const deleteVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleId = parseInt(req.params.vehicleId);
    await vehiclesService.deleteVehicle(vehicleId);
    res.json({ 
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error: any) {
    const status = error.message === 'Vehicle not found' ? 404 : 400;
    res.status(status).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};
