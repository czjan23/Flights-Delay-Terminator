import React, { Component } from 'react';
import NavBar from './components/Navbar';
import FlightList from './components/FlightList';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }

  handleSearch(flights) {
    this.setState({flights: flights});
  }

  render() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <NavBar handleSearch={this.handleSearch.bind(this)}  />
        </MuiPickersUtilsProvider>
        <FlightList flights={this.state.flights} />
      </div>
    );
  }
}

export default App;
