'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  siswa.init({
    Nama: DataTypes.STRING,
    Password: DataTypes.STRING,
    Role: DataTypes.STRING,
    Tanggal_Lahir: DataTypes.DATE,
    Kelas: DataTypes.STRING,
    Alamat: DataTypes.STRING,
    Tempat: DataTypes.STRING,
    No_HP: DataTypes.INTEGER,
    Nama_Ortu: DataTypes.STRING,
    No_HP_Ortu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return siswa;
};