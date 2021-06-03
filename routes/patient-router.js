const express = require('express');
const router = express.Router()
const Controller = require('../controllers/patient-controller');
const patientLoginCheck = require('../middlewares/patient');

router.get('/registration', Controller.registPatientGet)
router.post('/registration', Controller.registPatientPost)

router.get('/login', Controller.loginGet)
router.post('/login', Controller.loginPost)

router.get('/logout', Controller.logout)

router.use(patientLoginCheck)

router.get('/:patientId', Controller.showListDoctor)
router.get('/:patientId/book/:doctorId', Controller.bookDoctorGet)
router.post('/:patientId/book/:doctorId', Controller.bookDoctorPost)

router.get('/:patientId/process', Controller.process)
router.get('/:patientId/process/delete/:PatientId/:DoctorId', Controller.deleteProcess)



module.exports = router