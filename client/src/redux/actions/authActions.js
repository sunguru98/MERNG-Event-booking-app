import actionTypes from '../actionTypes'
const { LOGIN_USER, REGISTER_USER, LOGOUT_USER } = actionTypes

export const loginUser = (email, password) => ({
  type: LOGIN_USER,
  payload: { email, password }
})

export const registerUser = (name, email, password) => ({
  type: REGISTER_USER,
  payload: { name, email, password }
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})
