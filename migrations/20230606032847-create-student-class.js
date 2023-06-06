'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('studentClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      siswaId: {
        type: Sequelize.INTEGER,
        references:{
          model:'siswas',
          key:'id',
        }
      },
      MTK: {
        type: Sequelize.BOOLEAN
      },
      IPA: {
        type: Sequelize.BOOLEAN
      },
      IPS: {
        type: Sequelize.BOOLEAN
      },
      Bahasa: {
        type: Sequelize.BOOLEAN
      },
      Bela_Diri: {
        type: Sequelize.BOOLEAN
      },
      Tari: {
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('studentClasses');
  }
};