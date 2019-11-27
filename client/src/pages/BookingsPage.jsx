import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { Redirect } from 'react-router-dom'
import { fetchBookings, cancelBooking } from '../redux/actions/eventActions'
import { selectEventBookings } from '../redux/selectors/eventSelectors'

import {
  EventsContainer,
  EventBody,
  EventItem
} from '../styles/eventPageStyles'

import { Button } from '../styles/commonStyles'

export const BookingsPage = ({
  user,
  fetchBookings,
  cancelBooking,
  bookings
}) => {
  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  if (!user) return <Redirect to='/auth' />

  return (
    <EventsContainer>
      <h1>Bookings page</h1>
      {bookings ? (
        <EventBody>
          {bookings.map(({ _id, user, event }) => (
            <EventItem key={_id}>
              <h3>Booking ID: {_id}</h3>
              <p>Created by: {user.name}</p>
              <p>Event name: {event.name}</p>
              <Button
                onClick={() => cancelBooking(_id)}
                style={{
                  maxHeight: '5rem',
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem'
                }}>
                Cancel booking
              </Button>
            </EventItem>
          ))}
        </EventBody>
      ) : (
        <h2>Loading Bookings ...</h2>
      )}
    </EventsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  bookings: selectEventBookings
})

const mapDispatchToProps = dispatch => ({
  fetchBookings: () => dispatch(fetchBookings()),
  cancelBooking: bookingId => dispatch(cancelBooking(bookingId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingsPage)
