import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'
import styled from 'styled-components'

import { Card } from '../../styles'

export const Container = styled(Card)`
  min-height: 145px;
  height: 100%;
  display: flex;
  position: relative;
`

interface BorderProps {
  color: ColorOptions | string
}

export const Border = styled.div<BorderProps>`
  width: 5px;
  border-radius: 7px 0 0 7px;
  background-color: ${({ theme, color }) => theme.colors[color] || color};
  cursor: pointer;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ContentTop = styled.div`
  flex: 1;
  border-bottom: 1px solid #e2e2e3;
  padding: 14px 42px 14px 14px;
`

export const ContentBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 14px;
`
