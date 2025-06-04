import {
    GET_ENROLLMENTS_REQUEST,
    GET_ENROLLMENTS_SUCCESS,
    GET_ENROLLMENTS_FAIL,
    ENROLLMENT_LIST_REQUEST,
    ENROLLMENT_LIST_SUCCESS,
    ENROLLMENT_LIST_FAIL,
    ENROLLMENT_CREATE_REQUEST,
    ENROLLMENT_CREATE_SUCCESS,
    ENROLLMENT_CREATE_FAIL,
    ENROLLMENT_DELETE_REQUEST,
    ENROLLMENT_DELETE_SUCCESS,
    ENROLLMENT_DELETE_FAIL,
} from "../types/entollmentTypes";

const initialState = {
    loading: false,
    enrollments: [],
    error: null,
};

export const enrollmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ENROLLMENTS_REQUEST:
        case ENROLLMENT_LIST_REQUEST:
        case ENROLLMENT_CREATE_REQUEST:
        case ENROLLMENT_DELETE_REQUEST:
            return { ...state, loading: true };
        case GET_ENROLLMENTS_SUCCESS:
            return { loading: false, enrollments: action.payload, error: null };

        case ENROLLMENT_LIST_SUCCESS:
            return { ...state, loading: false, enrollments: action.payload };
        case ENROLLMENT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                enrollments: [...state.enrollments, action.payload],
            };


        case ENROLLMENT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                enrollments: state.enrollments.filter((e) => e._id !== action.payload),
            };
        case ENROLLMENT_LIST_FAIL:
        case ENROLLMENT_CREATE_FAIL:
        case ENROLLMENT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case GET_ENROLLMENTS_FAIL:
            return { loading: false, enrollments: [], error: action.payload };
        default:
            return state;
    }
};

