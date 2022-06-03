const express = require('express');
const app = express();

app.set('view engine','ejs');  

let dbConfig = require('./database/db');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const lightRoute = require('../backend/routes/light.route');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    // destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/lights', lightRoute)

// SIGN IN
app.post('./sign-in', (req, res) => {
    
})
// Upload file
app.post('/lights/config-light', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})

// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
  
// 404 Error
app.use((req, res, next) => {
  res.status(404).send('Error 404!')
});
  
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});