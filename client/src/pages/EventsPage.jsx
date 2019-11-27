import React, { useState, useEffect } from 'react'
import Portal from '../components/Portal'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectEventEvents } from '../redux/selectors/eventSelectors'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { createEvent, fetchEvents } from '../redux/actions/eventActions'
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

export const EventsPage = ({ user, createEvent, fetchEvents, events }) => {
  const [editMode, setEditMode] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    eventPrice: ''
  })

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    setEditMode(false)
  }, [events])

  if (!user) return <Redirect to='/auth' />
  const { name, description, eventPrice } = formState

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  const handleSubmit = event => {
    event.preventDefault()
    createEvent({ name, description, eventPrice })
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
          {events.map(({ _id, name, description, eventPrice }) => (
            <EventItem key={_id}>
              <h3>{name}</h3>
              <p>{description}</p>
              <p>${eventPrice}</p>
            </EventItem>
          ))}
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
    </EventsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  events: selectEventEvents
})

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  createEvent: (name, description, eventPrice) =>
    dispatch(createEvent(name, description, eventPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
