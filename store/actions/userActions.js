import axios from "axios";
import { USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL } from "../types/userTypes";

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


        const { data } = await axios.post("http://localhost:3000/users/new", userData, config);

        dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    } catch (error) {
        console.log("Error creating user:", error.response || error.message);
        dispatch({
            type: USER_CREATE_FAIL,
            payload:
                error.response?.data?.message || "Error al crear usuario",
        });
    }
};
