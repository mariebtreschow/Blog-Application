'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addColumn('Posts', 'UserId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
           model: 'Users',
           key: 'id'
        }
     });

  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Posts', 'UserId');

  }
};
