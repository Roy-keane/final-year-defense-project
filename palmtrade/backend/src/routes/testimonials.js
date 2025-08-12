import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateJWT } from '../middleware/auth.js';
import { Testimonial } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: err.message });
  }
});

router.post(
  '/',
  authenticateJWT,
  body('content').isString().isLength({ min: 10 }),
  body('roleAtTime').isIn(['customer', 'seller', 'supplier']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { content, roleAtTime } = req.body;
      const testimonial = await Testimonial.create({ userId: req.user.id, content, roleAtTime });
      res.status(201).json(testimonial);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create testimonial', error: err.message });
    }
  }
);

export default router;