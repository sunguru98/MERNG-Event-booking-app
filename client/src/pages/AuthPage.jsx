import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const AuthPageContainer = styled.section`
  min-height: calc(100vh - 3.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const FormContainer = styled.div`
  background: white;
  position: relative;
  border-radius: 1rem;
  padding: 2rem;
  min-height: 60vh;
  width: 40vw;
`

const FormInput = styled.input`
  border: 1px solid orange;
  border-radius: 5px;
  outline: none;
  &:not([type='submit']) {
    display: block;
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
    &::placeholder {
      color: orange;
    }
  }
  &[type='submit'] {
    cursor: pointer;
    position: absolute;
    bottom: 2rem;
    padding: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    background: orange;
    color: white;
    font-weight: bold;
    text-align: center;
    border-radius: 1rem;
  }
`

export const AuthPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: ''
  })

  const { email, password, name } = formState

  const [loginState, setLoginState] = useState(true)

  const handleSubmit = async event => {
    event.preventDefault()
    if (loginState) return await loginUser(email, password)
    else return await registerUser(name, email, password)
  }

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  const swapAuthMode = () => {
    setLoginState(!loginState)
    setFormState({ name: '', email: '', password: '' })
  }

  const registerUser = async (name, email, password) => {
    const requestBody = {
      query: `
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
    }
    const response = await axios.post('/graphql', JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data.createUser)
  }

  const loginUser = async (email, password) => {
    const requestBody = {
      query: `
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
    }
    const response = await axios.post('/graphql', JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data.loginUser)
  }

  return (
    <AuthPageContainer>
      <FormContainer>
        <h2>Sign {loginState ? 'in' : 'up'}</h2>
        <form onSubmit={handleSubmit}>
          {!loginState ? (
            <FormInput
              type='text'
              name='name'
              onChange={handleChange}
              value={name}
              placeholder='Name'
              required
            />
          ) : null}
          <FormInput
            onChange={handleChange}
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            required
          />
          <FormInput
            onChange={handleChange}
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            required
          />
          <span style={{ cursor: 'pointer' }} onClick={swapAuthMode}>
            {!loginState
              ? 'Already Registered ? Sign in'
              : 'New User ? Sign up'}
          </span>
          <FormInput
            onChange={handleChange}
            type='submit'
            value={`${loginState ? 'Sign in' : 'Sign up'}`}
          />
        </form>
      </FormContainer>
    </AuthPageContainer>
  )
}

export default AuthPage
