import styled, { css } from 'styled-components'

export { Link } from '../../styles'

export const ColorSquare = styled.div<{ value: string }>`
  width: ${({ theme }) => theme.spacings.s3};
  height: ${({ theme }) => theme.spacings.s3};
  position: relative;

  ${({ value }) =>
    value
      ? css`
          background-color: ${value};
        `
      : css`
          background-image: url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%23CCC' width='50' height='50' x='0' y='0' /><rect fill='%23CCC' width='50' height='50' x='50' y='50' /></svg>");
          background-size: 5.65px;
        `};

  :hover {
    opacity: 0.75;
  }
`

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  width: 207px;
`

export const Content = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  align-items: center;
`
