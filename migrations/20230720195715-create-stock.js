'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Stocks');
  }
};