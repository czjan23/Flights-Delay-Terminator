export default function filter(state={loading: false}, action) {
  if (action.type === 'search') {
    state.loading = action.loading;
  }
  return state;
}