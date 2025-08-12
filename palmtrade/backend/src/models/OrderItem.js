import { DataTypes, Model } from 'sequelize';

class OrderItem extends Model {}

export default function initOrderItemModel(sequelize) {
  OrderItem.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      quantityLiters: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      unitPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      lineTotal: { type: DataTypes.DECIMAL(10,2), allowNull: false }
    },
    { sequelize, modelName: 'OrderItem', tableName: 'order_items', timestamps: true }
  );
  return OrderItem;
}