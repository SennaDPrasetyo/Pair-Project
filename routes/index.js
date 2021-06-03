
const express = require('express')
const router = express.Router()
const doctorRoute = require('./doctorRoute')
const patient =  require('./patient-router');
const indexController = require('../controllers/indexController')

router.get('/', indexController.getHome)
router.use('/doctors', doctorRoute)



router.use('/patients', patient)


module.exports = router