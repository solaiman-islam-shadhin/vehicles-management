import { Response } from 'express';
import { AuthRequest } from '../types';
import * as usersService from './users.service';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await usersService.updateUser(userId, req.body, req.user!.id, req.user!.role);
    res.json({ 
      success: true,
      message: 'User updated successfully', 
      data: user 
    });
  } catch (error: any) {
    const status = error.message === 'Forbidden' ? 403 : error.message === 'User not found' ? 404 : 400;
    res.status(status).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    await usersService.deleteUser(userId);
    res.json({ 
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    const status = error.message === 'User not found' ? 404 : 400;
    res.status(status).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};
