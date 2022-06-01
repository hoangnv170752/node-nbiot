var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var lightSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    rollno: {
        type: Number
    }
}, {
    collection: 'lights'
})

module.exports = mongoose.model('Light' , lightSchema);