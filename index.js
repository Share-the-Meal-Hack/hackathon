const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

var mysql = require('mysql');

const port = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: 'etl_airbnb'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
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

app.get("/:team_id", async (req, res) => {
  let { team_id } = req.params;

    try {
    var sql = "select users_live.country, donations_live.team_id, sum(donations_live.meals) as meals_sum from donations_live, users_live where donations_live.user_id in (select distinct users_live.user_id) and donations_live.team_id = '"+team_id+"' GROUP BY users_live.country, donations_live.team_id order by meals_sum desc;";
    //var sql = "SELECT * FROM etl_airbnb.users_live limit 10;";
    //var sql = "SELECT * FROM etl_airbnb.users_live limit 10;";
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

app.get('/country.json', (req, res) => {
  res.send({
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": { "meals": 87 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } },
      { "type": "Feature", "properties": { "meals": 46 }, "geometry": { "type": "Point", "coordinates": [ -150.4048, 63.1224, 105.5 ] } },
      { "type": "Feature", "properties": { "meals": 129 }, "geometry": { "type": "Point", "coordinates": [ -151.3597, 63.0781, 0.0 ] } },
      { "type": "Feature", "properties": { "meals": 42 }, "geometry": { "type": "Point", "coordinates": [ -118.497, 34.299667, 7.64 ] } },
      { "type": "Feature", "properties": { "meals": 222 }, "geometry": { "type": "Point", "coordinates": [ -87.6901, 12.0623, 46.41 ] } },
      { "type": "Feature", "properties": { "meals": 6 }, "geometry": { "type": "Point", "coordinates": [ -151.5053, 63.0719, 0.0 ] } },
      { "type": "Feature", "properties": { "meals": 26 }, "geometry": { "type": "Point", "coordinates": [ -178.4576, -20.2873, 614.26 ] } },
      { "type": "Feature", "properties": { "meals": 4 }, "geometry": { "type": "Point", "coordinates": [ -148.789, 63.1725, 7.5 ] } },
      { "type": "Feature", "properties": { "meals": 39 }, "geometry": { "type": "Point", "coordinates": [ -120.993164, 36.421833, 6.37 ] } },
      { "type": "Feature", "properties": { "meals": 876 }, "geometry": { "type": "Point", "coordinates": [ -117.0155, 33.656333, 12.37 ] } },
      { "type": "Feature", "properties": { "meals": 11 }, "geometry": { "type": "Point", "coordinates": [ -151.512, 63.0879, 10.8 ] } },
      { "type": "Feature", "properties": { "meals": 2 }, "geometry": { "type": "Point", "coordinates": [ -151.4378, 63.0933, 0.0 ] } },
      { "type": "Feature", "properties": { "meals": 29 }, "geometry": { "type": "Point", "coordinates": [ -149.6538, 63.2272, 96.8 ] } },
      { "type": "Feature", "properties": { "meals": 54 }, "geometry": { "type": "Point", "coordinates": [ -151.5325, 63.0844, 0.0 ] } },
      { "type": "Feature", "properties": { "meals": 3 }, "geometry": { "type": "Point", "coordinates": [ -149.4752, 61.8518, 54.3 ] } },
      { "type": "Feature", "properties": { "meals": 10 }, "geometry": { "type": "Point", "coordinates": [ -150.8597, 61.6214, 50.0 ] } },
      { "type": "Feature", "properties": { "meals": 36 }, "geometry": { "type": "Point", "coordinates": [ -149.7142, 62.9656, 93.6 ] } },
      { "type": "Feature", "properties": { "meals": 2 }, "geometry": { "type": "Point", "coordinates": [ -151.2484, 61.2705, 69.1 ] } },
      { "type": "Feature", "properties": { "meals": 1980 }, "geometry": { "type": "Point", "coordinates": [ -152.0732, 65.5942, 14.8 ] } },
      { "type": "Feature", "properties": { "meals": 1 }, "geometry": { "type": "Point", "coordinates": [ -90.5445, 13.5146, 54.36 ] } },
      { "type": "Feature", "properties": { "meals": 38 }, "geometry": { "type": "Point", "coordinates": [ -118.819504, 37.605499, 4.14 ] } },
      { "type": "Feature", "properties": { "meals": 98 }, "geometry": { "type": "Point", "coordinates": [ -118.930168, 37.636833, -0.71 ] } },
      { "type": "Feature", "properties": { "meals": 658 }, "geometry": { "type": "Point", "coordinates": [ -117.509167, 34.1555, 16.34 ] } },
    ]
  }
)})

app.get('/team/:teamId.json', (req, res) => {
  res.send({
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": { "id": "ak16994521", "meals": 3 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } },
      { "type": "Feature", "properties": { "id": "ak16994519", "meals": 7 }, "geometry": { "type": "Point", "coordinates": [ -150.4048, 63.1224, 105.5 ] } },
      { "type": "Feature", "properties": { "id": "ak16994517", "meals": 6 }, "geometry": { "type": "Point", "coordinates": [ -151.3597, 63.0781, 0.0 ] } },
      { "type": "Feature", "properties": { "id": "ci38021336", "meals": 42 }, "geometry": { "type": "Point", "coordinates": [ -118.497, 34.299667, 7.64 ] } },
      { "type": "Feature", "properties": { "id": "us2000b2nn", "meals": 2 }, "geometry": { "type": "Point", "coordinates": [ -87.6901, 12.0623, 46.41 ] } },
      { "type": "Feature", "properties": { "id": "ak16994510", "meals": 6 }, "geometry": { "type": "Point", "coordinates": [ -151.5053, 63.0719, 0.0 ] } },
      { "type": "Feature", "properties": { "id": "us2000b2nb", "meals": 6 }, "geometry": { "type": "Point", "coordinates": [ -178.4576, -20.2873, 614.26 ] } },
      { "type": "Feature", "properties": { "id": "ak16994298", "meals": 4 }, "geometry": { "type": "Point", "coordinates": [ -148.789, 63.1725, 7.5 ] } },
      { "type": "Feature", "properties": { "id": "nc72905861", "meals": 39 }, "geometry": { "type": "Point", "coordinates": [ -120.993164, 36.421833, 6.37 ] } },
      { "type": "Feature", "properties": { "id": "ci38021304", "meals": 11 }, "geometry": { "type": "Point", "coordinates": [ -117.0155, 33.656333, 12.37 ] } },
      { "type": "Feature", "properties": { "id": "ak16994293", "meals": 5 }, "geometry": { "type": "Point", "coordinates": [ -151.512, 63.0879, 10.8 ] } },
      { "type": "Feature", "properties": { "id": "ak16994287", "meals": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.4378, 63.0933, 0.0 ] } },
      { "type": "Feature", "properties": { "id": "ak16994285", "meals": 5 }, "geometry": { "type": "Point", "coordinates": [ -149.6538, 63.2272, 96.8 ] } },
      { "type": "Feature", "properties": { "id": "ak16994283", "meals": 4 }, "geometry": { "type": "Point", "coordinates": [ -151.5325, 63.0844, 0.0 ] } },
      { "type": "Feature", "properties": { "id": "ak16994280", "meals": 3 }, "geometry": { "type": "Point", "coordinates": [ -149.4752, 61.8518, 54.3 ] } },
      { "type": "Feature", "properties": { "id": "ak16994278", "meals": 8 }, "geometry": { "type": "Point", "coordinates": [ -150.8597, 61.6214, 50.0 ] } },
      { "type": "Feature", "properties": { "id": "ak16994274", "meals": 9 }, "geometry": { "type": "Point", "coordinates": [ -149.7142, 62.9656, 93.6 ] } },
      { "type": "Feature", "properties": { "id": "ak16994273", "meals": 2 }, "geometry": { "type": "Point", "coordinates": [ -151.2484, 61.2705, 69.1 ] } },
      { "type": "Feature", "properties": { "id": "ak16994270", "meals": 0 }, "geometry": { "type": "Point", "coordinates": [ -152.0732, 65.5942, 14.8 ] } },
      { "type": "Feature", "properties": { "id": "us2000b2ly", "meals": 1 }, "geometry": { "type": "Point", "coordinates": [ -90.5445, 13.5146, 54.36 ] } },
      { "type": "Feature", "properties": { "id": "nc72905841", "meals": 38 }, "geometry": { "type": "Point", "coordinates": [ -118.819504, 37.605499, 4.14 ] } },
      { "type": "Feature", "properties": { "id": "nc72905836", "meals": 4 }, "geometry": { "type": "Point", "coordinates": [ -118.930168, 37.636833, -0.71 ] } },
      { "type": "Feature", "properties": { "id": "ci38021272", "meals": 34 }, "geometry": { "type": "Point", "coordinates": [ -117.509167, 34.1555, 16.34 ] } },
    ]
  }
)})

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
