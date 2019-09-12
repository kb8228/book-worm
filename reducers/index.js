const initialState = {
  result: null,
  currentQuery: "",
  currentTab: 0
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
  case TYPES.SET_QUERY:
    return Object.assign({}, state, { currentQuery: action.payload });
  case TYPES.SET_TAB:
    return { ...state, currentTab: action.payload }
  case TYPES.SET_RESULT:
    return { ...state, result: action.payload }
  default:
    return state;
  }
}