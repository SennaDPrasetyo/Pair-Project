'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.Patient, { through: 'Reservation' })
    }
  };
  Doctor.init({
    doctorName: DataTypes.STRING,
    email: DataTypes.STRING,
    doctorPassword: DataTypes.STRING,
    schedule: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    prescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};