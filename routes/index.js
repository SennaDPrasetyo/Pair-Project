const express = require('express')
const router = express.Router()
const doctorRoute = require('./doctorRoute')
const indexController = require('../controllers/indexController')

router.get('/', indexController.getHome)
router.use('/doctors', doctorRoute)

module.exports = router