import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  text: {
    marginTop: 100,
    textAlign: 'center',
  },

  progress: {
    position: 'absolute',
    left: '50%',
    margin: '100px 0 0 -20px',
  },
});

class Progress extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.noneSearch ? 
        <h3 className={classes.text}>Please input your travel information above</h3> : 
        <CircularProgress className={classes.progress} color="primary" />}
      </div>
    );
  }
  
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);