import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { InlineDatePicker } from "material-ui-pickers";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AutoCompeletePanel from './AutoCompeletePanel';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => (
  {root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  areaLabel: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  dateInput: {
    height: '19px',
    color: 'inherit',
    width: '100%',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  auto: {
    float: 'right',
    marginTop: theme.spacing.unit * 6.25,
    zIndex: 1,
    marginRight: theme.spacing.unit * 54,
  },
  bar: {
    zIndex: 0
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      date: new Date()
    }
  }

  handleFromChange(e) {
    this.setState({from: e.target.value});
  }

  handleToChange(e) {
    this.setState({to: e.target.value});
  }

  handleDateChange(newDate) {
    this.setState({date: newDate});
  }

  handleChoose(origin, choice) {
    if (origin === 'from') {
      this.setState({from: choice});
    } else {
      this.setState({to: choice});
    }
  }

  getDay() {
    let date = this.state.date.getDate();
    let year = this.state.date.getFullYear();
    let month = this.state.date.getMonth() + 1;
    let day = String(year);
    day += '-';
    if (month < 10) {
      day += '0' + String(month);
    } else {
      day += String(month);
    }
    day += '-';
    if (date < 10) {
      day += '0' + String(date);
    } else {
      day += String(date);
    }
    return day;
  }

  getCode(s) {
    let idx1 = s.indexOf('(');
    let idx2 = s.indexOf(')');
    return s.substring(idx1 + 1, idx2);
  }

  handleSubmit() {
    // origin : 'AUS',
    // destination : 'SFO',
    // departureDate : '2019-04-01'
    let departureDate = this.getDay();
    let origin = this.getCode(this.state.from);
    let destination = this.getCode(this.state.to);
    let header = 'http://localhost:3001/flights?';
    let tail = 'origin=' + origin + '&destination=' + destination + '&departureDate=' + departureDate;
    let url = header + tail;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.props.handleSearch(res);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.bar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Flight Delay Terminator
            </Typography>
            <div className={classes.grow} />
            <div className={classes.inputArea}>
              <div className={classes.areaLabel}>
              <Typography color="inherit" variant="subtitle1">
                From
              </Typography>
              </div>
              <InputBase
                value={this.state.from}
                onChange={this.handleFromChange.bind(this)}
                placeholder="City or Airport"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.inputArea}>
              <div className={classes.areaLabel}>
              <Typography color="inherit" variant="subtitle1">
                To
              </Typography>
              </div>
              <InputBase
                value={this.state.to}
                onChange={this.handleToChange.bind(this)}
                placeholder="City or Airport"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.inputArea}>
              <div className={classes.areaLabel}>
              <Typography color="inherit" variant="subtitle1">
                Date
              </Typography>
              </div>
              <InlineDatePicker InputProps={{disableUnderline: true, className: classes.dateInput}} format="MM/dd/yyyy" value={this.state.date} onChange={this.handleDateChange.bind(this)} />
            </div>
            <Button color="inherit" className={classes.button} onClick={this.handleSubmit.bind(this)}>
              <SearchIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.auto}>
          <AutoCompeletePanel origin='from' handleChoose={this.handleChoose.bind(this)} input={this.state.from} />
          <AutoCompeletePanel origin='to' handleChoose={this.handleChoose.bind(this)} input={this.state.to} />
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
