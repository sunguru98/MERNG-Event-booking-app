import React from 'react'
import EventsPage from './pages/EventsPage'
import AuthPage from './pages/AuthPage'
import BookingsPage from './pages/BookingsPage'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={rProps => <h1>Home page</h1>} />
        <Route exact path='/auth' component={AuthPage} />
        <Route exact path='/bookings' component={BookingsPage} />
        <Route exact path='/events' component={EventsPage} />
      </Switch>
    </div>
  )
}

export default App
