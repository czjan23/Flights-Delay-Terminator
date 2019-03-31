const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const cities = require('./data/cities');
const process = require('./utils/dataProcess');
const amadeusQuery = require('./utils/amadeusAgent');

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
