import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateJWT } from '../middleware/auth.js';
import { Product, Order, OrderItem } from '../models/index.js';

const router = Router();

router.post(
  '/',
  authenticateJWT,
  body('items').isArray({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { items } = req.body; // [{ productId, quantityLiters }]
    try {
      let total = 0;
      const orderItems = [];
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (!product) return res.status(400).json({ message: `Product ${item.productId} not found` });
        const qty = Number(item.quantityLiters);
        if (qty <= 0) return res.status(400).json({ message: 'Quantity must be positive' });
        if (qty > Number(product.stockLiters)) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }
        const lineTotal = qty * Number(product.price);
        total += lineTotal;
        orderItems.push({ productId: product.id, quantityLiters: qty, unitPrice: product.price, lineTotal });
      }

      const order = await Order.create({ userId: req.user.id, totalAmount: total, status: 'pending' });
      for (const oi of orderItems) {
        await OrderItem.create({ orderId: order.id, ...oi });
        const product = await Product.findByPk(oi.productId);
        await product.update({ stockLiters: Number(product.stockLiters) - Number(oi.quantityLiters) });
      }
      res.status(201).json({ id: order.id, totalAmount: order.totalAmount, status: order.status });
    } catch (err) {
      res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
  }
);

router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, include: [{ model: OrderItem, as: 'OrderItems' }] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

export default router;