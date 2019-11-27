import actionTypes from '../actionTypes'
const {
  FETCH_EVENTS,
  FETCH_BOOKINGS,
  CREATE_EVENT,
  BOOK_EVENT,
  CANCEL_BOOKING
} = actionTypes

export const fetchEvents = () => ({
  type: FETCH_EVENTS
})

export const fetchBookings = () => ({
  type: FETCH_BOOKINGS
})

export const createEvent = ({ name, description, eventPrice }) => ({
  type: CREATE_EVENT,
  payload: { name, description, eventPrice }
})

export const bookEvent = eventId => ({
  type: BOOK_EVENT,
  payload: { eventId }
})

export const cancelBooking = bookingId => ({
  type: CANCEL_BOOKING,
  payload: { bookingId }
})
