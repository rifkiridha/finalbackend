'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentClass.init({
    siswaId: DataTypes.INTEGER,
    MTK: DataTypes.BOOLEAN,
    IPA: DataTypes.BOOLEAN,
    IPS: DataTypes.BOOLEAN,
    Bahasa: DataTypes.BOOLEAN,
    Bela_Diri: DataTypes.BOOLEAN,
    Tari: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'studentClass',
  });
  return studentClass;
};