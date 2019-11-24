import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavBarContainer = styled.header`
  width: 100%;
  height: 3.5rem;
  background: orange;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const NavBarLogo = styled.div`
  & h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
`

const NavBarLinks = styled.ul`
  margin: 0 1.5rem;
  padding: 0;
  list-style: none;
`
const NavBarItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
  &:hover {
    color: black;
  }
`

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBarLogo>
        <h1>GraphEvent</h1>
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

export default NavBar
