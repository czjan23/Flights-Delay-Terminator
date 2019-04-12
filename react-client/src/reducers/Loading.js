export default function filter(state={loading: true}, action) {
  if (action.type === 'search') {
    state.loading = action.loading;
  }
  return state;
}