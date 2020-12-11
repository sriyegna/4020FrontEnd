import { MOBILITY_ACTIONS } from "../actions/actions";

const initialState = {
  obj: null,
  arr: [],
  loading: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOBILITY_ACTIONS.SET_OBJECT:
      return {
        ...state,
        obj: action.value,
      };
    case MOBILITY_ACTIONS.CLEAR_OBJECT:
      return {
        ...state,
        obj: null,
      };
    case MOBILITY_ACTIONS.SET_ARRAY:
      return {
        ...state,
        arr: action.value,
      };
    case MOBILITY_ACTIONS.CLEAR_ARRAY:
      return {
        ...state,
        arr: [],
      };
    case MOBILITY_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MOBILITY_ACTIONS.CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default productsReducer;
