import {combineReducers} from 'redux';
import filter from './Filter';
import loading from './Loading';

export default combineReducers({
  filter,
  loading
})