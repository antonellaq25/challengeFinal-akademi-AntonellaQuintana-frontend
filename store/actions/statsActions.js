import axios from "axios";
import {
    GET_STATS_REQUEST,
    GET_STATS_SUCCESS,
    GET_STATS_FAILURE,
    
} from "../types/statsTypes";
const API_URL = "http://localhost:3000";

export const getStats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_STATS_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/users/stats`, config);
        console.log("STATS recibidos:", data); 

        dispatch({
            type: GET_STATS_SUCCESS,
            payload: data, 
        });
    } catch (error) {
        dispatch({
            type: GET_STATS_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Error getting courses",
        });
    }
};

