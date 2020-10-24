const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CLICK":
      return state + (action.payload || 1);
    default:
      return state;
  }
};
