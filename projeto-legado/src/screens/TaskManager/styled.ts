import { Accordion } from 'semantic-ui-react'
import styled from 'styled-components'

import InfoSvg from './info.svg?react'

export const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 0 !important;
  font-size: 14px !important;
  font-weight: inherit !important;
  color: #999999 !important;
`

export const HeaderCell = styled.div`
  border-style: solid;
  border-color: #e2e2e3;
  border-width: 0 0 0 1px;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const SortContainer = styled.div`
  display: flex;
  justify-content: end;
  color: #949494;
`

export const SortContainerCell = styled.div`
  position: relative;
  padding: 0 3.5px;

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }

  button {
    color: #5c5b5b !important;
  }

  i,
  i.icon {
    font-size: 12px;
  }
`

export const InfoIcon = styled(InfoSvg).attrs((props) => ({
  width: 20,
  height: 20,
  opacity: 0.5,
}))`
  cursor: pointer;
`

export const SubtitleContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 7px;
`

export const AccordionsContainer = styled(Accordion)`
  overflow: hidden auto;
  flex: 1;

  .title {
    font-size: 18px !important;
    font-weight: bold;
  }
`

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, calc(calc(100% - 28px) / 3));
  gap: 14px;
  padding: 7px;
`
