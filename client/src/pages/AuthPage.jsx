import React, { useState } from 'react'
import {
  AuthPageContainer,
  FormContainer,
  FormInput
} from '../styles/authStyles'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { loginUser, registerUser } from '../redux/actions/authActions'

const AuthPage = ({ loginUser, registerUser, user }) => {
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
  if (user) return <Redirect to='/events' />
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

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  registerUser: (name, email, password) =>
    dispatch(registerUser(name, email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
