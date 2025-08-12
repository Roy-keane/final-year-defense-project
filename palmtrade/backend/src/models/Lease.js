import { DataTypes, Model } from 'sequelize';

class Lease extends Model {}

export default function initLeaseModel(sequelize) {
  Lease.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      sizeAcres: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      durationMonths: { type: DataTypes.INTEGER, allowNull: false },
      pricePerMonth: { type: DataTypes.DECIMAL(10,2), allowNull: false },
      isAvailable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    },
    { sequelize, modelName: 'Lease', tableName: 'leases', timestamps: true }
  );
  return Lease;
}