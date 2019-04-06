const abbrToFull = require('../data/carriers');
const airlineList = ['5Y', 'AA', 'AS', 'B6', 'DL', 'F9', 'G4', 'HA', 'NK', 'UA'];

const getTimeRange = (startTime, endTime) => {
  let start = new Date(startTime);
  let end = new Date(endTime);
  let h = (end - start) / 3600000;
  let hours = Math.floor(h);
  let mins = Math.floor((h - hours) * 60);
  return hours + 'h ' + mins + 'm';
}

const getTotalTime = (segments) => {
  return getTimeRange(segments[0].flightSegment.departure.at, segments[segments.length - 1].flightSegment.arrival.at);
}

const getInterval = (prev, next) => {
  return getTimeRange(prev.flightSegment.arrival.at, next.flightSegment.departure.at);
}

const getTime = (date) => {
  return new Date(date).toLocaleTimeString();
}

const getCarrierCode = (segments) => {
  let firstSegmentAirline = segments[0].flightSegment.carrierCode;
  if (!airlineList.includes(firstSegmentAirline)) {
    return 'default';
  }

  if (segments.length > 1) {
    for (let i = 1; i < segments.length; i++) {
      if (segments[i].flightSegment.carrierCode !== firstSegmentAirline) {
        return 'multi';
      }
    }
  }

  return firstSegmentAirline;
}

const process = (data) => {
  let flights = [];
  data.forEach(item => {
    let plan = item.offerItems[0];
    let segments = plan.services[0].segments;
    let totalPrice = plan.price.total;
    let totalTime = getTotalTime(segments);
    let carrierCode = getCarrierCode(segments);
    let pieces = [];
    let intervals = [];
    segments.forEach((segment, index) => {
      pieces.push({
        segmentCarrierFull: abbrToFull[segment.flightSegment.carrierCode],
        segmentCarrierCode: segment.flightSegment.carrierCode,
        number: segment.flightSegment.number,
        departureAirport: segment.flightSegment.departure.iataCode,
        arrivalAirport: segment.flightSegment.arrival.iataCode,
        departureTime: getTime(segment.flightSegment.departure.at),
        arrivalTime: getTime(segment.flightSegment.arrival.at),
        duration: getTimeRange(segment.flightSegment.departure.at, segment.flightSegment.arrival.at)
      });
      if (index !== segments.length - 1) {
        intervals.push(getInterval(segment, segments[index + 1]));
      }
    })
    flights.push({
      totalPrice: totalPrice,
      totalTime: totalTime,
      carrierCode: carrierCode,
      carrierName: abbrToFull[carrierCode],
      pieces: pieces,
      intervals: intervals
    });
  });
  return flights;
}

module.exports = process;
