import 'dotenv/config';
import bcrypt from 'bcrypt';
import { sequelize, User, Product, Lease, Review, Testimonial } from './models/index.js';

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@palmtrade.com',
      passwordHash: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });

    const seller = await User.create({
      name: 'Golden Seller',
      email: 'seller@palmtrade.com',
      passwordHash: await bcrypt.hash('seller123', 10),
      role: 'seller'
    });

    const customer = await User.create({
      name: 'Happy Buyer',
      email: 'buyer@palmtrade.com',
      passwordHash: await bcrypt.hash('buyer123', 10),
      role: 'customer'
    });

    const supplier = await User.create({
      name: 'Trusted Supplier',
      email: 'supplier@palmtrade.com',
      passwordHash: await bcrypt.hash('supplier123', 10),
      role: 'supplier'
    });

    await Product.bulkCreate([
      { name: 'Premium Palm Oil', description: 'Rich color, cold-pressed', price: 5.5, sizeLiters: 5, stockLiters: 200, isWebsiteListing: true },
      { name: 'Family Pack Palm Oil', description: 'Great for households', price: 20, sizeLiters: 20, stockLiters: 100, isWebsiteListing: true },
      { name: 'Seller Bulk Palm Oil', description: 'From Golden Seller', price: 4.8, sizeLiters: 10, stockLiters: 250, sellerId: seller.id }
    ]);

    await Lease.bulkCreate([
      { title: 'Delta Plantation A', location: 'Delta State', sizeAcres: 10, durationMonths: 12, pricePerMonth: 300 },
      { title: 'Rivers Plantation B', location: 'Rivers State', sizeAcres: 25, durationMonths: 24, pricePerMonth: 500 }
    ]);

    await Review.create({ userId: customer.id, productId: 1, rating: 5, comment: 'Top quality!' });

    await Testimonial.bulkCreate([
      { userId: customer.id, content: 'PalmTrade made buying easy and affordable.', roleAtTime: 'customer' },
      { userId: supplier.id, content: 'Our supply partnership has flourished thanks to PalmTrade.', roleAtTime: 'supplier' },
      { userId: seller.id, content: 'Listing my bulk stock was seamless, and sales grew.', roleAtTime: 'seller' }
    ]);

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
}

seed();