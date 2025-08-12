import { DataTypes, Model } from 'sequelize';

class Product extends Model {}

export default function initProductModel(sequelize) {
  Product.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      sizeLiters: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      stockLiters: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      isWebsiteListing: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    { sequelize, modelName: 'Product', tableName: 'products', timestamps: true }
  );

  return Product;
}