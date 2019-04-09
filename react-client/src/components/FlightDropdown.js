import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FlightLand from '@material-ui/icons/FlightLand';
import FlightTakeOff from '@material-ui/icons/FlightTakeoff';
import EventSeat from '@material-ui/icons/EventSeat';
import Typography from '@material-ui/core/Typography';
import FlightDelay from './FlightDelay';

const styles = theme => ({
  root: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottom: '2px solid slateblue',
  },

  segment: {
    width: '90%',
    position: 'relative',
    display: 'inline-block',
  },

  time: {
    padding: '0 0 3px 10px',
  },

  travelTime: {
    margin: '5px 10px',
    padding: '5px 10px',
    borderLeft: '2px dashed lightgray',
  },

  flightData: {
    width: '60%',
    display: 'inline-block',
  },

  layout: {
    width: '90%',
    margin: '10px auto',
    padding: 10,
    borderBottom: '1px solid lightgray',
    borderTop: '1px solid lightgray',
  }
});

class VerticalLinearStepper extends React.Component {

  render() {
    const { classes } = this.props;
    const flightSegements = this.props.flight.pieces;
    const flightIntervals = this.props.flight.intervals;

    return (
      <div className={classes.root}>
        {flightSegements.map((segment, index) => (
            <div key={index}>
              
              <p>{`${segment.segmentCarrierCode} ${segment.number}`}</p>
                  <div className={classes.segment}>
                    <div className={classes.flightData}>
                      <FlightTakeOff />
                      <span className={classes.time}>{`${segment.departureTime} - ${segment.departureAirport}`}</span>
                      <div className={classes.travelTime}>
                        <p>{`Travel time: ${segment.duration}`}</p>
                      </div>
                      <FlightLand />
                      <span className={classes.time}>{`${segment.arrivalTime} - ${segment.arrivalAirport}`}</span>
                    </div>
                    <FlightDelay segment={segment} canAlert={index < flightIntervals.length} nextInterval={flightIntervals[index]}/>
              </div>

              {index < flightIntervals.length ? 
              <div className={classes.layout}>
                <EventSeat />
                <span className={classes.time}>{`Layover: ${flightIntervals[index]}`}</span>
              </div> :
              null
              }
            </div>
          ))}
          <Typography>Note: Average Delay Time is calculated based on historical data.</Typography>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
