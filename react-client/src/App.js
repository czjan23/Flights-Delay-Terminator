import React, { Component } from 'react';
import InitialPage from './components/InitialPage';
import Progress from './components/Progress';
import NavBar from './components/Navbar';
import FlightList from './components/FlightList';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import store from './store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noneSearch: true,
      flights: [],
      loading: false,
    };
  }

  handleLoading() {
    this.setState({
      noneSearch: false,
      loading: true
    })
  }

  handleSearch(flights) {
    // console.log(flights.map(flight => {
    //   return flight.score;
    // }));
    this.setState({
      loading: store.getState().loading.loading,
      flights: flights
    });
  }

  render() {
    const loading = this.state.loading;
    const noneSearch = this.state.noneSearch;
    let flightList;
    
    if (loading) {
      flightList = <Progress noneSearch={this.state.noneSearch} />;
    } else {
      flightList = <FlightList flights={this.state.flights} />;
    }
    

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <NavBar handleLoading={this.handleLoading.bind(this)} handleSearch={this.handleSearch.bind(this)}  />
        </MuiPickersUtilsProvider>
        {noneSearch ? <InitialPage /> : null}
        {flightList}
      </div>
    );
  }
}

export {App, store};
