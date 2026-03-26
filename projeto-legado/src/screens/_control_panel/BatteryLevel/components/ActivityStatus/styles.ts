import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  cursor: pointer;

  & > :last-child {
    ::before {
      width: 14px !important;
      height: 14px !important;
      top: calc(50% - 7px) !important;
    }
  }
`

export const Text = styled.span`
  font: normal normal normal 14px/24px Lato;
  color: #000000cc;
`
