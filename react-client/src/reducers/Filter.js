const initState = {
  sortBy: '',
  stops: '',
  airlines: [],
  departureTime: '',
  arrivalTime: ''
};

export default function filter(state=initState, action) {
  if (action.type === 'changeSortBy') {
    state.sortBy = action.sortBy;
  } else if (action.type === 'changeStops') {
    state.stops = action.stops;
  } else if (action.type === 'changeAirlines') {
    state.airlines = action.airlines;
  } else if (action.type === 'changeDepartureTime') {
    state.departureTime = action.departureTime;
  } else if (action.type === 'changeArrivalTime') {
    state.arrivalTime = action.arrivalTime;
  } else if (action.type === 'clearFilter') {
    state.sortBy = '';
    state.stops = '';
    state.airlines = [];
    state.departureTime = '';
    state.arrivalTime = '';
  }
  return state;
}