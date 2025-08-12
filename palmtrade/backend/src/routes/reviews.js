import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateJWT } from '../middleware/auth.js';
import { Review, Product, User } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    const where = productId ? { productId } : {};
    const reviews = await Review.findAll({ where, include: [{ model: User, as: 'author', attributes: ['id', 'name'] }, { model: Product, as: 'product', attributes: ['id', 'name'] }] });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
});

router.post(
  '/',
  authenticateJWT,
  body('productId').isInt({ gt: 0 }),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { productId, rating, comment } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      const review = await Review.create({ userId: req.user.id, productId, rating, comment });
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create review', error: err.message });
    }
  }
);

export default router;