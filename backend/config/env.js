const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({path: path.join(__dirname, '../../.env')});

const envVarsSchema = Joi.object()
    .keys({
        MQTT_HOST: Joi.string().required(),
        MQTT_PORT: Joi.number().required(),
        MQTT_USERNAME: Joi.string().required(),
        MQTT_PASSWORD: Joi.string().required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    mqtt: {
        host: envVars.MQTT_HOST,
        port: envVars.MQTT_PORT,
        username: envVars.MQTT_USERNAME,
        password: envVars.MQTT_PASSWORD,
        url: `mqtt://${envVars.MQTT_USERNAME}:${envVars.MQTT_PASSWORD}@${envVars.MQTT_HOST}:${envVars.MQTT_PORT}`,
    }
};