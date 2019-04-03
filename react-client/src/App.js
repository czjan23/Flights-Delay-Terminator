import React, { Component } from 'react';
import NavBar from './components/Navbar';
// import CardPanel from './components/CardPanel';
import CardDemo from './components/CardDemo';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.css';

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
        {/* <CardPanel flights={this.state.flights} /> */}
        <CardDemo flights={this.state.flights} />
      </div>
    );
  }
}

export default App;
