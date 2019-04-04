import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    position: 'relative',
    maxWidth: 860,
    left: '50%',
    marginLeft: -430,
    marginTop: 100,
    border: '2px groove slateblue',
    borderRadius: 10,
    zIndex: -1,
    backgroundColor: theme.palette.background.paper,
  },

  noFlight: {
    marginTop: '100px',
    width: 860,
    position: 'absolute',
    left: '50%',
    marginLeft: -430,
    textAlign: 'center',
    zIndex: -1,
  },
  
  item: {
    '&::after': {
      position: 'absolute',
      content: `''`,
      display: 'block',
      margin: '0 auto',
      width: '100%',
      borderBottom: '1px solid slateblue',
      paddingTop: '70px',
      left: '0',
    }
  },
});

class AlignItemsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    if (this.props.flights.length === 0) {
      return null;
    }
    console.log(this.props.flights);
    return (
      <div id='card-panel'>
          {this.props.flights.length === 1 && this.props.flights[0] === 'no match' ?
          <h2 className={classes.noFlight}>No Flight Found</h2>
          :
          <List className={classes.root}>
          {this.props.flights.map((flight, index) => {
            return (
              <ListItem className={classes.item} alignItems='flex-start' key={index} flight={flight}>
                <ListItemAvatar>
                  <Avatar alt="carrier-img" src={require('../carrierImgs/' + flight.carrierCode + '.png')} />
                </ListItemAvatar>
                <ListItemText
                  primary={`Duration: ${flight.totalTime}`}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" color="textPrimary">
                        {`Price: ${flight.totalPrice}`}
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                  />
              </ListItem>
            )
          })}
          <div>
            <p>{`${this.props.flights.length} flights in total`}</p>
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