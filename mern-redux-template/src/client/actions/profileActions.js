import axios from 'axios'
import { GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types'
import { showLoading, hideLoading } from 'react-redux-loading'

export const getCurrentProfile = () => dispatch => {
  dispatch(showLoading())
  axios.get('/api/profile')
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data })
      dispatch(hideLoading())}
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE, //IF NO PROFILE RETURN AN EMPTY PROFILE
        payload:{}
      })
      dispatch(hideLoading())
    })
}

export const createProfile = (data, history) => dispatch => {
  axios
    .post('/api/profile', data)
    .then(res => history.push('/profile'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
