const express = require('express');
const app = express();
require('dotenv').config();
app.set('view engine','ejs');  


let dbConfig = require('./database/db');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const lightRoute = require('../backend/routes/light.route');
let userSchema = require("./models/user");
// const { default: App } = require('../frontend/src/App');


const fileStoreEngine = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./logs");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
})
const upload = multer({
  storage: fileStoreEngine
});

// Configure mongoDB Database
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
  
// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(() => {
  console.log('Database successfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/lights', lightRoute)

// SIGN IN
app.post('./sign-in', (req, res) => {
    
})
// Upload file
app.post('/config-light', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})
app.post('/upload', upload.single('file'),(req,res) => {
  console.log('Upload API')
  if(!req.file){
      res.status(400).send("Error: no files found")
  }
  const blob = firebase.bucket.file(req.file.originalname)

  const blobWriter = blob.createWriteStream({
      metadata: {
          contentType: req.file.minitype
      }
  })
  blobWriter.on('error', (err) => {
      console.log(err)
  })
  blobWriter.on('finish', () => {
      res.status(200).send('Uploaded file')
  })
  blobWriter.end(req.file.buffer)
})
app.post('/single', upload.single('file'),(req,res) => {
  console.log(req.file);
  res.send('Single file upload send');
});
// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
  
// 404 Error
app.use((req, res, next) => {
  res.status(404).send('Error 404!')
});
//sign-in 
app.post("/login", (req, res) => {
  const {email, password} = req.body;
  userSchema.findOne({ email: email},(err, user) => {
    if(user){
        if(password === user.password){
            res.send({message: 'login successfully', user: user})
        }else {
            res.send({message: "wrong credentials"})
        }
    }else {res.send("not register")}
  })
});
//sign-up
app.post("/signup", (req, res) => {
  console.log(req.body)
  const { name , email, password } = req.body;
  user.findOne({
    email: email,
  }, (err, user) => {
    if(user){
      res.send({message: 'user already existed'})
    }else {
      const user = new user({name, email, password})
      user.save(
        err => {
          if(err){
          res.send(err)
        } else {
          res.send({message: "successful"})
        }}
      )
    }
  })
})

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});