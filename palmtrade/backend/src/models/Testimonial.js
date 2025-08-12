import { DataTypes, Model } from 'sequelize';

class Testimonial extends Model {}

export default function initTestimonialModel(sequelize) {
  Testimonial.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      roleAtTime: { type: DataTypes.ENUM('customer', 'seller', 'supplier'), allowNull: false }
    },
    { sequelize, modelName: 'Testimonial', tableName: 'testimonials', timestamps: true }
  );
  return Testimonial;
}