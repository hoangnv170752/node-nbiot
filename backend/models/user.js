var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User' , userSchema);