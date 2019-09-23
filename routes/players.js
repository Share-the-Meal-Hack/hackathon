const express = require("express");
const router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/list", async (req, res) => {
  try {
	  //var sql = "select users_live.country, donations_live.team_id, sum(donations_live.meals) as meals_sum from donations_live, users_live where donations_live.user_id in (select distinct users_live.user_id) and donations_live.team_id = 'HendSabri' GROUP BY users_live.country, donations_live.team_id order by meals_sum desc;";
	  var sql = "SELECT * FROM etl_airbnb.users_live limit 10;";
	  con.query(sql, function (err, result) {
	  if (err)
	  {
	  	throw err;
	  }
	      res.status(200).json({
      data: result
    });

    console.log("Result: " + result);
  		});


  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;
