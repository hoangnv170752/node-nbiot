const express = require('express');
const app = express();

app.set('view engine','ejs');  

const path = require('path');
const userModel = require('./models/userModel');
const excelToJson = require('convert-excel-to-json');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 5000;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    // destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var uploads = multer({storage: storage});

mongoose.connect('mongodb://localhost:27017/exceldemo',{useNewUrlParser:true})  
    .then(() => console.log('connected to db'))  
    .catch((err) => console.log(err))  

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/' , (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/uploadfile', uploads.single("uploadfile"), (req, res) => {
    importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
    console.log(res);
})
function importExcelData2MongoDB(filePath){
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
    sourceFile: filePath,
    sheets:[{
    // Excel Sheet Name
        name: 'Customers',
    // Header Row -> be skipped and will not be present at our result object.
        header:{
        rows: 1
        },
    // Mapping columns to keys
        columnToKey: {
        A: '_id',
        B: 'name',
        C: 'address',
        D: 'age'
    }
    }]
});
// -> Log Excel Data to Console
console.log(excelData);
/**
{ 
Customers:
[ 
{ _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
{ _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
{ _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
{ _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
{ _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
] 
}
*/  
// Insert Json-Object to MongoDB
userModel.insertMany(jsonObj,(err,data)=>{  
    if(err){  
    console.log(err);  
    } else{  
    res.redirect('/');  
}  
}); 
fs.unlinkSync(filePath);
}
app.listen(PORT, () => {
    console.log(`Currently running at ${PORT}`)
})
