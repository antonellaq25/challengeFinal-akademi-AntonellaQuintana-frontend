import {
  GET_STATS_REQUEST,
  GET_STATS_SUCCESS,
  GET_STATS_FAILURE,
} from "../types/statsTypes";

const initialState = {
  loading: false,
  stats: null,
  error: null,
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_STATS_SUCCESS:
      return { ...state, loading: false, stats: action.payload };

    case GET_STATS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
