import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalBox = styled.div`
  background: #fff;
  min-height: 60vh;
  padding: 2rem;
  position: relative;
  border-radius: 1rem;
  min-width: 50vw;
`
export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1.55rem;
  right: 3rem;
  background: black;
  border-radius: 10rem;
  height: 2.5rem;
  width: 3px;
  transform: rotate(45deg);
  &:before {
    content: '';
    display: block;
    height: 2.5rem;
    width: 3px;
    background: black;
    transform: rotate(-90deg);
  }
`
