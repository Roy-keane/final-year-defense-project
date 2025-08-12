import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Product, User } from '../models/index.js';
import { authenticateJWT, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: User, as: 'seller', attributes: ['id', 'name'] }] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: [{ model: User, as: 'seller', attributes: ['id', 'name'] }] });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
});

router.post(
  '/',
  authenticateJWT,
  requireRole(['seller', 'admin']),
  body('name').isString().isLength({ min: 2 }),
  body('price').isFloat({ gt: 0 }),
  body('sizeLiters').isFloat({ gt: 0 }),
  body('stockLiters').isFloat({ gt: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, description, price, sizeLiters, stockLiters, imageUrl } = req.body;
      if (req.user.role === 'seller' && Number(stockLiters) < 20) {
        return res.status(400).json({ message: 'Sellers must list at least 20 liters of palm oil' });
      }
      const product = await Product.create({
        name,
        description,
        price,
        sizeLiters,
        stockLiters,
        imageUrl,
        isWebsiteListing: req.user.role === 'admin',
        sellerId: req.user.role === 'seller' ? req.user.id : null
      });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create product', error: err.message });
    }
  }
);

router.put(
  '/:id',
  authenticateJWT,
  requireRole(['seller', 'admin']),
  async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (req.user.role === 'seller' && product.sellerId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      const updates = req.body;
      if (updates.stockLiters && req.user.role === 'seller' && Number(updates.stockLiters) < 20) {
        return res.status(400).json({ message: 'Sellers must maintain at least 20 liters when listing' });
      }
      await product.update(updates);
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update product', error: err.message });
    }
  }
);

router.delete(
  '/:id',
  authenticateJWT,
  requireRole(['seller', 'admin']),
  async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (req.user.role === 'seller' && product.sellerId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      await product.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
  }
);

export default router;