import axios from "axios"
import { setAuthToken } from "../../utils/setAuthToken"
import jwt_decode from "jwt-decode"

import * as types from "../types"

export const registerUser = (data, history) => async (dispatch) => {
    await axios
        .post("/api/auth/register", data)
        .then(() => history.push("/login"))
        .catch((error) =>
            dispatch({ type: types.GET_ERRORS, payload: error.message })
        )
}

export const loginUser = (data) => async (dispatch) => {
    await axios
        .post("/api/auth/login", data)
        .then((res) => {
            const { token } = res.data
            localStorage.setItem("token", token)

            setAuthToken(token)

            const decoded = jwt_decode(token)

            dispatch(setCurrentUser(decoded))
        })
        .catch((error) =>
            dispatch({ type: types.GET_ERRORS, payload: error.message })
        )
}

export const setCurrentUser = (decoded) => ({
    type: types.SET_CURRENT_USER,
    payload: decoded,
})

export const setLoading = () => ({
    type: types.USER_LOADING,
})

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token")

    setAuthToken(false)

    dispatch(setCurrentUser({}))
}
