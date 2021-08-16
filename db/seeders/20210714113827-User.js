'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      Login: 'superUser',
      Password: '12345',
      FullName: 'Vasya Belogorsky',
      Team_id: '1',
      Role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      Login: 'Vasilisa',
      Password: '123',
      FullName: 'Vasilisa Ovchinnikova',
      Team_id: '1',
      Role: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
