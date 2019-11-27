import actionTypes from '../actionTypes'
const { FETCH_EVENTS, CREATE_EVENT } = actionTypes

export const fetchEvents = () => ({
  type: FETCH_EVENTS
})

export const createEvent = ({ name, description, eventPrice }) => ({
  type: CREATE_EVENT,
  payload: { name, description, eventPrice }
})
