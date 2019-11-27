import React from 'react'
import {
  NavBarContainer,
  NavBarItem,
  NavBarLinks,
  NavBarLogo
} from '../styles/navBarStyles'

import { connect } from 'react-redux'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { createStructuredSelector } from 'reselect'

const NavBar = ({ user }) => {
  return (
    <NavBarContainer>
      <NavBarLogo>
        <NavBarItem to='/'>GraphEvent</NavBarItem>
      </NavBarLogo>
      <NavBarLinks>
        <NavBarItem to='/auth' activeStyle={{ color: 'black' }}>
          Authenticate
        </NavBarItem>
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

export default connect(mapStateToProps)(NavBar)
