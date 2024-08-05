const { v4: uuidv4 } = require('uuid');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: 'category_id' });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      categoryName: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );

  Category.beforeCreate((category) => {
    category.id = uuidv4();
  });

  return Category;
};
