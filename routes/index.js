const express = require('express');
const router = express.Router()
const patient =  require('./patient-router');

router.use('/patients', patient)

module.exports = router