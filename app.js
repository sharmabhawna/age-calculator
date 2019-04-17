const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { updateVisitorsCount, getVisitorsCount } = require("./register");

const { AgeCalculator } = require("./ageCalculator");

const ageCalculator = new AgeCalculator();

const logRequest = function(req, res, next) {
	console.log(req.url);
	next();
};

const calculateAge = function(req, res) {
	const birthDay = req.body;
	res.send(ageCalculator.computeAge(birthDay));
	updateVisitorsCount();
};

app.use(logRequest);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"));
app.post("/age", calculateAge);
app.get("/visitorsCount", getVisitorsCount);

module.exports = { app };
