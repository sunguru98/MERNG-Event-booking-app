import React from 'react'
import {
  NavBarContainer,
  NavBarItem,
  NavBarLinks,
  NavBarItemN,
  NavBarLogo
} from '../styles/navBarStyles'

import { connect } from 'react-redux'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { createStructuredSelector } from 'reselect'
import { logoutUser } from '../redux/actions/authActions'

const NavBar = ({ user, logoutUser }) => {
  const handleClick = () => logoutUser()
  return (
    <NavBarContainer>
      <NavBarLogo>
        <NavBarItem to='/'>GraphEvent</NavBarItem>
      </NavBarLogo>
      <NavBarLinks>
        {!user ? (
          <NavBarItem to='/auth' activeStyle={{ color: 'black' }}>
            Authenticate
          </NavBarItem>
        ) : (
          <NavBarItemN onClick={handleClick}>Logout</NavBarItemN>
        )}
        <NavBarItem to='/events' activeStyle={{ color: 'black' }}>
          Events
        </NavBarItem>
        <NavBarItem to='/bookings' activeStyle={{ color: 'black' }}>
          Bookings
        </NavBarItem>
      </NavBarLinks>
    </NavBarContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
