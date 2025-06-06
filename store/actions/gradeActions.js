import axios from "axios";
import {
    GET_GRADES_REQUEST,
    GET_GRADES_SUCCESS,
    GET_GRADES_FAILURE,
    CREATE_GRADE_SUCCESS,
    CREATE_GRADE_FAILURE,
    CREATE_GRADE_REQUEST,
    UPDATE_GRADE_REQUEST,
    UPDATE_GRADE_SUCCESS,
    UPDATE_GRADE_FAILURE
} from "../types/gradeTypes";
const API_URL = "http://localhost:3000"

export const getGradesByCourse = (courseId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_GRADES_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(`${API_URL}/grades/course/${courseId}`, config);

        dispatch({ type: GET_GRADES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_GRADES_FAILURE,
            payload: error.response?.data?.message || "Error al obtener calificaciones",
        });
    }
};
export const getGradesByStudent = (courseId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_GRADES_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(`${API_URL}/grades/student`, config);

        dispatch({ type: GET_GRADES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_GRADES_FAILURE,
            payload: error.response?.data?.message || "Error getting grades",
        });
    }
};

export const createGrade = (gradeData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_GRADE_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.post(`http://localhost:3000/grades`, gradeData, config);

        dispatch({ type: CREATE_GRADE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_GRADE_FAILURE,
            payload: error.response?.data?.message || "Error al crear calificación",
        });
    }
};
export const updateGrade = (gradeId, score) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_GRADE_REQUEST, });

        const { auth: { token } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.put(`${API_URL}/grades/${gradeId}`, { score }, config);

        dispatch({
            type: UPDATE_GRADE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_GRADE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};