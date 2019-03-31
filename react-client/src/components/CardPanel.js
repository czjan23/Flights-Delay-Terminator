import React, { Component } from 'react';
import Card from './Card';

class CardPanel extends Component {
  render() {
    return (
      <div style={{paddingTop: '80px', textAlign: 'center'}}>
        {this.props.flights.map((flight) => {
          return (
            <Card key={flight.id} flight={flight} />
          )
        })}
      </div>
    );
  }
}

export default CardPanel;
