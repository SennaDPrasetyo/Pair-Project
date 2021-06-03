'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
     {
       "patientName": 'Acong',
       "age": 23,
       "symptom": "Sakit kepala",
       "photo": null,
       "username": 'acong123',
       "patientPassword": 'A12345',
       "createdAt": new Date(),
       "updatedAt": new Date()
     }
   ]
   return queryInterface.bulkInsert('Patients', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Patients', null)
  }
};
