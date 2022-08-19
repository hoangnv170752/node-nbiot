let mongoose = require("mongoose");
express = require("express");
router = express.Router();
const axios = require("axios");
let csvToJson = require('convert-csv-to-json');
let fileInputName = 'myInput.csv';
let fileOutputName = 'myOutput.json';
let lightSchema = require("../models/light");
const client = require('../services/mqtt');

router.post("/create-light", (req, res, next) => {
    lightSchema.create(req.body, (error, data) => {
        if (error) {
        return next(error);
        } else {
        console.log(data);
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
})

// Update Light Data
.put((req, res, next) => {
	lightSchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	},
	(error, data) => {
		if (error) {
		return next(error);
		console.log(error);
		} else {
		res.json(data);
		console.log("Light updated successfully !");
		}
	}
	);
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
        console.log(data);
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
