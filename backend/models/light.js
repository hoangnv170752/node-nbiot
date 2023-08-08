var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var lightSchema = new Schema({
    project: {
        type: String
    },
    vendor: {
        type: Number
    },
    SERVER_ADDRESS: {
        type: String
    },
    SERVER_MQTT_PORT: {
        type: Number
    },
    SERVER_MQTT_USER: {
        type: String
    },
    SERVER_MQTT_PASS: {
        type: String
    },
    CSE_ID: {
        type: String
    },
    CSE_NAME: {
        type: String
    },
    FROM_ID: {
        type: String
    },
    APP_ID: {
        type: String
    },
    MAC: {
        type: String
    },
    STATUS: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'lights'
})

module.exports = mongoose.model('Light' , lightSchema);