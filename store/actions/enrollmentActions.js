import axios from "axios";
import {
  GET_ENROLLMENTS_REQUEST,
  GET_ENROLLMENTS_SUCCESS,
  GET_ENROLLMENTS_FAILURE,
} from "../types/entollmentTypes";

export const getEnrollmentsByCourse = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ENROLLMENTS_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`http://localhost:3000/enrollments/course/${courseId}`, config);

    dispatch({ type: GET_ENROLLMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ENROLLMENTS_FAILURE,
      payload: error.response?.data?.message || "Error al obtener inscripciones",
    });
  }
};
