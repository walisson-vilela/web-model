import styled from 'styled-components'

import { Card } from '../../styles'

interface ContainerProps {
  half?: boolean
}

export const Container = styled(Card)<ContainerProps>`
  min-height: ${({ half }) => (half ? '65px' : '130px')};
  max-height: ${({ half }) => (half ? '125px' : '250px')};
  height: ${({ half }) => (half ? 'calc(50% - 7px)' : '100%')};
  display: flex;
  flex-direction: column;
  position: relative;
`

interface HeaderProps {
  paddingless?: boolean
}

export const Header = styled.div<HeaderProps>`
  padding: 14px 63px ${({ paddingless }) => (paddingless ? '0' : '14px')} 14px;

  p {
    color: #263046;
    margin: 0;
  }
`

export const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
`

export const Subtitle = styled.p`
  font-size: 13px;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
