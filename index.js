const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const countries_list = require('./countries_list');
const countries_hash = countries_list.reduce((memo, elem) => {
  memo[elem.country] = elem;
  return memo;
}, {})
//var mysql = require('mysql');

const SocksConnection = require('socksjs');
//const mysql = require('mysql2');
const fixieUrl = process.env.FIXIE_SOCKS_HOST;
const fixieUrl = 'fixie:ea3XRkOvLparGZf@speedway.usefixie.com:1080';
console.log('wat' + fixieUrl);
const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'));

const port = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var con = mysql.createConnection({
//   host: process.env.dbhost,
//   user: process.env.dbuser,
//   password: process.env.dbpassword,
//   database: 'etl_airbnb'
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });



const mysqlServer = {
  host: process.env.dbhost,
  port: 3306
};

const dbUser = process.env.dbuser;
const dbPassword = process.env.dbpassword;
const db = 'etl_airbnb';

const fixieConnection = new SocksConnection(mysqlServer, {
  user: fixieValues[0],
  pass: fixieValues[1],
  host: fixieValues[2],
  port: fixieValues[3],
});

var con = mysql.createConnection({
  user: dbUser,
  password: dbPassword,
  database: db,
  stream: fixieConnection
});





app.get("/list", async (req, res) => {
  try {
    //var sql = "select users_live.country, donations_live.team_id, sum(donations_live.meals) as meals_sum from donations_live, users_live where donations_live.user_id in (select distinct users_live.user_id) and donations_live.team_id = 'HendSabri' GROUP BY users_live.country, donations_live.team_id order by meals_sum desc;";
    //var sql = "SELECT * FROM etl_airbnb.users_live limit 10;";
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

app.get("/team/:team_id", async (req, res) => {
  let { team_id } = req.params;

    try {
    var sql = "select users_live.country, donations_live.team_id, sum(donations_live.meals) as meals_sum from donations_live, users_live where users_live.country is not NULL and donations_live.user_id in (select distinct users_live.user_id) and donations_live.team_id = '"+team_id+"' GROUP BY users_live.country, donations_live.team_id order by meals_sum desc;";
    //var sql = "SELECT * FROM etl_airbnb.users_live limit 10;";
    //var sql = "SELECT * FROM etl_airbnb.users_live limit 10;";
    con.query(
    sql,
    (err, rows) => {
      if(err) throw err;
      var ret = [];
      rows.forEach(element => {
        var country = countries_hash[element.country];
        if(country)
          ret.push({ "type": "Feature", "properties": { "meals": element.meals_sum, country: element.country }, "geometry": { "type": "Point", "coordinates": [ countries_hash[element.country].longitude, countries_hash[element.country].latitude, 0.0 ] } },);
          ret.push({ "type": "Feature", "properties": { "meals": 0, country: element.country }, "geometry": { "type": "Point", "coordinates": [ countries_hash[element.country].longitude, countries_hash[element.country].latitude, 0.0 ] } },);
      });
      res.send({
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": ret
      }
    )
  });


  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

app.get('/country.json', (req, res) => {
  con.query(
    `select users_live.country, donations_live.team_id, sum(donations_live.meals) as meals_sum from donations_live, users_live where donations_live.user_id in (select distinct users_live.user_id) and donations_live.team_id = 'HendSabri' GROUP BY users_live.country, donations_live.team_id order by meals_sum desc`,
    (err, rows) => {
      if(err) throw err;
      var ret = [];
      rows.forEach(element => {
        ret.push({ "type": "Feature", "properties": { "meals": element.meals_sum, country: element.country }, "geometry": { "type": "Point", "coordinates": [ countries_hash[element.country].longitude, countries_hash[element.country].latitude, 0.0 ] } },)
        ret.push({ "type": "Feature", "properties": { "meals": 0, country: element.country }, "geometry": { "type": "Point", "coordinates": [ countries_hash[element.country].longitude, countries_hash[element.country].latitude, 0.0 ] } },);
      });
      res.send({
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": ret
      }
    )
  });
})

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
