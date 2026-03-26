import { MwInput } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 110px;
  }
`

export const subtitle = styled.h5`
  font: normal normal 600 16px/24px Lato;
  letter-spacing: 0px;
  color: #192338;
  margin-top: 21px;
  margin-bottom: 31px;
`

interface SpanSelectAllProps {
  selectedAll: boolean
}

export const SpanSelectAll = styled.span<SpanSelectAllProps>`
  height: 126px;
  width: 17px;
  ${(props) => {
    if (!props.selectedAll) {
      return css`
        opacity: 50%;
      `
    }
    return css`
      opacity: 1;
    `
  }}
`

export const DivComponent = styled.span`
  height: 64px;
  width: 22px;
  font: normal normal bold 18px/22px Lato;
  letter-spacing: 0px;
  color: #263046;
`

export interface SpanPDVinterface {
  error: boolean
}

export const SpanPDV = styled.span<SpanPDVinterface>`
  ${(props) => (props.error ? `color: red;` : `opacity: 50%;`)}
  margin-left: 22px;
`

export const DivPDV = styled.div`
  display: flex;
  margin-left: 15px;
  margin-top: 5px;
`

export const Notification = styled.div`
  min-width: 338px;
  strong {
    font-size: 16px;
  }
`

export const CostumeMwInput = styled(MwInput)`
  span {
    border-color: #c8c8c8 !important;
  }
`
