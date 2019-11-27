import { all, call } from 'redux-saga/effects'
import authSagas from './sagas/authSagas'
import eventSagas from './sagas/eventSagas'

export default function*() {
  yield all([call(authSagas), call(eventSagas)])
}
