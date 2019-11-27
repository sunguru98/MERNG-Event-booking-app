import React from 'react'
import ReactDOM from 'react-dom'
import { ModalBox, ModalContainer, CloseIcon } from '../styles/modalStyles'

const Portal = ({ children, onClick }) => {
  const portalRoot = document.querySelector('#portal')
  return ReactDOM.createPortal(
    <ModalContainer>
      <ModalBox>
        <CloseIcon onClick={onClick} />
        {children}
      </ModalBox>
    </ModalContainer>,
    portalRoot
  )
}

export default Portal
