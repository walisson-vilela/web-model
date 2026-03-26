import styled from 'styled-components'

import type { HeaderLineProps } from '../../interfaces'
import { HeaderLine as HeaderLineStyle } from '../../styles'

export const Container = styled.div`
  width: 100%;
  max-height: 100%;
  position: absolute;
  padding: 14px;
`

export const Template2Container = styled(Container)`
  background: #fff;
  border: 2px solid #ebebeb;
`

export const Header = styled.div`
  display: flex;
`

export const HeaderImage = styled.div`
  width: 43px;
  height: 44px;
  background-color: #ebebeb;
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

export const MainContent = styled.div`
  margin-top: 8px;
`

export const MainLine = styled(HeaderLineStyle)<HeaderLineProps>`
  margin-bottom: 14px;
  margin-left: 0;
`

export const HeaderLine = styled(HeaderLineStyle)``
