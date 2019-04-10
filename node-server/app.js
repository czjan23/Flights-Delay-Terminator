const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const cities = require('./data/cities');
const process = require('./utils/dataProcess');
const amadeusQuery = require('./utils/amadeusAgent');
const DBModels = require('./utils/mongoAgent');

app.use(cors());

app.get('/cities', (req, res) => {
  res.send(cities);
});

app.get('/flights', (req, res) => {
  amadeusQuery(req.query.origin, req.query.destination, req.query.departureDate)
  .then(res => process(res.result['data']))
  .then(flightsData => {
    let flights = flightsData.flights;
    let segmentCount = flightsData.segmentCount;
    let count = 0;
    Object.keys(flights).map(function(key1) {
      let pieces = flights[key1].pieces;
      Object.keys(pieces).map(function(key2) {
        let segment = pieces[key2];
        let flightNumber = `${segment.segmentCarrierCode}_${segment.number}`;
        let from_to = `${segment.departureAirport}_${segment.arrivalAirport}`;
        DBModels.FlightModel.findOne({ code: flightNumber }, function (err, flightDelayData) {
          if (err) throw err;
          segment.directDelay = flightDelayData;
          DBModels.FromtoModel.findOne({ from_to: from_to }, function (err, fromToDelayData) {
            if (err) throw err;
            segment.estimateFromToDelay = fromToDelayData;
            DBModels.CarrierModel.findOne({ code: segment.segmentCarrierCode }, function (err, carrierDelay) {
              if (err) throw err;
              segment.estimateCarrierDelay = carrierDelay;
              pieces[key2] = segment;
              flights[key1].pieces = pieces;
              count++;
              if (count === segmentCount) {
                res.send(JSON.stringify(flights));
              }
            });
          });
        });
      });
    })
  })
  .catch(err => res.send(['no match']));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
