'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Stock)
      Product.hasMany(models.Sale)
      // define association here
    }
  }
  Product.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    image: {
      type: DataTypes.STRING,
      allowNull:true
    },
    quantityType:{
      type: DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};