import styled from 'styled-components'

import { HeaderLine } from '../../styles'

export const Container = styled.div`
  width: 100%;
  max-height: 100%;
  position: absolute;
  padding: 14px;
`

export const Template3Container = styled(Container)``
export const Template3Line = styled(HeaderLine)`
  background-color: #dadada;
  height: ${({ $height: height }) => height};
`
