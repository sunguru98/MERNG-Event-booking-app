export const loginMutation = (email, password) => `
  mutation {
    loginUser(email: "${email}", password: "${password}") {
      user {
        _id
        email
        name
      }
      accessToken
      expiresIn
    }
  }
`

export const registerMutation = (name, email, password) => `
  mutation {
    createUser(user: { email: "${email}", password: "${password}", name: "${name}" }) {
      user {
        _id
        email
        name
      }
      accessToken
      expiresIn
    }
  }
`
