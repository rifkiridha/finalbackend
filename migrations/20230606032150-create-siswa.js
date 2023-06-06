'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nama: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.STRING
      },
      Tanggal_Lahir: {
        type: Sequelize.DATE
      },
      Kelas: {
        type: Sequelize.STRING
      },
      Alamat: {
        type: Sequelize.STRING
      },
      Tempat: {
        type: Sequelize.STRING
      },
      No_HP: {
        type: Sequelize.INTEGER
      },
      Nama_Ortu: {
        type: Sequelize.STRING
      },
      No_HP_Ortu: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('siswas');
  }
};