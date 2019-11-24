import React from 'react'
import EventsPage from './pages/EventsPage'
import AuthPage from './pages/AuthPage'
import BookingsPage from './pages/BookingsPage'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='App'>
      <NavBar />
      <div style={{ minHeight: 'calc(100vh - 3.5rem)', background: 'orange' }}>
        <Switch>
          <Route exact path='/' render={rProps => <h1>Home page</h1>} />
          <Route exact path='/auth' component={AuthPage} />
          <Route exact path='/bookings' component={BookingsPage} />
          <Route exact path='/events' component={EventsPage} />
        </Switch>
      </div>
    </div>
  )
}

export default App
