import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import store from '../store';

const styles = theme => ({
  root: {
    width: 1100,
    left: '50%',
    marginLeft: -550,
    marginTop: 100,
    border: '2px groove slateblue',
    borderRadius: 10,
    zIndex: 0,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  clearBtn: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    height: 18,
    margin: `0 ${theme.spacing.unit / 4}`,
  },

  time: {
    width: 200,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Filter extends React.Component {
  state = {
    labelWidth: 0,
    maxStop: 0,
    allAirlines: []
  };

  componentWillMount() {
    let maxStop = 0;
    this.props.flights.forEach(flight => {
      maxStop = Math.max(maxStop, flight.intervals.length);
    })
    let allAirlines = [];
    this.props.flights.forEach(flight => {
      flight.pieces.forEach(piece => {
        let head = piece.segmentCarrierFull.split(" ")[0];
        if (allAirlines.indexOf(head) === -1) {
          allAirlines.push(head);
        }
      });
    });
    this.setState({
      maxStop: maxStop,
      allAirlines: allAirlines
    });
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleSortByChange(e) {
    store.dispatch({type: 'changeSortBy', sortBy: e.target.value});
  }

  handleStopsChange(e) {
    store.dispatch({type: 'changeStops', stops: e.target.value});
  }

  handleAirlinesChange(e) {
    store.dispatch({type: 'changeAirlines', airlines: e.target.value});
  }

  handleDepartureTimeChange(e) {
    store.dispatch({type: 'changeDepartureTime', departureTime: e.target.value});
  }

  handleArrivalTimeChange(e) {
    store.dispatch({type: 'changeArrivalTime', arrivalTime: e.target.value});
  }

  handleClear() {
    store.dispatch({type: 'clearFilter'});
  }

  getStopOptions() {
    let maxStop = this.state.maxStop;
    let stopOptions = [];
    stopOptions.push(<MenuItem key={maxStop + 1} value={maxStop + 1}>Any number of stops</MenuItem>);
    stopOptions.push(<MenuItem key={0} value={0}>Nonstop only</MenuItem>);
    if (maxStop >= 1) {
      stopOptions.push(<MenuItem key={1} value={1}>1 stop or fewer</MenuItem>);
    }
    for (let i = 2; i <= maxStop; i++) {
      stopOptions.push(<MenuItem key={i} value={i}>{i} stops or fewer</MenuItem>);
    }
    return stopOptions;
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="stop-by"
          >
            Sort by
          </InputLabel>
          <Select
            value={store.getState().filter.sortBy}
            onChange={this.handleSortByChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="sort-by"
                id="stop-by"
              />
            }
          >
            <MenuItem value="Price(Lowest)">Price(Lowest)</MenuItem>
            <MenuItem value="Price(Highest)">Price(Highest)</MenuItem>
            <MenuItem value="Duration(Shortest)">Duration(Shortest)</MenuItem>
            <MenuItem value="Duration(Longest)">Duration(Longest)</MenuItem>
            <MenuItem value="Departure(Earliest)">Departure(Earliest)</MenuItem>
            <MenuItem value="Departure(Latest)">Departure(Latest)</MenuItem>
            <MenuItem value="Arrival(Earliest)">Arrival(Earliest)</MenuItem>
            <MenuItem value="Arrival(Latest)">Arrival(Latest)</MenuItem>
            <MenuItem value="Rating(Highest)">Rating(Highest)</MenuItem>
            <MenuItem value="Rating(Lowest)">Rating(Lowest)</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="stops"
          >
            Stops
          </InputLabel>
          <Select
            value={store.getState().filter.stops}
            onChange={this.handleStopsChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="stops"
                id="stops"
              />
            }
          >
            {this.getStopOptions()}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="airlines"
          >
            Airlines
          </InputLabel>
          <Select
            multiple
            value={store.getState().filter.airlines}
            onChange={this.handleAirlinesChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="airlines"
                id="airlines"
              />
            }
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
          {this.state.allAirlines.map(airline => (
            <MenuItem key={airline} value={airline}>
              {airline}
            </MenuItem>
          ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="departure-time"
          >
            Departure time
          </InputLabel>
          <Select
            className={classes.time}
            value={store.getState().filter.departureTime}
            onChange={this.handleDepartureTimeChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="departure-time"
                id="departure-time"
              />
            }
          >
            <MenuItem value="Any">Any time</MenuItem>
            <MenuItem value="Morning">Morning(5:00am - 11:59am)</MenuItem>
            <MenuItem value="Afternoon">Afternoon(12:00pm - 5:59pm)</MenuItem>
            <MenuItem value="Evening">Evening(6:00pm - 11:59pm)</MenuItem>
            <MenuItem value="Late Night">Late Night(12:00am - 4:59am)</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="arrival-time"
          >
            Arraival time
          </InputLabel>
          <Select
            className={classes.time}
            value={store.getState().filter.arrivalTime}
            onChange={this.handleArrivalTimeChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="arrival-time"
                id="arrival-time"
              />
            }
          >
            <MenuItem value="Any">Any time</MenuItem>
            <MenuItem value="Morning">Morning(5:00am - 11:59am)</MenuItem>
            <MenuItem value="Afternoon">Afternoon(12:00pm - 5:59pm)</MenuItem>
            <MenuItem value="Evening">Evening(6:00pm - 11:59pm)</MenuItem>
            <MenuItem value="Late Night">Late Night(12:00am - 4:59am)</MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" onClick={this.handleClear.bind(this)} className={classes.clearBtn}>
          clear
        </Button>
      </form>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);