import actionTypes from '../actionTypes'
const { SET_ACCESS_TOKEN, SET_USER, CLEAR_AUTH } = actionTypes

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  accessToken: sessionStorage.getItem('accessToken') || null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_ACCESS_TOKEN:
      sessionStorage.setItem('accessToken', payload)
      return { ...state, accessToken: payload }
    case SET_USER:
      sessionStorage.setItem('user', JSON.stringify(payload))
      return { ...state, user: payload }
    case CLEAR_AUTH:
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('accessToken')
      return { ...state, user: null, accessToken: null }
    default:
      return state
  }
}
