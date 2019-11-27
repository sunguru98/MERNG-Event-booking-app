import { all, call } from 'redux-saga/effects'
import authSagas from './sagas/authSagas'

export default function*() {
  yield all([call(authSagas)])
}
