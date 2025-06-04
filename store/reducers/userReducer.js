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
    GET_USER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
} from "../types/userTypes";

const initialState = {
    loading: false,
    users: [],
    userDetail: null,
    error: null,
    totalPages: 1,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
        case USER_CREATE_REQUEST:
        case USER_UPDATE_REQUEST:
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                totalPages: action.totalPages || 1, 
            };

        case USER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload],
            };

        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                ),
                userDetail:
                    state.userDetail && state.userDetail._id === action.payload._id
                        ? action.payload
                        : state.userDetail, 
            };

        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter((u) => u._id !== action.payload),
            };

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetail: action.payload,
            };

        case GET_USER_FAIL:
        case USER_CREATE_FAIL:
        case USER_DELETE_FAIL:
        case USER_UPDATE_FAIL:
        case USER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
