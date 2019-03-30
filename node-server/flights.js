const Amadeus = require('amadeus');
// const fs = require('fs');

const amadeus = new Amadeus({
  clientId: 'cdKClxFRrtRLLQWMHhyQjqbpYUaWKwA9',
  clientSecret: 'pbwBckoaG2AfPUvO'
});

const getFlights = (origin, destination, departureDate) => {
  amadeus.shopping.flightOffers.get({
      origin : origin,
      destination : destination,
      departureDate : departureDate
  })
  .then(res => {
    return JSON.stringify(res.result['data'][0]);
  })
  .catch(err => console.log(err));
}

module.exports = getFlights;
