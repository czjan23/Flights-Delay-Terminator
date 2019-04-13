import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({

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
        <CircularProgress className={classes.progress} color="primary" />
      </div>
    );
  }
  
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);