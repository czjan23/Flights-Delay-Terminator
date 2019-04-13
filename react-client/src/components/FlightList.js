import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FlightInfo from './FlightInfo';
import Filter from './Filter';
import Divider from '@material-ui/core/Divider';
import store from '../store';

const styles = theme => ({
  root: {
    position: 'relative',
    maxWidth: 860,
    left: '50%',
    marginLeft: -430,
    marginTop: 100,
    paddingTop: 0,
    border: '2px groove slateblue',
    borderRadius: 10,
    zIndex: 0,
    backgroundColor: theme.palette.background.paper,
  },

  noFlight: {
    marginTop: '100px',
    width: 860,
    position: 'absolute',
    left: '50%',
    marginLeft: -430,
    textAlign: 'center',
    zIndex: 0,
  },

  total: {
    width: '100%',
    textAlign: 'center',
  },
});

const lookUpTab = {
  'Morning': [300, 719],
  'Afternoon': [720, 1079],
  'Evening': [1080, 1439],
  'Late Night': [0, 299]
};

class AlignItemsList extends React.Component {

  // componentDidMount() {
  //   store.dispatch({type: 'search', loading: true});
  // }

  getTime(time) {
    let parts = time.split(" ");
    let hour = +parts[0].split(":")[0];
    let minute = +parts[0].split(":")[1];
    if (parts[1] === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (parts[1] === 'AM' && hour === 12) {
      hour = 0;
    }
    return hour * 60 + minute;
  }

  getDuration(duration) {
    let hour = duration.split(" ")[0];
    hour = hour.slice(0, hour.length - 1);
    hour = +hour;
    let minute = duration.split(" ")[1];
    minute = minute.slice(0, minute.length - 1);
    minute = +minute;
    return hour * 60 + minute;
  }

  filterFlights(flights) {
    // filter by stops
    if (store.getState().filter.stops !== '') {
      flights = flights.filter(flight => flight.intervals.length <= store.getState().filter.stops);
    }

    // filter by airlines
    if (store.getState().filter.airlines.length !== 0) {
      flights = flights.filter(flight => {
        for (let piece of flight.pieces) {
          if (store.getState().filter.airlines.indexOf(piece.segmentCarrierFull.split(" ")[0]) === -1) {
            return false;
          }
        }
        return true;
      });
    }

    // filter by departure time
    if (store.getState().filter.departureTime !== '' && store.getState().filter.departureTime !== "Any") {
      let range = lookUpTab[store.getState().filter.departureTime];
      flights = flights.filter(flight => {
        let time = this.getTime(flight.startTime);
        return time >= range[0] && time <= range[1];
      });
    }

    // filter by arrival time
    if (store.getState().filter.arrivalTime !== '' && store.getState().filter.arrivalTime !== "Any") {
      let range = lookUpTab[store.getState().filter.arrivalTime];
      flights = flights.filter(flight => {
        let time = this.getTime(flight.endTime);
        return time >= range[0] && time <= range[1];
      });
    }

    // sort
    if (store.getState().filter.sortBy !== '') {
      if (store.getState().filter.sortBy === "Price(Lowest)") {
        flights = flights.sort((flightA, flightB) => {
          let priceA = +flightA.totalPrice;
          let priceB = +flightB.totalPrice;
          return priceA - priceB;
        });
      } else if (store.getState().filter.sortBy === "Price(Highest)") {
        flights = flights.sort((flightA, flightB) => {
          let priceA = +flightA.totalPrice;
          let priceB = +flightB.totalPrice;
          return priceB - priceA;
        });
      } else if (store.getState().filter.sortBy === "Duration(Shortest)") {
        flights = flights.sort((flightA, flightB) => {
          let durationA = this.getDuration(flightA.totalTime);
          let durationB = this.getDuration(flightB.totalTime);
          return durationA - durationB;
        });
      } else if (store.getState().filter.sortBy === "Duration(Longest)") {
        flights = flights.sort((flightA, flightB) => {
          let durationA = this.getDuration(flightA.totalTime);
          let durationB = this.getDuration(flightB.totalTime);
          return durationB - durationA;
        });
      } else if (store.getState().filter.sortBy === "Departure(Earliest)") {
        flights = flights.sort((flightA, flightB) => {
          let timeA = this.getTime(flightA.startTime);
          let timeB = this.getTime(flightB.startTime);
          return timeA - timeB;
        });
      } else if (store.getState().filter.sortBy === "Departure(Latest)") {
        flights = flights.sort((flightA, flightB) => {
          let timeA = this.getTime(flightA.startTime);
          let timeB = this.getTime(flightB.startTime);
          return timeB - timeA;
        });
      } else if (store.getState().filter.sortBy === "Arrival(Earliest)") {
        flights = flights.sort((flightA, flightB) => {
          let timeA = this.getTime(flightA.endTime);
          let timeB = this.getTime(flightB.endTime);
          return timeA - timeB;
        });
      } else if (store.getState().filter.sortBy === "Arrival(Latest)") {
        flights = flights.sort((flightA, flightB) => {
          let timeA = this.getTime(flightA.endTime);
          let timeB = this.getTime(flightB.endTime);
          return timeB - timeA;
        });
      }
    }

    return flights;
  }

  render() {
    const { classes } = this.props;

    if (this.props.flights.length === 0) {
      return null;
    }

    let filteredFlights = this.filterFlights(this.props.flights);

    return (
      <div id='card-panel'>
          {filteredFlights.length === 1 && filteredFlights[0] === 'no match' ?
          <h2 className={classes.noFlight}>No Flight Found</h2>
          :
          <div className={classes.root}>
            <Filter flights={this.props.flights} />
            <Divider />
            <List>
            {filteredFlights.map((flight, index) => {
              return (
                <FlightInfo key={index} flight={flight} />
              )
            })}
            <div>
              <p className={classes.total}><b>{`${filteredFlights.length} flights in total`}</b></p>
            </div>
            </List>
          </div>}
      </div>
    );
  }
  
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);