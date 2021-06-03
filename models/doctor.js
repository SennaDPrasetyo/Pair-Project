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
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty!'
        }
      }
    },
    doctorPassword: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty!'
        }
      }
    },
    schedule: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};