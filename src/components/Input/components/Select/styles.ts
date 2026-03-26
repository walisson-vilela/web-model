import styled, { css } from 'styled-components'

import type { SelectProps } from './'

type RelativeContainerProps = {
  $width?: SelectProps['width']
}

export const RelativeContainer = styled.div<RelativeContainerProps>`
  position: relative;
  ${({ $width: width }) => {
    return !width
      ? null
      : css`
          width: ${width};
        `
  }};
`

export const EmptyContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacings.s3};
`

export const HiddenInput = styled.input`
  width: 0;
  height: 0;
  border-width: 0;
  padding: 0;
  position: absolute;
  outline: none;
`
