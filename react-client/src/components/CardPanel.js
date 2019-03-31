import React, { Component } from 'react';
import Card from './Card';
import './CardPanel.css';

class CardPanel extends Component {
  render() {
    return (
      <div id='card-panel'>
      {this.props.flights.length === 1 && this.props.flights[0] === 'no match' ?
        <h2>No Match Results</h2>
        :
        this.props.flights.map((flight) => {
          return (
            <Card key={flight.id} flight={flight} />
          )
        })}
      </div>
    );
  }
}

export default CardPanel;
