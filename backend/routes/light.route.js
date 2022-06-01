let mongoose = require("mongoose");
express = require("express");
router = express.Router();

// Student Model
let lightSchema = require("../models/light");

// CREATE Student
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

module.exports = router;
