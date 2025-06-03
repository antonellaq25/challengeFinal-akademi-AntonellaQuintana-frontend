import {
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
} from "../types/userTypes";

const initialState = {
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_CREATE_SUCCESS:
      return { ...state, loading: false, error: null };
    case USER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


