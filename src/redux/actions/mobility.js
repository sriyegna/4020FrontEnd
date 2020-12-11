import { MOBILITY_ACTIONS } from "./actions";

export const setObj = (value) => {
  return {
    type: MOBILITY_ACTIONS.SET_OBJECT,
    value,
  };
};

export const clearObj = (value) => {
  return {
    type: MOBILITY_ACTIONS.CLEAR_OBJECT,
    value,
  };
};

export const setArr = (value) => {
  return {
    type: MOBILITY_ACTIONS.SET_ARRAY,
    value,
  };
};

export const clearArr = (value) => {
  return {
    type: MOBILITY_ACTIONS.CLEAR_ARRAY,
    value,
  };
};

export const setLoading = (value) => {
  return {
    type: MOBILITY_ACTIONS.SET_LOADING,
    value,
  };
};

export const clearLoading = (value) => {
  return {
    type: MOBILITY_ACTIONS.CLEAR_LOADING,
    value,
  };
};
