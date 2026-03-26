import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const LeftContent = styled.div`
  font-size: 16px;
  color: #263046cc;
  strong {
    font-weight: bold;
  }
`

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  position: relative !important;
  justify-content: space-between;
  width: 100%;
  span,
  strong {
    font-size: 16px;
    color: #263046cc;
  }
`

export const DropDown = styled.div`
  margin-left: 16px;
`
