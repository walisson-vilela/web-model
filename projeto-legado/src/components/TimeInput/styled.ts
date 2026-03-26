import { MwInput } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

import type { Apperances } from './interfaces'

interface InputProps {
  apperance?: Apperances
}

const apperances = {
  focus: css`
    border-color: #85b7d9 !important;
    background: #fff !important;
    color: rgba(0, 0, 0, 0.8) !important;
    box-shadow: none !important;
  `,
}

export const Input = styled(MwInput)<InputProps>`
  text-align: center !important;
  width: 70px;
  height: 35px;
  padding: 0px !important;

  ${(props) => {
    if (!props.apperance) return
    return apperances[props.apperance]
  }}
`
