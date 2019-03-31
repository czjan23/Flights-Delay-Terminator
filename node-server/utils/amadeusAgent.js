const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'cdKClxFRrtRLLQWMHhyQjqbpYUaWKwA9',
  clientSecret: 'pbwBckoaG2AfPUvO'
});

const amadeusQuery = (origin, destination, departureDate) => {
  return amadeus.shopping.flightOffers.get({
    origin : origin,
    destination : destination,
    departureDate : departureDate,
    currency: 'USD'
  });
}

module.exports = amadeusQuery;
