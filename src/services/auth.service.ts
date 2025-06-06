import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const signupService = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already exists');
  const user:any = await User.create({ name, email, password });
  const token = generateToken(user._id);
  return { token ,user};
};

export const loginService = async (email: string, password: string) => {
  const user:any = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error('Invalid credentials');
  const token = generateToken(user._id);
  return { token,user };
};
