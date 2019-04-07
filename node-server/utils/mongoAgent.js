const mongoose = require('mongoose');
mongoose.connect('mongodb://czjan23:12345678a@ds133086.mlab.com:33086/flight-delay-craker', {useNewUrlParser: true});

const FlightSchema = new mongoose.Schema({
    code: String,
    delay_rate: Number,
    avg_delay_time: Number
});

const FlightModel = mongoose.model("FlightModel", FlightSchema);

module.exports = FlightModel;