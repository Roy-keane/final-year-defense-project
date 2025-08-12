import { DataTypes, Model } from 'sequelize';

class Order extends Model {}

export default function initOrderModel(sequelize) {
  Order.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'), allowNull: false, defaultValue: 'pending' },
      totalAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 }
    },
    { sequelize, modelName: 'Order', tableName: 'orders', timestamps: true }
  );
  return Order;
}