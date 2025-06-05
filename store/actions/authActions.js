import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_LOADING,
  PASSWORD_RESET_CONFIRM_FAILURE,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  LOGOUT,
} from "../types/authTypes";

const API_URL = "http://localhost:3000";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

export const register = (userData, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.post(`${API_URL}/auth/register`, userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
     navigate("/login");

  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "Error registering",
    });
  }
};

export const requestPasswordReset = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: PASSWORD_RESET_REQUEST });

      const res = await axios.post(`${API_URL}/users/forgot-password`,{ email });

      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data.message || "Password reset email sent successfully"
      });

      return Promise.resolve();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send reset email";
      dispatch({
        type: PASSWORD_RESET_FAILURE,
        payload: errorMessage
      });
      return Promise.reject(error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};
export const confirmPasswordReset = (token, newPassword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });

      const res = await axios.post(`${API_URL}/users/reset-password/${token}`, {
  
        password: newPassword
      });

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
        payload: res.data.message || "Password reset successfully"
      });

      return Promise.resolve();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password";
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAILURE,
        payload: errorMessage
      });
      return Promise.reject(error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
