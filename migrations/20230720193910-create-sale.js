'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Sales', {
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
      userId:  {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull:false
      },
     stockId:{
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('Sales');
  }
};