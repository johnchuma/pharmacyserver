'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.belongsTo(models.Product)
      Sale.belongsTo(models.User)
      // define association here
    }
  }
  Sale.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId:  {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};