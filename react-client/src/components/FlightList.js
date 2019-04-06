import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FlightInfo from './FlightInfo';

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

class AlignItemsList extends React.Component {
  render() {
    const { classes } = this.props;
    if (this.props.flights.length === 0) {
      return null;
    }
    
    return (
      <div id='card-panel'>
          {this.props.flights.length === 1 && this.props.flights[0] === 'no match' ?
          <h2 className={classes.noFlight}>No Flight Found</h2>
          :
          <List className={classes.root}>
          {this.props.flights.map((flight, index) => {
            return (
              <FlightInfo key={index} flight={flight} />
            )
          })}
          <div>
            <p className={classes.total}><b>{`${this.props.flights.length} flights in total`}</b></p>
          </div>
          </List>}
      </div>
    );
  }
  
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);