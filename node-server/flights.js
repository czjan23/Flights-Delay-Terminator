const Amadeus = require('amadeus');
const fs = require('fs');

const amadeus = new Amadeus({
  clientId: 'cdKClxFRrtRLLQWMHhyQjqbpYUaWKwA9',
  clientSecret: 'pbwBckoaG2AfPUvO'
});

amadeus.shopping.flightOffers.get({
  origin : 'IAH',
  destination : 'SFO',
  departureDate : '2019-04-02'
})
.then(res => {
  fs.writeFileSync('test.json', JSON.stringify(res.result['data']));
})
.catch(err => console.log(err));