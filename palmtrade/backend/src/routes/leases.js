import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateJWT, requireRole } from '../middleware/auth.js';
import { Lease } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leases = await Lease.findAll({ where: { isAvailable: true } });
    res.json(leases);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch lease options', error: err.message });
  }
});

router.post(
  '/',
  authenticateJWT,
  requireRole(['admin']),
  body('title').isString(),
  body('location').isString(),
  body('sizeAcres').isFloat({ gt: 0 }),
  body('durationMonths').isInt({ gt: 0 }),
  body('pricePerMonth').isFloat({ gt: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const lease = await Lease.create(req.body);
      res.status(201).json(lease);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create lease', error: err.message });
    }
  }
);

export default router;