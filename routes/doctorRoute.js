const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')
const doctorLoginCheck = require('../middlewares/doctorLoginCheck')

router.get('/login', doctorController.getLogin)
router.post('/login', doctorController.postLogin)
router.get('/logout', doctorController.getLogout)
// router.use(doctorLoginCheck)
router.get('/:DoctorId', doctorController.getId)
router.get('/reject/:PatientId/:DoctorId', doctorController.getReject)
router.get('/prescription/:PatientId/:DoctorId', doctorController.getPres)
router.post('/prescription/:PatientId/:DoctorId', doctorController.postPres)
router.get('/accept/:PatientId/:DoctorId', doctorController.getAccept)

module.exports = router