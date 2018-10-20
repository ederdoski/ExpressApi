'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John',
        lastName: 'Quivui',
        email: 'johndoe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juan',
        lastName: 'Dom',
        email: 'juandom@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
