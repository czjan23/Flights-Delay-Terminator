import React, { Component } from 'react';
import Card from './Card';

class CardPanel extends Component {
  render() {
    return (
      <div style={{position: 'absolute', paddingTop: '80px', textAlign: 'center', left: '50%', marginLeft: '-150px', zIndex: '-1'}}>
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
