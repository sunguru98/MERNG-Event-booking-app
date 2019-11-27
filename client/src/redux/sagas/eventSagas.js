import actionTypes from '../actionTypes'
import Axios from 'axios'
import { all, put, takeEvery, takeLatest, call } from 'redux-saga/effects'
import {
  createEventMu,
  fetchEventsMu
} from '../graphql/mutations/eventMutations'
import {
  cancelBookingMutation,
  bookEventMutation,
  fetchBookingsMutation
} from '../graphql/mutations/bookingMutations'

const {
  SET_EVENTS,
  FETCH_EVENTS,
  FETCH_BOOKINGS,
  CREATE_EVENT,
  ADD_EVENT,
  ADD_BOOKING,
  BOOK_EVENT,
  DELETE_BOOKING,
  CANCEL_BOOKING,
  SET_BOOKINGS
} = actionTypes

function* onEventsFetch() {
  yield takeEvery(FETCH_EVENTS, function*() {
    try {
      const {
        data: {
          data: { events },
          errors
        }
      } = yield Axios.post(
        '/graphql',
        JSON.stringify({ query: fetchEventsMu() })
      )
      if (errors) throw new Error(errors[0].message)
      yield put({ type: SET_EVENTS, payload: events })
    } catch (err) {
      console.log(err.message)
      yield alert('Some error has occured')
    }
  })
}

function* onCreateEvent() {
  yield takeLatest(CREATE_EVENT, function*({
    payload: { name, description, eventPrice }
  }) {
    try {
      const requestBody = yield JSON.stringify({
        query: createEventMu({ name, description, eventPrice })
      })
      const {
        data: {
          data: { createEvent },
          errors
        }
      } = yield Axios.post('/graphql', requestBody)
      if (errors) throw new Error(errors[0].message)
      yield put({
        type: ADD_EVENT,
        payload: {
          _id: createEvent._id,
          name: createEvent.name,
          description: createEvent.description,
          eventPrice: createEvent.eventPrice,
          user: {
            _id: createEvent.user._id
          }
        }
      })
    } catch (err) {
      yield console.log(err.message, err)
      yield alert('Some error has occurred')
    }
  })
}

function* onBookingsFetch() {
  yield takeEvery(FETCH_BOOKINGS, function*() {
    try {
      const requestBody = JSON.stringify({ query: fetchBookingsMutation() })
      const {
        data: {
          data: { bookings },
          errors
        }
      } = yield Axios.post('/graphql', requestBody)
      if (errors) throw new Error(errors[0].message)
      yield put({ type: SET_BOOKINGS, payload: bookings })
    } catch (err) {
      console.log(err.message)
      alert('Some error has occured')
    }
  })
}

function* onBookEvent() {
  yield takeLatest(BOOK_EVENT, function*({ payload: { eventId } }) {
    try {
      const requestBody = yield JSON.stringify({
        query: bookEventMutation(eventId)
      })
      const {
        data: {
          data: { bookEvent },
          errors
        }
      } = yield Axios.post('/graphql', requestBody)
      if (errors) throw new Error(errors[0].message)
      const {
        _id,
        event: { _id: eventIdenti, name, description },
        user: { _id: userIdenti, name: userName }
      } = bookEvent
      yield put({
        type: ADD_BOOKING,
        payload: {
          _id,
          event: { _id: eventIdenti, name, description },
          user: { _id: userIdenti, name: userName }
        }
      })
      yield alert('Event booked successfully')
    } catch (err) {
      console.log(err.message)
      alert('Some error has occured')
    }
  })
}

function* onCancelBooking() {
  yield takeLatest(CANCEL_BOOKING, function*({ payload: { bookingId } }) {
    try {
      const requestBody = yield JSON.stringify({
        query: cancelBookingMutation(bookingId)
      })
      const {
        data: { errors }
      } = yield Axios.post('/graphql', requestBody)
      if (errors) throw new Error(errors[0].message)
      yield alert('Booking cancelled successfully')
      yield put({ type: DELETE_BOOKING,
        CANCEL_BOOKING, payload: bookingId })
    } catch (err) {
      console.log(err.message)
      alert('Some error has occured')
    }
  })
}

export default function*() {
  yield all([
    call(onEventsFetch),
    call(onCreateEvent),
    call(onBookingsFetch),
    call(onBookEvent),
    call(onCancelBooking)
  ])
}
