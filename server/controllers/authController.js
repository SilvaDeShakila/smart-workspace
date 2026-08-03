import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d'
  });

export async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 'User already exists', 400);
    }

    const user = await User.create({ name, email, password, role });
    const token = signToken(user);

    return sendSuccess(res, { user: { id: user._id, name, email, role }, token }, 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return sendError(res, 'Invalid credentials', 401);

    const isValid = await user.comparePassword(password);
    if (!isValid) return sendError(res, 'Invalid credentials', 401);

    const token = signToken(user);
    return sendSuccess(res, { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, { user });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}
