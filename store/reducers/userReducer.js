import {
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    GET_USER_REQUEST,
    GET_USER_FAIL,
    GET_USER_SUCCESS
} from "../types/userTypes";

const initialState = {
    loading: false,
    users: [],
    error: null,
    totalPages: 1,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
        case USER_CREATE_REQUEST:
        case USER_UPDATE_REQUEST:
            return { ...state, loading: true };

        case GET_USER_SUCCESS:
            return { ...state, loading: false, users: action.payload, totalPages: action.totalPages,};

        case USER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload],
            };

        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter((u) => u._id !== action.payload),
            };

        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map((u) =>
                 u._id === action.payload._id ? action.payload : u
                ),
            };

        case USER_CREATE_FAIL:
        case USER_DELETE_FAIL:
        case USER_UPDATE_FAIL:
        case GET_USER_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};


