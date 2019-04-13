import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'inline-block',
    width: '288px',
  },
  listArea: {
    maxHeight: '250px',
    overflow: 'auto',
    backgroundColor: '#a0a9db',
    borderRadius: '0 0 10px 10px'
  },
});

class AutoCompeletePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSuggestion: false,
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
    let input = nextProps.input.trim();
    if (input === this.props.input) {
      return;
    }
    if (input === '') {
      this.setState({suggestions: [], hasSuggestion: false});
      return;
    }
    let list = [];
    this.state.base.forEach((suggestion) => {
      if (suggestion.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
        list.push(suggestion);
      }
    });
    if (list.length === 0) {
      this.setState({suggestions: [], hasSuggestion: false})
      return;
    }
    if (list.length === 1 && list[0] === input) {
      return;
    }
    this.setState({suggestions: list, hasSuggestion: true});
  }

  handleChoose(e) {
    this.setState({suggestions: [], hasSuggestion: false});
    this.props.handleChoose(this.props.origin, e.target.innerText);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.hasSuggestion ? (
          <List className={classes.listArea}>
            {this.state.suggestions.map((suggestion, index) => {
              return (
                <ListItem onClick={this.handleChoose.bind(this)} key={index} button><ListItemText primary={suggestion} /></ListItem>
              )
            })}
        </List>) : null}

      </div>
    );
  }
}

AutoCompeletePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoCompeletePanel);
