export const bookEventMutation = eventId => `
mutation {
  bookEvent(eventId: "${eventId}") {
    _id
    event {
      _id
      name
      description
    }
    user {
      _id
      name
    }
  }
}
`

export const cancelBookingMutation = bookingId => `
  mutation {
    cancelBooking(bookingId: "${bookingId}") {
      _id
    }
  }
`

export const fetchBookingsMutation = () => `
  query {
    bookings {
        _id
      event {
        _id
        name
        description
      }
      user {
        _id
        name
      }
    }
  }
`
