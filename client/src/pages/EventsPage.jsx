import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { Redirect } from 'react-router-dom'

export const EventsPage = ({ user }) => {
  if (!user) return <Redirect to='/auth' />
  return (
    <section>
      <h1>Events page</h1>
    </section>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(EventsPage)
