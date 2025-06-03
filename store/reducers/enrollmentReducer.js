import {
  GET_ENROLLMENTS_REQUEST,
  GET_ENROLLMENTS_SUCCESS,
  GET_ENROLLMENTS_FAILURE,
} from "../types/entollmentTypes";

const initialState = {
  loading: false,
  enrollments: [],
  error: null,
};

export const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENROLLMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_ENROLLMENTS_SUCCESS:
      return { loading: false, enrollments: action.payload, error: null };
    case GET_ENROLLMENTS_FAILURE:
      return { loading: false, enrollments: [], error: action.payload };
    default:
      return state;
  }
};

