import styled, { css } from 'styled-components'

const ButtonStyles = css`
  cursor: pointer;
  bottom: 2rem;
  padding: 1rem;
  font-size: 1.6rem;
  background: ${({ inverted }) => (inverted ? 'white' : 'orange')};
  color: ${({ inverted }) => (inverted ? 'orange' : 'white')};
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  border-color: transparent;
`

const FormInputStyles = css`
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
`

export const FormInput = styled.input`
  ${FormInputStyles}
`

export const FormInputTextArea = styled.textarea`
  ${FormInputStyles}
  resize: none;
  min-height: 15rem;
`

export const SubmitButton = styled.input.attrs({
  type: 'submit'
})`
  ${ButtonStyles}
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
`

export const Button = styled.button`
  ${ButtonStyles}
  outline: none;
`
