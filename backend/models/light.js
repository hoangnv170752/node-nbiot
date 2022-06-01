var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var lightSchema = new Schema({
    name: {
        type: String
    },
    MAC: {
        type: String
    },
    project: {
        type: String
    }
}, {
    collection: 'lights'
})

module.exports = mongoose.model('Light' , lightSchema);