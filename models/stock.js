'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stock.belongsTo(models.Product)
    }
  }
  Stock.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    productId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    sellingPrice: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    buyingPrice: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    expireDate:{
      type:DataTypes.DATE,
      allowNull:true
    },
    amount:{
      type: DataTypes.FLOAT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};