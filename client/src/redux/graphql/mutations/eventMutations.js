export const fetchEventsMu = () => `
  query {
    events {
      _id
      name
      description
      eventPrice
      user {
        _id
      }
    }
  }
`

export const createEventMu = ({ name, description, eventPrice }) => `
  mutation {
    createEvent(event: { name: "${name}", description: "${description}", eventPrice: ${eventPrice} }) {
      _id
      name
      description
      eventPrice
      user {
        _id
      }
    }
  }
`
