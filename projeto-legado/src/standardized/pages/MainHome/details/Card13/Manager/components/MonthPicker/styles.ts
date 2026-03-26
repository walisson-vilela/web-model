import styled from 'styled-components'

export const Control = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`

export const NavButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`

export const ValueButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: #4b5563;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const PopupContent = styled.div`
  padding: 0;
  margin: 0;
  width: 180px;
  max-height: 160px;
  overflow: auto;

  > button {
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 13px;
    color: #263046;

    &:hover {
      background: #f3f4f6;
    }
  }
`
