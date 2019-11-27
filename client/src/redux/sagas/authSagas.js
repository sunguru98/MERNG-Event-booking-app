import axios from 'axios'
import history from '../history'
import actionTypes from '../actionTypes'
import {
  loginMutation,
  registerMutation,
  logoutMutation
} from '../graphql/mutation'
import { takeLatest, put, all, call } from 'redux-saga/effects'
const {
  LOGIN_USER,
  REGISTER_USER,
  SET_ACCESS_TOKEN,
  SET_USER,
  CLEAR_AUTH,
  LOGOUT_USER
} = actionTypes

function* onSignIn() {
  yield takeLatest(LOGIN_USER, function*({ payload: { email, password } }) {
    try {
      const requestBody = { query: loginMutation(email, password) }
      const {
        data: {
          data: { loginUser },
          errors
        }
      } = yield axios.post('/graphql', JSON.stringify(requestBody))
      if (errors !== undefined) throw errors[0].message
      const { user, accessToken } = loginUser
      yield (axios.defaults.headers.common['Authorization'] = accessToken)
      yield put({ type: SET_ACCESS_TOKEN, payload: accessToken })
      yield put({ type: SET_USER, payload: user })
      yield alert('You are in :)')
      history.push('/events')
    } catch (err) {
      alert(err)
    }
  })
}

function* onRegister() {
  yield takeLatest(REGISTER_USER, function*({
    payload: { name, email, password }
  }) {
    try {
      const requestBody = { query: registerMutation(name, email, password) }
      const {
        data: {
          data: { createUser },
          errors
        }
      } = yield axios.post('/graphql', JSON.stringify(requestBody))
      if (errors !== undefined) throw errors[0].message
      const { user, accessToken } = createUser
      yield (axios.defaults.headers.common['Authorization'] = accessToken)
      yield put({ type: SET_ACCESS_TOKEN, payload: accessToken })
      yield put({ type: SET_USER, payload: user })
      history.push('/events')
    } catch (err) {
      alert(err)
    }
  })
}

function* onLogout() {
  yield takeLatest(LOGOUT_USER, function*() {
    try {
      const requestBody = { query: logoutMutation() }
      const {
        data: { data, errors }
      } = yield axios.post('/graphql', JSON.stringify(requestBody))
      if (errors !== undefined) throw errors[0].message
      yield alert(data.logoutUser)
      yield put({ type: CLEAR_AUTH })
    } catch (err) {
      yield alert(err)
    }
  })
}

export default function*() {
  yield all([call(onSignIn), call(onRegister), call(onLogout)])
}
