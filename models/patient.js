'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Patient.init({
    patientName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    symptom: DataTypes.STRING,
    photo: DataTypes.BLOB,
    username: DataTypes.STRING,
    patientPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};