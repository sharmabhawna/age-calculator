const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { AgeCalculator } = require("./ageCalculator");

const ageCalculator = new AgeCalculator();

const calculateAge = function(req, res) {
	const birthDay = req.body;
	res.send(ageCalculator.computeAge(birthDay));
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./build"));
app.post("/age", calculateAge);

module.exports = { app };
