import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({
  root: {
    display: 'inline-block',
    width: '288px',
    marginLeft: '40px',
  },
  listArea: {
    maxHeight: '250px',
    overflow: 'auto',
  },
});

class AutoCompeletePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      base: []
    };
  }

  componentWillMount() {
    let url = 'http://localhost:3001/cities';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({base: res});
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input === this.props.input) {
      return;
    }
    if (nextProps.input === '') {
      this.setState({suggestions: []});
      return;
    }
    let list = [];
    this.state.base.forEach((suggestion) => {
      if (suggestion.toLowerCase().indexOf(nextProps.input.toLowerCase()) !== -1) {
        list.push(suggestion);
      }
    });
    if (list.length === 1 && list[0] === nextProps.input) {
      return;
    }
    this.setState({suggestions: list});
  }

  handleChoose(e) {
    this.setState({suggestions: []});
    this.props.handleChoose(this.props.origin, e.target.innerText);
  }

  render() {
    const { classes } = this.props;

    let list = [];
    this.state.suggestions.forEach((suggestion, index) => {
      list.push(<ListItem onClick={this.handleChoose.bind(this)} key={index} button><ListItemText primary={suggestion} /></ListItem>);
    })

    return (
      <div className={classes.root}>
        <List className={classes.listArea}>
          {list}
        </List>
      </div>
    );
  }
}

AutoCompeletePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoCompeletePanel);
