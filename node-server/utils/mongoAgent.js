const mongoose = require('mongoose');
mongoose.connect('mongodb://czjan23:12345678a@ds133086.mlab.com:33086/flight-delay-craker', {useNewUrlParser: true});

const FlightSchema = new mongoose.Schema({
    code: String,
    delay_rate: Number,
    avg_delay_time: Number
});

const CarrierSchema = new mongoose.Schema({
    code: String,
    delay_rate: Number,
    avg_delay_time: Number
});

const FromtoSchema = new mongoose.Schema({
    from_to: String,
    delay_rate: Number,
    avg_delay_time: Number
});

const FlightModel = mongoose.model("FlightModel", FlightSchema);
const CarrierModel = mongoose.model("CarrierModel", CarrierSchema);
const FromtoModel = mongoose.model("FromtoModel", FromtoSchema);

const DBModels = {
    FlightModel: FlightModel,
    CarrierModel: CarrierModel,
    FromtoModel: FromtoModel,
}

module.exports = DBModels;