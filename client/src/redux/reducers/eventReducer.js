import actionTypes from '../actionTypes'
const { SET_EVENTS, CLEAR_EVENTS, ADD_EVENT } = actionTypes

const initialState = {
  events: null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_EVENTS:
      return { ...state, events: payload }
    case CLEAR_EVENTS:
      return { events: null }
    case ADD_EVENT:
      return { ...state, events: [...state.events, payload] }
    default:
      return state
  }
}
