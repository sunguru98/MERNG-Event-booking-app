import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavBarContainer = styled.header`
  width: 100%;
  height: 3.5rem;
  background: orange;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const NavBarLogo = styled.div`
  & h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
`

export const NavBarLinks = styled.ul`
  margin: 0 1.5rem;
  padding: 0;
  list-style: none;
`

const NavBarLinkStyles = css`
  color: white;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  font-size: 1.6rem;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
  &:hover {
    color: black;
  }
`

export const NavBarItem = styled(NavLink)`
  ${NavBarLinkStyles}
`
export const NavBarItemN = styled.li`
  ${NavBarLinkStyles}
`
