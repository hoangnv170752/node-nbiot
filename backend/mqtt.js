const mqtt = require('./services/mqtt.module');
const env = require('./config/env');
const { Light } = require('./models');

const connect = new Promise((res, rej) => {
    const client = mqtt.connect(env.mqtt);
    client.on('connect', () => {
        logger
    })
})