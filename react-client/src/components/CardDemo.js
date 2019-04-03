// import React, { Component } from 'react';
// import Card from './Card';
// import './CardPanel.css';

// class CardPanel extends Component {
//   render() {
//     return (
//       <div id='card-panel'>
//       {this.props.flights.length === 1 && this.props.flights[0] === 'no match' ?
//         <h2>No Match Results</h2>
//         :
//         this.props.flights.map((flight) => {
//           return (
//             <Card key={flight.id} flight={flight} />
//           )
//         })}
//       </div>
//     );
//   }
// }



// export default CardPanel;

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
    maxWidth: 860,
    left: '50%',
    marginLeft: -430,
    marginTop: 100,
    border: '2px groove slateblue',
    borderRadius: 10,
    zIndex: -1,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
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

    return (
      <div id='card-panel'>
          {this.props.flights.length === 1 && this.props.flights[0] === 'no match' ?
          <h2>No Match Results</h2>
          :
          <List className={classes.root}>
          {this.props.flights.map((flight, index) => {
            return (
              <ListItem alignItems='flex-start' key={index} flight={flight}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={`Duration: ${flight.totalTime}`}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" className={classes.inline} color="textPrimary">
                        {`Price: ${flight.totalPrice}`}
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                  />
              </ListItem>
            )
          })}
          </List>}
      </div>
    );
  }
  
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);