import axios from "axios";
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
const API_URL = "http://localhost:3000";

export const getCourses = (page = 1, limit = 5, filters = {}) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_COURSES_REQUEST });

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
            ...(filters.category && { category: filters.category }),
            ...(filters.active && { active: filters.active }),
            ...(filters.title && { title: filters.title}),
        });

        const { data } = await axios.get(`${API_URL}/courses?${queryParams.toString()}`, config);
        console.log("Cursos recibidos:", data);

        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: data.courses,
            totalPages: data.totalPages,
        });
    } catch (error) {
        dispatch({
            type: GET_COURSES_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Error getting courses",
        });
    }
};

export const getMyCourses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_COURSES_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/courses/my-courses`, config);

        dispatch({ type: GET_COURSES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_COURSES_FAILURE,
            payload: error.response?.data?.message || "Error al obtener cursos",
        });
    }
};

export const createCourse = (courseData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_COURSE_REQUEST });


        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.post(`${API_URL}/courses`, courseData, config);

        dispatch({ type: CREATE_COURSE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_COURSE_FAILURE,
            payload: error.response?.data?.message || "Error al crear curso",
        });
    }
};

export const deleteCourse = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_COURSE_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        await axios.delete(`${API_URL}/courses/${id}`, config);

        dispatch({ type: DELETE_COURSE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_COURSE_FAILURE,
            payload: error.response?.data?.message || "Error al eliminar curso",
        });
    }
};

export const updateCourse = (id, updatedData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_COURSE_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.put(`${API_URL}/courses/${id}`, updatedData, config);

        dispatch({ type: UPDATE_COURSE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_COURSE_FAILURE,
            payload: error.response?.data?.message || "Error al actualizar curso",
        });
    }
};

export const getCourseDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_COURSE_DETAIL_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(`${API_URL}/courses/${id}`, config);

        dispatch({ type: GET_COURSE_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_COURSE_DETAIL_FAILURE, payload: error

        });
    }
};

