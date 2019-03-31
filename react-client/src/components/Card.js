import React from 'react';
import Divider from '@material-ui/core/Divider';
import './Card.css';

class Card extends React.Component {
  render() {
    let code = this.props.flight.pieces[0].carrierCode;
    return (
      <div className='card-outline'>
      <div>
        <img alt="carrier-img" src={require('../carrierImgs/' + code + '.png')} />
        <h3>total time: {this.props.flight.totalTime}</h3>
        <h3>total price: ${this.props.flight.totalPrice}</h3>
        <h3>rate</h3>
        <Divider />
        {this.props.flight.pieces.map((piece, index) => {
          return (
            <div key={index}>
                <p>{piece.carrierCode} {piece.number}</p>
                <p>{piece.departureAirport} - {piece.arrivalAirport}</p>
                <p>{piece.departureTime} - {piece.arrivalTime}</p>
                <p>{piece.duration}</p>
                <Divider />
                {index !== this.props.flight.pieces.length - 1 ? <h4>Wait {this.props.flight.intervals[index]}</h4> : ''}
                {index !== this.props.flight.pieces.length - 1 ? <Divider /> : ''}
            </div>
          )
        })}
        </div>
      </div>
    );
  }
}

export default Card;
