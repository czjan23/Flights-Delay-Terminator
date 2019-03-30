const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const Amadeus = require('amadeus');
const cities = require('./cities');

app.use(cors());

const amadeus = new Amadeus({
  clientId: 'cdKClxFRrtRLLQWMHhyQjqbpYUaWKwA9',
  clientSecret: 'pbwBckoaG2AfPUvO'
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/cities', (req, res) => {
    res.send(cities);
});

app.get('/flights', (req, res) => {
    amadeus.shopping.flightOffers.get({
        origin : req.query.origin,
        destination : req.query.destination,
        departureDate : req.query.departureDate
    })
    .then(res => JSON.stringify(res.result['data']))
    .then(data => {
      res.send(data);
    })
    .catch(err => res.send("no match"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
