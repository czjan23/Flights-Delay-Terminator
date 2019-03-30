import React, { Component } from 'react';
import NavBar from './components/Navbar';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <NavBar />
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
