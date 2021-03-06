const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { AgeCalculator } = require("./ageCalculator");

const ageCalculator = new AgeCalculator();

const connection = mysql.createConnection({
	user: process.env.USER_NAME,
	host: process.env.HOST_NAME,
	database: process.env.DB_NAME || "age_calculator_db",
	password: process.env.PASSWORD
});

const select = `SELECT * FROM visitors`;
const update = `UPDATE visitors SET count=(SELECT SUM(count + 1))`;

const getVisitorsCount = function(req, res) {
	let visitorsCount;
	connection.query(select, (error, results, fields) => {
		if (error) throw error;
		visitorsCount = results[0].count;
		res.send("" + visitorsCount);
	});
};

const calculateAge = function(req, res) {
	const birthDay = req.body;
	res.send(ageCalculator.computeAge(birthDay));
	connection.query(update, (error, results, fields) => {
		if (error) throw error;
		console.log(results);
	});
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/age", calculateAge);
app.get("/visitorsCount", getVisitorsCount);
app.use(express.static("age-calculator-frontend/build"));

module.exports = { app };
