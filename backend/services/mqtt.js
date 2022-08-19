const mqtt = require('mqtt');
const fs = require('fs');
const axios = require('axios');
const { Command} = require('commander');
const { argv } = require('process');
const program = new Command()
program
  .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
  .parse(process.argv)

const host = '112.137.129.232'
const port = '3705'

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

  console.log(info);
  if(messageId.TYPCMD == "GetConfigServer") {
    setTimeout(() => {
      client.publish(topic2, JSON.stringify(info) , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.log(error)
        }
      })
    }, 1000)
  }
  else if(messageId.TYPCMD == 'UpConfigServer') {
    setTimeout(() => {
      client.publish(topic2, JSON.stringify(rec) , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.log(error)
        }
      })
    }, 1000)
  }
 
})

