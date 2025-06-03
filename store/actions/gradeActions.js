import axios from "axios";
import {
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_GRADES_FAILURE,
  CREATE_GRADE_SUCCESS,
  CREATE_GRADE_FAILURE,
  CREATE_GRADE_REQUEST,
} from "../types/gradeTypes";

export const getGradesByCourse = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_GRADES_REQUEST });

    const { auth: { token } } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`http://localhost:3000/grades/course/${courseId}`, config);

    dispatch({ type: GET_GRADES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_GRADES_FAILURE,
      payload: error.response?.data?.message || "Error al obtener calificaciones",
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
