import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './AutoCompletePanel.css';

const BASE = [
  'Waco, TX (ACT)',
  'Wainwright, AK (AIN)',
  'Wales, AK (WAA)',
  'Walla Walla, WA (ALW)',
  'Washington DC - All airports (WAS)',
  'Washington DC - Dulles (IAD)',
  'Washington DC - National (DCA)',
  'Waterfall, AK (KWF)',
  'Waterloo, IA (ALO)',
  'Watertown, NY (ART)',
  'Houston, TX - Intercontinental (IAH)',
  'Spartanburg/Greenville, SC (GSP)'
];

class AutoCompeletePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      base: []
    };
  }

  componentWillMount() {
    this.setState({base: BASE});
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
    let list = [];
    this.state.suggestions.forEach((suggestion, index) => {
      list.push(<ListItem onClick={this.handleChoose.bind(this)} key={index} button><ListItemText primary={suggestion} /></ListItem>);
    })

    return (
      <div className="root">
        <List component="nav">
          {list}
        </List>
      </div>
    );
  }
}

export default AutoCompeletePanel;
