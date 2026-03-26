import styled, { css } from 'styled-components'

import { TransparentButton, scrollbar } from '../../../../styled'

interface ContainerProps {
  $open?: boolean
  $maxHeight?: number
  $width?: number
}

const Container = styled.div<ContainerProps>`
  ${({ theme }) => theme.useTypography('p')}

  ${TransparentButton} {
    color: #525a6a;
  }
  transition-property: width opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${({ $open: open }) => (open ? 1 : 0)};

  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  z-index: 99;
  background-color: #fff;
  position: absolute;
  top: 100%;
  max-height: ${({ $maxHeight: maxHeight }) =>
    maxHeight ? `${maxHeight}px` : '261px'};
  font-size: 14px;

  display: flex;
  flex-direction: column;
`

export const FiltersContainer = styled(Container)`
  width: ${({ $open: open, $width: width }) =>
    open ? `${width || 208}px` : 0};
  right: 0;
  padding: 7px 3.5px 7px 0;

  > div {
    overflow-y: scroll;
    padding-right: 3.5px;

    ${scrollbar}
  }

  ${TransparentButton} {
    padding: 7px 7px 7px 14px;
    display: flex;
    justify-content: space-between;

    svg {
      width: 14px;
      height: 14px;
      margin-left: 10px;
      flex: 0 0 auto;
    }

    &:hover {
      cursor: pointer;
      background-image: linear-gradient(#fff, #fafafb);
    }
  }
`

export const OptionsContainer = styled(Container)`
  width: ${({ $open: open, $width: width }) =>
    open ? `${width || 208}px` : 0};
  right: 210px;
  padding: 7px 3.5px 7px 0;
`

export const OptionsLabelContainer = styled.div`
  padding: 7px 10.5px 7px 14px;
`

interface OptionsListProps {
  $fullHeight?: boolean
}

interface OptionProps {
  $thin?: boolean
  $bordered?: boolean
}

export const Option = styled(TransparentButton)<OptionProps>`
  ${({ theme }) => theme.useTypography('p')}

  padding: ${({ $thin: thin }) =>
    thin ? '7px 0px 7px 0px' : '14px 0px 14px 0px'};
  ${({ $bordered: bordered }) => {
    return bordered
      ? css`
          border-bottom: 1px solid rgba(112, 112, 112, 0.15);
        `
      : css``
  }};

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(#fff, #fafafb);
  }
`

export const OptionsList = styled.div<OptionsListProps>`
  color: #525a6a;
  overflow: hidden scroll;
  display: flex;
  flex-direction: column;
  padding-left: 14px;
  padding-right: 3.5px;

  ${scrollbar}

  ${({ $fullHeight: fullHeight }) =>
    fullHeight &&
    css`
      height: calc(270px - 7px - 7px);
    `}
`
export const EmptyMessage = styled.div`
  ${({ theme }) => theme.useTypography('p')}

  padding: 0 20px;
  margin-top: 49px;
  color: #c8c8c8;
`

export const OptionsTitle = styled.span`
  ${({ theme }) => theme.useTypography('p', { fontWeight: 'bold' })}

  color: #263046;
  opacity: 0.5;
  display: block;
`

export const SearchContainer = styled.div`
  margin-top: 14px;
`

export const Delimiter = styled.hr`
  width: calc(100% - 20px);
  color: #707070;
  opacity: 0.16;
  border-width: 1px 0 0 0;
  margin: 0 auto;
`

export const LoaderContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 90px);
  background-color: #fff;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
`
