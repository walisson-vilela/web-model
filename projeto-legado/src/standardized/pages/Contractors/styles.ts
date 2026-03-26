import styled, { css } from 'styled-components'

export { default as EmptyMessage } from '../../components/EmptyMessage'
export { Subtitle, Title } from '../../components/form/components'

export const Link = styled.div`
  ${({ onClick, theme }) => {
    return onClick
      ? css`
          cursor: pointer;
          :hover {
            color: ${theme.colors.darkGrey};
            text-decoration: underline;
          }
        `
      : css`
          opacity: 0.5;
        `
  }}
`
