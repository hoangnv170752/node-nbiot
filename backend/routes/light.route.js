let mongoose = require("mongoose");
express = require("express");
router = express.Router();
const axios = require("axios");
let csvToJson = require('convert-csv-to-json');
let fileInputName = 'myInput.csv';
let fileOutputName = 'myOutput.json';
let lightSchema = require("../models/light");
const client = require('../services/mqtt');
const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://hoangpresident:egoistic99@backend.pbxpq.mongodb.net/";
router.post("/create-light", (req, res, next) => {
    lightSchema.create(req.body, (error, data) => {
        if (error) {
        return next(error);
        } else {
        res.json(data);
        }
    });
});
// const topic = 'test/mqtt'

// READ lights
router.get("/", (req, res) => {
	lightSchema.find((error, data) => {
		if (error) {
		return next(error);
		} else {
		res.json(data);
		}
	});
});

// UPDATE light
router
.route("/update-light/:id")
// Get Single Light
.get((req, res) => {
		lightSchema.findById(
			req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

router.post("/lightask", (req, res, next) => {
	async function findByName(MAC) {
		try {
		  const light = await lightSchema.find({ MAC });
		  res.status(200).json({ msg: light });
		  return light;
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ error: 'Internal Server Error' });
		  throw new Error('Error finding people by name');
		}
	}
	findByName(req.body.Dev)
});

router
.route("/status-light")
// Update Light Data
.put((req, res, next) => {
	async function updateDocument(req, res) {
		try {
		  const client = await MongoClient.connect(url);
		  const db = client.db('IOT_PROJECT');
		  
		  const collection = db.collection('lights');
		  const query = { MAC: req.body.Dev };
		  const update = { $set: { STATUS: true } };
	  
		  await collection.updateOne(query, update);
	  
		  res.status(200).json({ msg: req.body });
		  
		  client.close();
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ error: 'Internal Server Error' });
		}
	}
	updateDocument(req, res);
	
});

//Delete Light Data
router.delete("/delete-light/:id",
(req, res, next) => {
lightSchema.findByIdAndRemove(
	req.params.id, (error, data) => {
	if (error) {
	return next(error);
	} else {
	res.status(200).json({
		msg: data,
	});
	}
});
});
// Send Lights' excel file 
router.post("/config-light", (req, res, next) => {
    csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
	lightSchema.create(req.body, (error, data) => {
        if (error) {
        return next(error);
        } else {
        res.json(data);
        }
    });
});
// Add light data 
axios
	.get("http://localhost:5000/lights/")
	.then(res => {
		console.log(`status ${res.status}`);
		console.log(res);
	
	})
	.catch(error => {
		console.log(error);
	});

//get single light data
router.get("/light/:id", (req, res, next) => {
	lightSchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

module.exports = router;
