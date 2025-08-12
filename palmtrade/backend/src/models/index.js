import sequelize from '../config/database.js';
import initUserModel from './User.js';
import initProductModel from './Product.js';
import initOrderModel from './Order.js';
import initOrderItemModel from './OrderItem.js';
import initReviewModel from './Review.js';
import initTestimonialModel from './Testimonial.js';
import initLeaseModel from './Lease.js';

const User = initUserModel(sequelize);
const Product = initProductModel(sequelize);
const Order = initOrderModel(sequelize);
const OrderItem = initOrderItemModel(sequelize);
const Review = initReviewModel(sequelize);
const Testimonial = initTestimonialModel(sequelize);
const Lease = initLeaseModel(sequelize);

// Associations
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'customer' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', otherKey: 'productId', as: 'items' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', otherKey: 'orderId', as: 'orders' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(Testimonial, { foreignKey: 'userId', as: 'testimonials' });
Testimonial.belongsTo(User, { foreignKey: 'userId', as: 'author' });

export { sequelize, User, Product, Order, OrderItem, Review, Testimonial, Lease };