export const fetchEventsMu = () => `
  query {
    events {
      _id
      name
      description
      eventPrice
      creator {
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
      creator {
        _id
      }
    }
  }
`
