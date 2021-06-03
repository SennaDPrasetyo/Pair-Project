const doctorLoginCheck = (req, res, next) => {
    if (req.session.doctorLoginStatus){
        next()
    }
    else {
        res.redirect('/doctors/login')
    }
}

module.exports = doctorLoginCheck