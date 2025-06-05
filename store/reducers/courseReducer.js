import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAILURE,
    CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILURE,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILURE,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAILURE,
    GET_COURSE_DETAIL_REQUEST,
    GET_COURSE_DETAIL_SUCCESS,
    GET_COURSE_DETAIL_FAILURE,
} from "../types/courseTypes";

const initialCourseListState = {
    loading: false,
    courses: [],
    error: null,
    totalPages: 1,
};

export const courseReducer = (state = initialCourseListState, action) => {
    switch (action.type) {
        case GET_COURSES_REQUEST:
        case CREATE_COURSE_REQUEST:
        case DELETE_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
            return { ...state, loading: true };

        case GET_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: action.payload || [],
                totalPages: action.totalPages || 1,
                error: null
            };

        case CREATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: [...state.courses, action.payload],
            };

        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: state.courses.filter((c) => c._id !== action.payload),
            };

        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: state.courses.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                ),
            };

        case GET_COURSES_FAILURE:
        case CREATE_COURSE_FAILURE:
        case DELETE_COURSE_FAILURE:
        case UPDATE_COURSE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const initialCourseDetailState = {
    loading: false,
    course: null,
    error: null,

};

export const courseDetailReducer = (state = initialCourseDetailState, action) => {
    switch (action.type) {
        case GET_COURSE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_COURSE_DETAIL_SUCCESS:
            return { ...state, loading: false, course: action.payload };
        case GET_COURSE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
