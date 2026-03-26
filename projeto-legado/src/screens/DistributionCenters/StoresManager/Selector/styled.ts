import styled, { css } from 'styled-components'

export const AddressContainer = styled.b`
  font-weight: normal;
  font-size: 12px;
  color: #8a8f99;
  line-height: 1.4285em;
`

interface ContainerProps {
  disabled?: boolean
}

export const Container = styled.span<ContainerProps>`
  ${(props) => {
    if (!props.disabled) return css``
    return css`
      opacity: 0.5;
    `
  }}

  i {
    position: absolute;
    right: 7px;
    top: calc(50% - 10px);

    width: 14px !important;
    height: 14px !important;
    font-size: 14px !important;
    margin: 0 !important;
  }
`
