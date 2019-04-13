import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    marginTop: 100,
    textAlign: 'center',
  },
});

class InitialPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <h3 className={classes.text}>Please input your travel information above</h3> 
    );
  }
}

InitialPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InitialPage);