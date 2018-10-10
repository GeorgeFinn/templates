import { showLoading, hideLoading } from "react-redux-loading"
import axios from "axios"
import jwt_decode from "jwt-decode"

import setAuthToken from "../utils/setAuthToken"
import { GET_ERRORS, SET_CURRENT_USER } from "./types"

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data // Save to localStorage
      localStorage.setItem("jwtToken", token) // Set token to ls
      setAuthToken(token) // Set token to Auth header
      const decoded = jwt_decode(token) // Decode token to get user data
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken") // Remove token from localStorage
  setAuthToken(false) // Remove auth header for future requests
  dispatch(setCurrentUser({})) // Set current user to {} which will set isAuthenticated to false
}
