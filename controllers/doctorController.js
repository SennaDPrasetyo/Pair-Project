const { Doctor, Patient, Reservation } = require('../models')
const convertUmur = require('../helpers/convertUmur')

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
        Doctor.findByPk(+req.params.DoctorId, {
            include: [Patient]
        })
        .then((result) => {
            res.render('listPatients', { result, convertUmur })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static getAccept(req, res){
        const input = {
            status: true
        }
        Reservation.update(input, {
            where: {
                PatientId: +req.params.PatientId,
                DoctorId: +req.params.DoctorId
            }
        })
        .then((result) => {
            res.redirect(`/doctors/${+req.params.DoctorId}`)
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
        let DoctorId = req.params.DoctorId
        let PatientId = req.params.PatientId
        res.render('prescription', { DoctorId, PatientId })
    }
    static postPres(req, res){
        const input = {
            prescription: req.body.medicine,
        }
        Reservation.update(input, {
            where: {
                PatientId: +req.params.PatientId,
                DoctorId: +req.params.DoctorId
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