import { DataTypes, Model } from 'sequelize';

class Review extends Model {}

export default function initReviewModel(sequelize) {
  Review.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
      comment: { type: DataTypes.TEXT, allowNull: true }
    },
    { sequelize, modelName: 'Review', tableName: 'reviews', timestamps: true }
  );
  return Review;
}