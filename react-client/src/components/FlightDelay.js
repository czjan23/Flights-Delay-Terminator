import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({ 
  delayData: {
    display: 'inline-block',
    position: 'absolute',
  }, 

  alert: {
    fontSize: 14,
    color: 'red',
  },
});

class FlightDelay extends React.Component {

  shouldAlert(canAlert, directDelay, fromToDelay, carrierDelay, interval) {
    if (!canAlert) {
      return false;
    }

    if (directDelay !== null && directDelay !== undefined) {
      return directDelay.avg_delay_time > interval - 60;
    }

    if (fromToDelay !== null && fromToDelay !== undefined) {
      return fromToDelay.avg_delay_time > interval - 60;
    }

    return carrierDelay.avg_delay_time > interval - 60;
  }

  render() {
    const { classes } = this.props;
    const directDelay = this.props.segment.directDelay;
    const fromToDelay = this.props.segment.estimateFromToDelay;
    const carrierDelay = this.props.segment.estimateCarrierDelay;
    const hasDirectDelay = directDelay !== null && directDelay !== undefined;
    const hasFromToDelay = fromToDelay !== null && fromToDelay !== undefined;

    return (
      <div className={classes.delayData}>
        {hasDirectDelay ? 
          <div>
            <p>{`Punctuality rate: ${Math.round(100 - directDelay.delay_rate * 100)}%`}</p>
            <p>{`Average Delay Time: ${Math.round(directDelay.avg_delay_time)}m`}</p>
          </div>
          :
          <div>
            <p>Punctuality rate: N/A</p>

            {hasFromToDelay ?
                <Typography>{`Average Delay Time from ${this.props.segment.departureAirport} to ${this.props.segment.arrivalAirport}: ${Math.round(fromToDelay.avg_delay_time)}m`}</Typography>
              :
              <Typography>{`Average Delay Time from ${this.props.segment.departureAirport} to ${this.props.segment.arrivalAirport}: N/A`}</Typography>
            }
            <Typography>{`Average Delay Time of ${this.props.segment.segmentCarrierFull}: ${Math.round(carrierDelay.avg_delay_time)}m`}</Typography>
          </div>
        }
        
        {this.shouldAlert(this.props.canAlert, directDelay, fromToDelay, carrierDelay, this.props.nextInterval) ?
          <p className={classes.alert}>Alert: If the flight is delayed, you may miss the next flight.</p> 
          :
          null
        }
      </div>
    )
  }
}

FlightDelay.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FlightDelay);