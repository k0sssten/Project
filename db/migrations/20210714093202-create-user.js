'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Login: {
        type: Sequelize.STRING,
        unique: true,
      },
      Password: {
        type: Sequelize.STRING
      },
      FullName: {
        type: Sequelize.STRING
      },
      Team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teams'
          },
          key: 'id'
        },
      },
      Role: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users', {
      truncate: true,
      restartIdentify: true,
    });
  }
};
