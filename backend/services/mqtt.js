const mqtt = require('mqtt');
const fs = require('fs');
const axios = require('axios');
const { Command} = require('commander');
const { argv } = require('process');

const program = new Command()
program
  .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
  .parse(process.argv)

const host = '103.161.181.124'
const port = '5005'

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const OPTIONS = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'sm',
    password: '12101998',
    reconnectPeriod: 1000,
}

const PROTOCOLS = ['mqtt', 'mqtts', 'ws', 'wss']
let connectUrl = `mqtt://${host}:${port}`
// var portrd = 1883
// var rqird = "rqi6110971745359794"
// var data = {}
// data.Rqi = rqird
// data.TYPCMD = "UpConfigServer"
// data.SERVER_ADDRESS = "14.225.13.96"
// data.SERVER_MQTT_PORT = portrd
// data.SERVER_MQTT_USER = "sm"
// data.SERVER_MQTT_PASS = "sm#@123"
// data.CSE_ID = "rd"
// data.CSE_NAME = "icc"
// data.FROM_ID = "thunghiem"
// data.APP_ID = "R.app2.thunghiem.com.vn"
// console.log(data);
const client = mqtt.connect(connectUrl, OPTIONS)
client.on('connect', () => {
  console.log(`${program.protocol}: Connected`)
  client.subscribe([topic], () => {
    console.log(`${program.protocol}: Subscribe to topic '${topic}'`)
  })
})

client.on('reconnect', (error) => {
  console.log(`Reconnecting(${program.protocol}):`, error)
})

client.on('error', (error) => {
  console.log(`Cannot connect(${program.protocol}):`, error)
})

const topic = "config/+/rd/json"
client.on('message', (topic, payload) => {
  const messageId = JSON.parse(payload)
  const rqird = messageId.Rqi
  const portrd = 1883
  const macID_dev1 = messageId.Dev
  const topic2 = `config/rd/${macID_dev1}/json`
  var info = {}
  info.Rqi = rqird
  info.TYPCMD = "RspConfigServer"
  info.SERVER_ADDRESS = "14.225.13.96"
  info.SERVER_MQTT_PORT = portrd
  info.SERVER_MQTT_USER = "sm"
  info.SERVER_MQTT_PASS = "sm#@123"
  info.CSE_ID = "rd"
  info.CSE_NAME = "icc"
  info.FROM_ID = "thunghiem"
  info.APP_ID = "R.app2.thunghiem.com.vn"
  // {
  //   "Rqi": "rqi690201777208127",
  //   "TYPCMD": "UpConfigServerOk"
  // }
  var rec = {}
 // const rqird = messageId2.Rqi
  rec.Rqi = rqird
  rec.TYPCMD = "UpConfigServerOk"

  if(messageId.TYPCMD == "GetConfigServer") {
    var response = [];
    axios
      .post("https://node-nbiot.onrender.com/lights/lightask", messageId)
      .then(res => {
        response = res.data.msg[0];
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
    setTimeout(() => {
      var infoTest = {}
      if(response != null) {
        infoTest.Rqi = rqird
        infoTest.Vendor_ID = response.vendor
        infoTest.CLIENTID = response.Client_Id
        infoTest.TYPCMD = "RspConfigServer"
        infoTest.SERVER_ADDRESS = response.SERVER_ADDRESS
        infoTest.SERVER_MQTT_PORT = response.SERVER_MQTT_PORT
        infoTest.SERVER_MQTT_USER = response.SERVER_MQTT_USER
        infoTest.SERVER_MQTT_PASS = response.SERVER_MQTT_PASS
        infoTest.CSE_ID = response.CSE_ID
        infoTest.CSE_NAME = response.CSE_NAME
        infoTest.FROM_ID = response.FROM_ID
        infoTest.APP_ID = response.APP_ID
        client.publish(topic2, JSON.stringify(infoTest) , { qos: 0, retain: false }, (error) => {
          console.log(infoTest)
          if (error) {
            console.log(error)
          }
        })}
      console.log(infoTest);
    }, 1000)

  }
  else if(messageId.TYPCMD == 'UpConfigServer') {
    var response = [];
    axios
      .post("https://node-nbiot.onrender.com/lights/lightask", messageId)
      .then(res => {
        response = res.data.msg[0];
      })
      .catch(error => {
        console.log(error);
      });
    
    setTimeout(() => {
      var infoTest2 = {}
      infoTest2.Rqi = rqird
      infoTest2.Vendor_ID = response.Vendor_ID
      infoTest2.CLIENTID = response.Client_Id
      infoTest2.TYPCMD = "UpConfigServerOk"
      infoTest2.SERVER_ADDRESS = response.SERVER_ADDRESS
      infoTest2.SERVER_MQTT_PORT = response.SERVER_MQTT_PORT
      infoTest2.SERVER_MQTT_USER = response.SERVER_MQTT_USER
      infoTest2.SERVER_MQTT_PASS = response.SERVER_MQTT_PASS
      infoTest2.CSE_ID = response.CSE_ID
      infoTest2.CSE_NAME = response.CSE_NAME
      infoTest2.FROM_ID = response.FROM_ID
      infoTest2.APP_ID = response.APP_ID
      if (
        infoTest2.SERVER_ADDRESS == messageId.SERVER_ADDRESS && 
        infoTest2.Vendor_ID == messageId.Vendor_ID && 
        infoTest2.CLIENTID == response.Client_Id &&
        infoTest2.SERVER_MQTT_PORT == messageId.SERVER_MQTT_PORT && 
        infoTest2.SERVER_MQTT_USER == messageId.SERVER_MQTT_USER &&
        infoTest2.SERVER_MQTT_PASS == messageId.SERVER_MQTT_PASS &&
        infoTest2.CSE_ID == messageId.CSE_ID &&
        infoTest2.CSE_NAME == messageId.CSE_NAME &&
        infoTest2.FROM_ID == messageId.FROM_ID &&
        infoTest2.APP_ID == messageId.APP_ID 
      ) {
        client.publish(topic2, JSON.stringify(infoTest2) , { qos: 0, retain: false }, (error) => {
          if (error) {
            console.log(error)
          }
        })
        axios
        .put("https://node-nbiot.onrender.com/lights/status-light", messageId)
        .then(res => {
          console.log(`status ${res.status}`);
          console.log(messageId);
          console.log(macID_dev1)
        })
        .catch(error => {
          console.log(error);
        });
      }
      else {
        alert("Lỗi , check lại đeee!!"); 
      }
    }, 1000)
  }
  // else if(messageId.TYPCMD == 'UpConfigServerOk') {
   
  // }
})

