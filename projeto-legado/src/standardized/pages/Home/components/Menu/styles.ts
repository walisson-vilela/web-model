import styled from 'styled-components'

import { useLoadingAnimation } from '../../styles'

import { CONTAINER_WIDTH } from './constants'

export { RoundedImage } from '../../../../components/form/sections/Avatar/styled'

export const HamburguerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div<{ $loading: boolean }>`
  position: relative;
  width: ${CONTAINER_WIDTH}px;
  flex: 1;
  z-index: 991;
  background-color: ${({ theme }) => theme.colors.darkBlue};

  ${({ $loading: loading }) => loading && useLoadingAnimation()}
`
