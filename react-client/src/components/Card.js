import React from 'react';
import Divider from '@material-ui/core/Divider';
import './Card.css';

class Card extends React.Component {
  getTime(date) {
    return new Date(date).toLocaleTimeString();
  }

  getTimeRange(segments) {
    let start = new Date(segments[0].flightSegment.departure.at);
    let end = new Date(segments[segments.length - 1].flightSegment.arrival.at);
    let h = (end - start) / 3600000;
    let hours = Math.floor(h);
    let mins = Math.floor((h - hours) * 60);
    return hours + 'h ' + mins + 'm';
  }

  getInterval(prev, next) {
    let start = new Date(prev.flightSegment.arrival.at);
    let end = new Date(next.flightSegment.departure.at);
    let h = (end - start) / 3600000;
    let hours = Math.floor(h);
    let mins = Math.floor((h - hours) * 60);
    return hours + 'h ' + mins + 'm';
  }

  render() {
    let plan = this.props.flight.offerItems[0];
    let price = plan.price.total;
    let segments = plan.services[0].segments;

    return (
      <div style={{border: '2px solid black', width: '300px', margin: '10px 0'}}>
      <div>
        <h3>total price: ${price}</h3>
        <h3>total time: {this.getTimeRange(segments)}</h3>
        <Divider />
        {segments.map((segment, index) => {
            return (
                <div key={index}>
                    <p>{segment.flightSegment.carrierCode} {segment.flightSegment.number}</p>
                    <p>{segment.flightSegment.departure.iataCode} - {segment.flightSegment.arrival.iataCode}</p>
                    <p>{this.getTime(segment.flightSegment.departure.at)} - {this.getTime(segment.flightSegment.arrival.at)}</p>
                    <Divider />
                    {index !== segments.length - 1 ? <h4>Wait {this.getInterval(segment, segments[index + 1])}</h4> : ''}
                    {index !== segments.length - 1 ? <Divider /> : ''}
                </div>
            )
        })}
        </div>
      </div>
    );
  }
}

export default Card;
