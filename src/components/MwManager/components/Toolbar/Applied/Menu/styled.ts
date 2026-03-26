import styled, { css } from 'styled-components'

import { TransparentButton, scrollbar } from '../../../../styled'

interface ContainerProps {
  /** indicador de dropdown aberto */
  $open: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 275px;
  height: 0px;
  box-shadow: 0px 3px 6px #00000029;
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  transition-property: height opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  background-color: #fff;
  z-index: 99;
  overflow: hidden;
  border-radius: 4px;
  color: #525a6a;
  font-size: 14px;

  ${({ $open: open }) =>
    open &&
    css`
      height: 261px;
    `}
`

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 7px 0 14px 0;
`

export const ItemListContainer = styled.div`
  padding: 0px 3.5px 0px 14px;
  overflow: hidden;
`

export const ItemList = styled.div`
  overflow: hidden scroll;
  padding-right: 3.5px;
  max-height: 100%;

  ${scrollbar}
`

export const FlexContainer = styled.div`
  padding: 7px 14px;

  display: flex;
  justify-content: space-between;
  color: rgba(38, 48, 70, 0.5);

  > h4 {
    ${({ theme }) => theme.useTypography('h4')}
    margin: 0;
    color: #263046;
  }
`

export const SearchContainer = styled.div`
  padding: 7px 14px;
`

export const FlexItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  align-items: center;

  border-bottom: 1px solid #67676733;
`

export const Link = styled(TransparentButton)`
  width: auto;
  ${({ theme }) => theme.useTypography('p')}

  color: rgb(38, 48, 70);
  opacity: 0.5;
  cursor: pointer;

  &:disabled {
    color: #999999;
  }
`

export const RemoveLink = styled(TransparentButton)`
  width: auto;
  ${({ theme }) => theme.useTypography('p')}
  height: min-content;
  display: flex;

  &:disabled {
    color: #999999;
    i {
      border-color: #999999;
    }
  }
`

export const OpacityText = styled.span`
  ${({ theme }) => theme.useTypography('p')}
  color: rgba(38, 48, 70, 0.5);
`

export const FilterContainer = styled.div`
  width: calc(100% - 21px);
`

export const EmptyMessage = styled.div`
  padding: 0 20px;
  margin-top: 49px;
  color: #c8c8c8;
  ${({ theme }) => theme.useTypography('p')}
`

export const Title = styled.h4`
  ${({ theme }) => theme.useTypography('h4')}

  margin: 0;
  color: #263046;
`
