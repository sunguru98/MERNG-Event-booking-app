import actionTypes from '../actionTypes'
import Axios from 'axios'
import { all, put, takeEvery, takeLatest, call } from 'redux-saga/effects'
import {
  createEventMu,
  fetchEventsMu
} from '../graphql/mutations/eventMutations'
const { SET_EVENTS, FETCH_EVENTS, CREATE_EVENT, ADD_EVENT } = actionTypes

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
          eventPrice: createEvent.eventPrice
        }
      })
    } catch (err) {
      yield console.log(err.message)
      yield alert('Some error has occurred')
    }
  })
}

export default function*() {
  yield all([call(onEventsFetch), call(onCreateEvent)])
}
