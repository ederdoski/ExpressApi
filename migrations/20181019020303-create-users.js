'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
     
      id: {
         allowNull: false,
         primaryKey: true,
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
         type: Sequelize.STRING,
         unique: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};