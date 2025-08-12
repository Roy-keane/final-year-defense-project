import { DataTypes, Model } from 'sequelize';

class User extends Model {}

export default function initUserModel(sequelize) {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM('customer', 'seller', 'supplier', 'admin'), allowNull: false, defaultValue: 'customer' }
    },
    { sequelize, modelName: 'User', tableName: 'users', timestamps: true }
  );

  return User;
}