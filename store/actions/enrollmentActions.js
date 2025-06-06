import axios from "axios";
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

const API_URL = "http://localhost:3000"

export const getEnrollmentsByCourse = (courseId, page = 1, limit = 5) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ENROLLMENTS_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(
            `${API_URL}/enrollments/course/${courseId}?page=${page}&limit=${limit}`, 
            config
        );

        dispatch({ type: GET_ENROLLMENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ENROLLMENTS_FAIL,
            payload: error.response?.data?.message || "Error al obtener inscripciones",
        });
    }
};
export const listStudentEnrollments = ( page = 1, limit = 5) => async (dispatch, getState) => {
    try {
        dispatch({ type: ENROLLMENT_LIST_REQUEST });
        const { auth: { token } } = getState();

        const { data } = await axios.get(`${API_URL}/enrollments/student?page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: ENROLLMENT_LIST_SUCCESS, payload: data.enrollments });
    } catch (error) {
        dispatch({
            type: ENROLLMENT_LIST_FAIL,
            payload: error.response?.data?.message || "Error fetching enrollments",
        });
    }
};

export const createEnrollment = (courseId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ENROLLMENT_CREATE_REQUEST });
        const { auth: { token } } = getState();

        const { data } = await axios.post(`${API_URL}/enrollments`, { courseId }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: ENROLLMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ENROLLMENT_CREATE_FAIL,
            payload: error.response?.data?.message || "Error enrolling in course",
        });
    }
};

export const deleteEnrollment = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ENROLLMENT_DELETE_REQUEST });
        const { auth: { token } } = getState();

        await axios.delete(`${API_URL}/enrollments/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: ENROLLMENT_DELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: ENROLLMENT_DELETE_FAIL,
            payload: error.response?.data?.message || "Error cancelling enrollment",
        });
    }
};