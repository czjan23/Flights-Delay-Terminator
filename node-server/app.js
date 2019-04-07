const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const cities = require('./data/cities');
const process = require('./utils/dataProcess');
const amadeusQuery = require('./utils/amadeusAgent');
const flightModel = require('./utils/mongoAgent');

app.use(cors());

app.get('/cities', (req, res) => {
  res.send(cities);
});

app.get('/flights', (req, res) => {
  amadeusQuery(req.query.origin, req.query.destination, req.query.departureDate)
  .then(res => JSON.stringify(process(res.result['data'])))
  .then(flights => {
    res.send(flights);
  })
  .catch(err => res.send(['no match']));
});

app.get('/delayData', (req, res) => {
  let flightNumArray = req.query.flightNum;
  flightModel.find({ code: {$in : flightNumArray}}, function (err, flightDelayDataArray) {
      if (err) throw err;
      res.send(flightDelayDataArray);
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
