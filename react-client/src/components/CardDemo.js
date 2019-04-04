import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

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
  
  item: {
    '&::after': {
      position: 'absolute',
      content: `''`,
      display: 'block',
      margin: '0 auto',
      width: '100%',
      borderBottom: '1px solid slateblue',
      paddingTop: '53px',
      left: '0',
    }
  },

  intro: {
    width: 180,
  },

  rate: {
    width: 20,
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },

  total: {
    width: '100%',
    textAlign: 'center',
  },
});

class AlignItemsList extends React.Component {
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

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded})
  };

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
              <ListItem className={classes.item} alignItems='flex-start' key={index} flight={flight} button onClick={this.handleExpandClick.bind(this)}>
                <ListItemAvatar>
                  <Avatar alt="carrier-img" src={require('../carrierImgs/' + flight.carrierCode + '.png')} />
                </ListItemAvatar>
                <ListItemText className={classes.intro}
                  primary={`Duration: ${flight.totalTime}`}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" color="textPrimary">
                        {`${flight.carrierName}`}
                      </Typography>
                    </React.Fragment>
                  }
                  />
                  <ListItem>
                    <ListItemText inset primary={`$${flight.totalPrice}`} />
                    <ListItemText className={classes.rate} inset primary={this.getStops(flight)} />
                    <ListItemText inset primary={`Rate`} />
                    {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemText inset primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
              </ListItem>
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