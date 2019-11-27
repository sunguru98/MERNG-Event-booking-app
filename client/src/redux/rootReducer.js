import { combineReducers } from 'redux'

import authReducer from './reducers/authReducer'
import eventReducer from './reducers/eventReducer'

export default combineReducers({
  auth: authReducer,
  event: eventReducer
})
