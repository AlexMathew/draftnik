import { SWITCH_MOBILE } from "../actions/types";

const initialState = {
  mobileOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_MOBILE:
      const mobileOpen = state.mobileOpen;
      return { ...state, mobileOpen: !mobileOpen };
    default:
      return state;
  }
};
