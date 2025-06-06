import { Request, Response } from 'express';
import { signupService, loginService } from '../services/auth.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await signupService(name, email, password);

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      data: {
        token,
        user,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user,
      },
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
