import actionTypes from '../actionTypes'
const {
  SET_EVENTS,
  CLEAR_EVENTS,
  ADD_EVENT,
  SET_BOOKINGS,
  DELETE_BOOKING,
  ADD_BOOKING
} = actionTypes

const initialState = {
  events: null,
  bookings: null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_EVENTS:
      return { ...state, events: payload }
    case SET_BOOKINGS:
      return { ...state, bookings: payload }
    case CLEAR_EVENTS:
      return { events: null, bookings: null }
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== payload)
      }
    case ADD_EVENT:
      return { ...state, events: [...state.events, payload] }
    case ADD_BOOKING:
      return { ...state, bookings: [...state.bookings, payload] }
    default:
      return state
  }
}
