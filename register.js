const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "My+DB+Account",
	database: "register"
});

const select = `SELECT * FROM visitors`;
const update = `UPDATE visitors SET count=(SELECT SUM(count + 1))`;

const updateVisitorsCount = function() {
	connection.query(update, (error, results, fields) => {
		if (error) throw error;
		console.log(results);
	});
};

const getVisitorsCount = function(req, res) {
	let visitorsCount;
	connection.query(select, (error, results, fields) => {
		if (error) throw error;
		visitorsCount = results[0].count;
		res.send("" + visitorsCount);
	});
};

module.exports = { updateVisitorsCount, getVisitorsCount };
