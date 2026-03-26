import styled from 'styled-components'

import { TransparentButton } from '../../../styled'

export const Icon = styled.svg`
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
`

export const Container = styled(TransparentButton)`
  display: flex;
  width: unset;
  max-width: 100%;
  position: relative;
  color: inherit;
  font-weight: bold;
  line-height: inherit;
  gap: 6px;
  padding-right: 0;
  font-size: 14px;
  line-height: 17px;
`
