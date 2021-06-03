const patientLoginCheck = (req,res,next) => {
    if(req.session.patientLoginCheck) {
        next()
    } else {
        res.redirect('/patients/login')
    }
}

module.exports = patientLoginCheck