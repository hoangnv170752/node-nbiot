const httpStatus = require('http-status');
const { instance } = require('../modules/mqtt.module');
// const pick = require('../utils/pick');
const { mqtt, relayTypes } = require('../config/constant');
//const logger = require('../config/logger');
//const ApiError = require('../utils/ApiError');

const sendRequest = (topic, payload) => {
    instance.sendMessage(topic, payload);
};
const sendRequestAndAddMessageQueue = (light, payload, IDMessage, cb) => {
    instance.sendMessageAndAddMessageQueue(light, payload,IDMessage, cb);
}
const sendRequestDeleteDevice = async (topic, lightid, type) => {
    const payload = {
        Head: {
            IDMessage: 'abcdefgh',
            TypeMessage: mqtt.Send,
            FormData: mqtt.FormDataDevice,
            DateTime: new Date().getTime() / 1000,
        }
    };
    sendRequest(topic, payload);
}
const sendRequestAddDevice = async (lightid, type, device) => {
    const body = {
        Type: type,
        Action: mqtt.DeviceActionAddition,
        ID: device.mac,
        Pin: device.pin,
        Name: device.name,
    };
    const payload = {
        Head: {
            IDMessage: 'abcdefgh',
            TypeMessage: mqtt.Receive,
            FormData: mqtt.FormDataDevice,
            IDGateway: lightid,
            DateTime: new Date().getTime() / 1000,
        },
        Device: [body],
    };
    sendRequest(lightid, payload);
};
const sendRequestAddDeviceWithCallback = async (lightid, type, device, cb) => {
    const body = {
        Type: type,
        Action: mqtt.DeviceActionAddition,
        ID: device.mac,
        Pin: device.pin,
        Name: device.name,
    };
    const IDMessage = device.id;
    const payload = {
        Head: {
            IDMessage,
            TypeMessage: mqtt.Receive,
            FormData: mqtt.FormDataDevice,
            IDGateway: lightid,
            DateTime: new Date().getTime() / 1000,
        },
        Device: [body],
    };
    sendRequestAndAddMessageQueue(lightid, payload, IDMessage, cb);
};

const receiveResponse = (res) => {
    instance.receiveMessage(res.Head.IDMessage);
}
module.exports = {
    sendRequestAddDevice,
    receiveResponse,
    sendRequestAddDeviceWithCallback
}