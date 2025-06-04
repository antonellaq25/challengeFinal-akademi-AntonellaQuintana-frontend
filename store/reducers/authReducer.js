import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    PASSWORD_RESET_CONFIRM_FAILURE,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILURE,
    LOGOUT,
} from "../types/authTypes";

const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        case PASSWORD_RESET_REQUEST:
            return {
                ...state,
                error: null,
                resetMessage: null,
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                resetMessage: action.payload,
                error: null,
                loading: false,
            };


        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case PASSWORD_RESET_FAILURE:
            return {
                ...state,
                error: action.payload,
                resetMessage: null,
                loading: false,
            };

        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return {
                ...state,
                resetMessage: action.payload,
                error: null,
                loading: false,
            };

        case PASSWORD_RESET_CONFIRM_FAILURE:
            return {
                ...state,
                error: action.payload,
                resetMessage: null,
                loading: false,
            };
        case LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};
