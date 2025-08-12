import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models/index.js';

const router = Router();

const allowedRoles = ['customer', 'seller', 'supplier'];

router.post(
  '/register',
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(allowedRoles),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password, role = 'customer' } = req.body;
    try {
      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ message: 'Email already registered' });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash, role });
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
      res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  }
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
      res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
      res.status(500).json({ message: 'Login failed', error: err.message });
    }
  }
);

export default router;