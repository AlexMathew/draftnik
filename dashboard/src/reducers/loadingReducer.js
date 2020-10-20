import {
  START_LOADING_STATIC_DATA,
  STOP_LOADING_STATIC_DATA,
  OPEN_RENAME_MODAL,
  START_RENAME_REQUEST,
  STOP_RENAME_REQUEST,
  CLOSE_RENAME_MODAL,
  OPEN_DELETE_MODAL,
  START_DELETE_REQUEST,
  STOP_DELETE_REQUEST,
  CLOSE_DELETE_MODAL,
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  static: false,
  rename: {
    modalOpen: false,
    draft: {},
    requesting: false,
  },
  delete: {
    modalOpen: false,
    draft: {},
    requesting: false,
  },
  share: {
    modalOpen: false,
    draft: {},
  },
};

export default (state = INITIAL_STATE, action) => {
  let rename, xdelete;

  switch (action.type) {
    case START_LOADING_STATIC_DATA:
      return { ...state, static: true };
    case STOP_LOADING_STATIC_DATA:
      return { ...state, static: false };
    case OPEN_RENAME_MODAL:
      return {
        ...state,
        rename: {
          modalOpen: true,
          draft: action.payload.draft,
          requesting: false,
        },
      };
    case CLOSE_RENAME_MODAL:
      return {
        ...state,
        rename: { modalOpen: false, draft: {}, requesting: false },
      };
    case START_RENAME_REQUEST:
      rename = state.rename;
      return { ...state, rename: { ...rename, requesting: true } };
    case STOP_RENAME_REQUEST:
      rename = state.rename;
      return { ...state, rename: { ...rename, requesting: false } };
    case OPEN_DELETE_MODAL:
      return {
        ...state,
        delete: {
          modalOpen: true,
          draft: action.payload.draft,
          requesting: false,
        },
      };
    case CLOSE_DELETE_MODAL:
      return {
        ...state,
        delete: { modalOpen: false, draft: {}, requesting: false },
      };
    case START_DELETE_REQUEST:
      xdelete = state.delete;
      return { ...state, delete: { ...xdelete, requesting: true } };
    case STOP_DELETE_REQUEST:
      xdelete = state.delete;
      return { ...state, delete: { ...xdelete, requesting: false } };
    case OPEN_SHARE_MODAL:
      return {
        ...state,
        share: {
          modalOpen: true,
          draft: action.payload.draft,
        },
      };
    case CLOSE_SHARE_MODAL:
      return {
        ...state,
        share: { modalOpen: false, draft: {} },
      };
    default:
      return state;
  }
};
