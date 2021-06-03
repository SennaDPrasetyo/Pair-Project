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
      Patient.belongsToMany(models.Doctor, { through: 'Reservation' })
    }

    static nameUpperCase(name) {
      return name.toUpperCase()
    }
  };
  Patient.init({
    patientName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    username: DataTypes.STRING,
    patientPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};