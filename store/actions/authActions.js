import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_LOADING,
  LOGOUT,
} from "../types/authTypes";

const API_URL = "http://localhost:3000/auth";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
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
    const res = await axios.post(`${API_URL}/register`, userData);

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

export const logout = () => {
  return { type: LOGOUT };
};
