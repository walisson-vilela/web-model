import { Card } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const DonutWrapper = styled(Card)`
  .text {
    color: #000 !important;
  }
`

export const PopUpContent = styled.div`
  width: 100% !important;
  height: 100% !important;

  .content {
    width: 149px !important;
    margin: auto !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left !important;
    margin: 0;

    .title,
    .p1,
    .p2 {
      width: 100% !important;
      text-align: left !important;
      margin: 0;
      padding: 0;
    }
  }
`

export const Title = styled.strong`
  border-bottom: 1px solid #000;
`

interface TextProps {
  currentDay: boolean
}

export const Text = styled.strong<TextProps>`
  font-size: 13px;
  margin: 0 3px;
  ${(props) =>
    props.currentDay &&
    css`
      border-bottom: 1px solid #000;
    `}
`
