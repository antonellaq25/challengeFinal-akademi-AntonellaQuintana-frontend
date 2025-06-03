import {
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_GRADES_FAILURE,
  CREATE_GRADE_REQUEST,
  CREATE_GRADE_SUCCESS,
  CREATE_GRADE_FAILURE,
} from "../types/gradeTypes";

const initialState = {
  loading: false,
  grades: [],
  error: null,
};

export const gradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES_REQUEST:
    case CREATE_GRADE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_GRADES_SUCCESS:
      return { loading: false, grades: action.payload, error: null };

    case CREATE_GRADE_SUCCESS:
      return {
        loading: false,
        grades: [...state.grades, action.payload], 
        error: null,
      };

    case GET_GRADES_FAILURE:
    case CREATE_GRADE_FAILURE:
      return { loading: false, grades: [], error: action.payload };

    default:
      return state;
  }
};
