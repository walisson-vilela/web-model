import {
  Input as SemanticInput,
  InputProps as SemanticInputProps,
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'

import { DropdownDirection } from './interfaces'

interface ContainerProps {
  fluid?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${(props) => (props.fluid ? '100%' : 'min-content')};
`

export const SelectBtn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 51px;
  height: 100%;
  padding: 0 7px;
  background-color: transparent;
  border: none;

  :not(:disabled) {
    cursor: pointer;

    :hover {
      background-color: #0000000d;
    }
  }

  display: flex;
  align-items: center;

  > i.icon {
    margin: 0;

    :before {
      display: block;
      width: 100%;
      height: 100%;
      margin-top: -1.5px;
      color: #999999;
    }
  }
`

interface OptionsProps {
  open: boolean
  direction: DropdownDirection
}

const directions = {
  top: css`
    bottom: 100%;
  `,
  bottom: css`
    top: 100%;
  `,
}

export const Options = styled.div<OptionsProps>`
  position: absolute;

  ${(props) => directions[props.direction]}

  left: 0;
  z-index: 99;

  background-color: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  padding-right: 3.5px;

  width: 100%;

  ${(props) =>
    props.open
      ? css`
          max-height: 200px;
          opacity: 1;
        `
      : css`
          max-height: 0;
          opacity: 0;
        `}

  overflow: hidden;
  display: flex;

  transition-property: max-height opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
`

export const OptionsContainer = styled.div`
  max-height: 100%;
  width: 100%;

  overflow: hidden scroll;
  scrollbar-color: #adadad #fff;

  :-webkit-scrollbar {
    width: 7px;
  }
  :-webkit-scrollbar-thumb {
    background: #adadad;
  }
  :-webkit-scrollbar-track {
    background: #fff;
  }

  padding: 7px 3.5px 7px 0px;

  > div {
    padding: 7px 0 7px 7px;
    display: flex;
    align-items: center;

    cursor: pointer;
    :hover {
      background-color: #0000000d;
    }

    > div {
      margin: 1px 7px 0 0;
    }

    > span {
      margin-left: 7px;
      color: #999999;
    }
  }
`

interface InputProps extends SemanticInputProps {
  $borderless?: boolean
}

export const Input = styled(SemanticInput)<InputProps>`
  &.ui.input input,
  &.ui.input input:not([type]),
  &.ui.input input[type='date'],
  &.ui.input input[type='datetime-local'],
  &.ui.input input[type='email'],
  &.ui.input input[type='file'],
  &.ui.input input[type='number'],
  &.ui.input input[type='password'],
  &.ui.input input[type='search'],
  &.ui.input input[type='tel'],
  &.ui.input input[type='text'],
  &.ui.input input[type='time'],
  &.ui.input input[type='url'] {
    padding-left: 51px;

    ${(props) =>
      props.$borderless &&
      css`
        border-color: transparent;
      `}
    color:#263046 !important;
    &:focus {
      border-color: #c8c8c8;
    }
  }
`

const coordinate = {
  ar: '5410px 0px',
  br: '4950px 0px',
  cl: '4625px 0px',
  es: '4075px 0px',
  us: '389px 1px',
  mx: '2074px 1px',
  py: '1445px 1px',
  pt: '1489px 0px',
  uy: '367px 0px',
}

interface ImgProps {
  name: 'ar' | 'br' | 'cl' | 'es' | 'us' | 'mx' | 'py' | 'pt' | 'uy'
}

export const Img = styled.div<ImgProps>`
  height: 14px;
  width: 20px;
  background-image: url(/assets/images/flags/flags.png);
  background-position: ${(props) => coordinate[props.name]};
`
