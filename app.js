const express = require('express')
const app = express()

const port = 3000
const router = require('./routes');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(session({
  secret: 'any',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('photo'))

app.use(router)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})