import styled from 'styled-components'

export const EventsContainer = styled.section`
  padding: 2rem;
  color: white;
  min-height: calc(100vh - 3.5rem);
`

export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const EventBody = styled.ul`
  list-style: none;
  margin-top: 2rem;
`

export const EventItem = styled.li`
  position: relative;
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 1.5rem;
  color: black;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  & p {
    line-height: 1.7
  }
`

export const EventCreateForm = styled.form`
  margin-top: 1rem;
`
