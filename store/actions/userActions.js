import axios from "axios";
import {
	USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL,
	USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_DELETE_REQUEST,
	USER_DELETE_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, USER_DELETE_SUCCESS,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
} from "../types/userTypes";

const API_URL = "http://localhost:3000"
export const createUser = (userData) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_CREATE_REQUEST });
		const {
			auth: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.post(`${API_URL}/users/new`, userData, config);
		dispatch({ type: USER_CREATE_SUCCESS, payload: data });

		navigate("/admin");
	} catch (error) {
		console.log("Error creating user:", error.response || error.message);
		dispatch({
			type: USER_CREATE_FAIL,
			payload:
				error.response?.data?.message || "Error al crear usuario",
		});
	}
};
export const getUsers = (page = 1, limit = 5, filters = {}) => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_USER_REQUEST });

		const {
			auth: { token },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const queryParams = new URLSearchParams({
			page,
			limit,
			...(filters.name && { name: filters.name }),
			...(filters.email && { email: filters.email }),
			...(filters.role && { role: filters.role }),
		});

		const { data } = await axios.get(`${API_URL}/users?${queryParams.toString()}`, config);
		console.log("users recibidos:", data);

		dispatch({
			type: GET_USER_SUCCESS,
			payload: data.users,
			totalPages: data.totalPages,
		});
	} catch (error) {
		dispatch({
			type: GET_USER_FAIL,
			payload: error.response?.data?.message || error.message || "Error getting users",
		});
	}
};

export const getUserById = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		const {
			auth: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`${API_URL}/users/${id}`, config);
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response?.data?.message || error.message || "Error fetching user",
		});
	}
};
export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const { auth: { token } } = getState();
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		await axios.delete(`${API_URL}/users/${id}`, config);

		dispatch({ type: USER_DELETE_SUCCESS, payload: id });
		navigate("/users")
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response?.data?.message || "Error deleting user",
		});
	}
};
export const updateUser = (id, updatedData) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const { auth: { token } } = getState();

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const { data } = await axios.put(`${API_URL}/users/${id}`, updatedData, config);

		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response?.data?.message || "Error updating course",
		});
	}
};