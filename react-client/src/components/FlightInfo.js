import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlightDropdown from './FlightDropdown';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Rating from 'react-rating';

const styles = theme => ({

  intro: {
    width: '20%',
  },

  duration: {
    width: '15%',
  },

  price: {
    width: '10%',
  },

  stop: {
    width: 20,
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },

  details: {
    paddingBottom: 0,
    paddingTop: 5,
    width: '50%',
  },

  ratingStar: {
    marginRight: 100,
    color: '#3F51B5',
    zIndex: 1,
    '&:hover': {
      background: 'transparent',
    },
  },
});

class FlightInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  getStops(flight) {
    if (flight.intervals.length === 0) {
      return 'Nonstop';
    }

    if (flight.intervals.length === 1) {
      return '1 Stop ';
    }

    return `${flight.intervals.length} Stops`;
  }

  handleExpandClick(flight) {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const { classes } = this.props;
    const flight = this.props.flight;
    const rating = parseFloat((flight.score / 2 ).toFixed(1));
    return (
      <div>
        <ListItem alignItems='flex-start'  button onClick={this.handleExpandClick.bind(this)}>
          <ListItemAvatar>
            <Avatar alt="carrier-img" src={require('../carrierImgs/' + flight.carrierCode + '.png')} />
          </ListItemAvatar>
          <ListItemText className={classes.intro}
            primary={`${flight.startTime} - ${flight.endTime}`}
            secondary={
              <React.Fragment>
                <Typography component="span" color="textPrimary">
                  {`${flight.carrierName}`}
                </Typography>
              </React.Fragment>
            }
            />
            <ListItemText className={classes.duration}
              inset 
              primary={`${flight.totalTime}`} 
              secondary={
                <React.Fragment>
                <Typography component="span" color="textPrimary">
                  {`${flight.startAirport} - ${flight.endAirport}`}
                </Typography>
              </React.Fragment>
              }
            />
            <ListItemText className={classes.price} inset primary={`$${flight.totalPrice}`} />
            <ListItem className={classes.details}>
              
              <ListItemText className={classes.stop} inset primary={this.getStops(flight)} />
              {/* <ListItemText inset primary={rating} /> */}
              <Tooltip disableFocusListener title={`${rating} out of 5`}>
                <Button className={classes.ratingStar}><Rating start={0} stop={5} step={1} initialRating={rating} emptySymbol="fa fa-star-o fa-sm" fullSymbol="fa fa-star fa-sm" fractions={10} readonly /></Button>
              </Tooltip>
              
              {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <FlightDropdown flight={flight} />
        </Collapse>
    </div>
    );
  }
}

FlightInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightInfo);