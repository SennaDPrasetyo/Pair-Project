const { Doctor, Patient, Reservation } = require('../models')

class Controller {
    static getLogin(req, res){
        res.render('loginDoctor', { err: req.query.errors })
    }
    static postLogin(req, res){
        let errMsg = []

        if (!req.body.email){
            errMsg.push('email cannot be empty!')
        }
        if (!req.body.doctorPassword){
            errMsg.push('password cannot be empty!')
        }
        if (errMsg.length){
            res.redirect(`/doctors/login?errors=${errMsg}`)
        }
        else {
            Doctor.findAll({
                where: {
                    email: req.body.email,
                    doctorPassword: req.body.doctorPassword
                }
            })
            .then((result) => {
                let passCheck = []

                if (result.length) {
                    req.session.doctorLoginStatus = true
                    result.forEach((element) => {
                        res.redirect(`/doctors/${element.id}`)
                    });
                }
                else {
                    passCheck.push('email or password is wrong!')
                    res.redirect(`/doctors/login?errors=${passCheck}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
        }
    }
    static getId(req, res){
        let doctorResult = []

        Doctor.findAll({
            where: {
                id: +req.params.DoctorId
            }
        })
        .then((result) => {
            doctorResult = result
            
            return Reservation.findAll({
                include: Patient,
                where: {
                    DoctorId: +req.params.DoctorId,
                    prescription: null
                }
            })
        })
        .then((result) => {
            res.render('listPatients', { doctorResult, result })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static getAccept(req, res){
        console.log(req.params)
        const input = {
            status: true
        }
        Reservation.update(input, {
            where: {
                PatientId: +req.params.PatientId
            }
        })
        .then((result) => {
            return Reservation.findAll({
                where: {
                    PatientId: +req.params.PatientId
                }
            })
        })
        .then((result) => {
            result.forEach((element) => {
                res.redirect(`/doctors/${element.DoctorId}`)
            })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static getReject(req, res){
        Reservation.destroy({
            where: {
                PatientId: +req.params.PatientId
            }
        })
        .then((result) => {
            res.redirect(`/doctors/${+req.params.DoctorId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static getPres(req, res){
        console.log(req.params)
        Patient.findAll({
            include: Doctor,
            where: {
                id: +req.params.PatientId
            }
        })
        .then((result) => {
            let PatientId = 0
            let DoctorId = 0
            result.forEach((element) => {
                PatientId = element.id
                element.Doctors.forEach((e) => {
                    DoctorId = e.id
                    res.render('prescription', { PatientId, DoctorId })
                })
            })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static postPres(req, res){
        const input = {
            prescription: req.body.medicine,
        }
        Reservation.update(input, {
            where: {
                PatientId: +req.params.PatientId
            }
        })
        .then((result) => {
            res.redirect(`/doctors/${+req.params.DoctorId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static getLogout(req, res){
        req.session.doctorLoginStatus = undefined
        res.redirect('/doctors/login')
    }
}

module.exports = Controller