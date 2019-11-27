import React, { useState, useEffect } from 'react'
import Portal from '../components/Portal'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectEventEvents,
  selectEventBookings
} from '../redux/selectors/eventSelectors'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import {
  createEvent,
  fetchEvents,
  bookEvent,
  fetchBookings
} from '../redux/actions/eventActions'
import { Redirect } from 'react-router-dom'

import {
  EventsContainer,
  EventHeader,
  EventBody,
  EventCreateForm,
  EventItem
} from '../styles/eventPageStyles'
import {
  Button,
  FormInput,
  FormInputTextArea,
  SubmitButton
} from '../styles/commonStyles'

export const EventsPage = ({
  user,
  createEvent,
  fetchEvents,
  fetchBookings,
  events,
  bookings,
  bookEvent
}) => {
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const [event, setEvent] = useState('')
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    eventPrice: ''
  })

  useEffect(() => {
    fetchEvents()
    fetchBookings()
  }, [fetchEvents, fetchBookings])

  useEffect(() => {
    setEditMode(false)
    setViewMode(false)
  }, [events, bookings])

  if (!user) return <Redirect to='/auth' />
  const { name, description, eventPrice } = formState

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  const handleSubmit = event => {
    event.preventDefault()
    createEvent({ name, description, eventPrice })
  }

  const viewEvent = eventId => {
    setViewMode(true)
    setEvent(events.find(event => event._id === eventId))
  }

  return (
    <EventsContainer>
      <EventHeader>
        <h1>All Events</h1>
        <Button inverted onClick={() => setEditMode(true)}>
          Create Event
        </Button>
      </EventHeader>
      {events ? (
        <EventBody>
          {events.map(
            ({ _id, name, description, eventPrice, ...restProps }) => (
              <EventItem key={_id}>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>${eventPrice}</p>
                {user._id !== restProps.user._id && (
                  <Button
                    onClick={viewEvent.bind(this, _id)}
                    style={{
                      maxHeight: '5rem',
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem'
                    }}>
                    View Details
                  </Button>
                )}
              </EventItem>
            )
          )}
        </EventBody>
      ) : (
        <h2>Loading Events ...</h2>
      )}
      {editMode && (
        <Portal onClick={() => setEditMode(false)}>
          <h2 style={{ textAlign: 'center' }}>Create Event</h2>
          <EventCreateForm onSubmit={handleSubmit}>
            <FormInput
              name='name'
              placeholder='Event Name'
              value={name}
              required
              onChange={handleChange}
            />
            <FormInputTextArea
              name='description'
              value={description}
              onChange={handleChange}
              required
              placeholder='Event Description'
            />
            <FormInput
              name='eventPrice'
              value={eventPrice}
              placeholder='Event Price'
              required
              onChange={event =>
                setFormState({
                  ...formState,
                  eventPrice:
                    isNaN(parseInt(event.target.value)) &&
                    event.target.value > 0
                      ? eventPrice
                      : event.target.value
                })
              }
            />
            <SubmitButton value='Create Event' />
          </EventCreateForm>
        </Portal>
      )}
      {viewMode && (
        <Portal onClick={() => setViewMode(false)}>
          <h2>Event details</h2>
          <p>{event.name}</p>
          <p>{event.description}</p>
          <p>{event.eventPrice}</p>
          {bookings.find(b => b.event._id === event._id) ? (
            <p>You have already made a booking to this event</p>
          ) : (
            <Button onClick={bookEvent.bind(this, event._id)}>
              Book Event
            </Button>
          )}
        </Portal>
      )}
    </EventsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  events: selectEventEvents,
  bookings: selectEventBookings
})

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchBookings: () => dispatch(fetchBookings()),
  createEvent: (name, description, eventPrice) =>
    dispatch(createEvent(name, description, eventPrice)),
  bookEvent: eventId => dispatch(bookEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
