import styled from 'styled-components'

export const AuthPageContainer = styled.section`
  min-height: calc(100vh - 3.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const FormContainer = styled.div`
  background: white;
  position: relative;
  border-radius: 1rem;
  padding: 2rem;
  min-height: 60vh;
  width: 40vw;
`

export const FormInput = styled.input`
  border: 1px solid orange;
  border-radius: 5px;
  outline: none;
  font-size: 1.6rem;
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
