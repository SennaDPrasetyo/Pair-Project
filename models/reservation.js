'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.Doctor)
      Reservation.belongsTo(models.Patient)
    }
  };
  Reservation.init({
    DoctorId: DataTypes.INTEGER,
    PatientId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    prescription: DataTypes.STRING,
    symptom: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
    hooks: {
      beforeBulkUpdate: (instance) => {
        if (instance.attributes.prescription){
          instance.attributes.prescription = `Obat ${instance.attributes.prescription.toLowerCase()} 2x sehari`
        }
      }
    }
  });
  return Reservation;
};