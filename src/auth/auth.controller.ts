import { Request, Response } from 'express';
import * as authService from './auth.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const user = await authService.signup(name, email, password, phone, role);
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully', 
      data: user 
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.signin(email, password);
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({ 
      success: false,
      message: error.message,
      errors: error.message
    });
  }
};
