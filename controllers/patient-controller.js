const {Doctor, Patient, Reservation} = require('../models');

class Controller {

    static loginGet(req,res) {
        res.render('login', {err: req.query.error})
    }

    static loginPost(req,res) {

        let errMsg = []

        if(!req.body.username) {
            errMsg.push('Nama harus di isi')
        }
        if(!req.body.patientPassword) {
            errMsg.push('Password harus di isi')
        } 
        if(errMsg.length) {
            res.redirect(`/patients/login?error=${errMsg}`)
        } else {

            Patient.findOne({
                where: {
                    username: req.body.username,
                    patientPassword: req.body.patientPassword
                }
            })
            .then(data => {
                if(data) {
                    req.session.patientLoginCheck = true
                    res.redirect(`/patients/${data.id}`)
                } else {
                    res.redirect('/patients/login')
                }
            })
            .catch(err => {
                // let showErr = []
    
                res.send(err)
            })
        }

    }

    static registPatientGet(req,res) {
        res.render('registPatient')
    }
    
    static registPatientPost(req,res) {
        let input = {
            patientName: req.body.patientName,
            age: req.body.age,
            username: req.body.username,
            patientPassword: req.body.patientPassword
        }
        Patient.create(input)
        .then(() => {
            res.redirect('/patients/login')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showListDoctor(req,res) {
        let idPatient = req.params.patientId
        console.log(idPatient);
        Doctor.findAll()
        .then(data => {
            res.render('listDoctor', {data, idPatient})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static bookDoctorGet(req,res) {
        let doctorId = req.params.doctorId
        let patientId = req.params.patientId

        let dataPatient 

        Patient.findByPk(patientId)
        .then((data) => {
            dataPatient = data

            return Doctor.findByPk(doctorId)
        })
        .then(dataDoctor => {
            res.render('bookDoctor', {dataPatient, dataDoctor})
        })
        .catch(err => {
            res.send(err)
        })

    }

    static bookDoctorPost(req,res) {
        let doctorId = req.params.doctorId
        let patientId = req.params.patientId
        let photo = req.file.path

        let input = {
            DoctorId: doctorId,
            PatientId: patientId,
            status: false,
            symptom: req.body.symptom,
            photo: photo
        }

        Reservation.create(input)
        .then(() => {
            res.redirect(`/patients/${patientId}/process`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static process(req,res) {
        Patient.findByPk(req.params.patientId, {
            include: [Doctor]
        })
        .then(data => {
            res.render('process', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller