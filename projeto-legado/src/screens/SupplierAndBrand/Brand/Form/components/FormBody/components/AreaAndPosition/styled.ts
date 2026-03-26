import styled, { css } from 'styled-components'

export {
  Section,
  Subtitle,
  Title,
} from '../../../../../../../../standardized/components/form/components'
export { SubSection } from '../../../../styled'

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

export const EmptyMessage = styled.div`
  color: #a6acb1cc;
  ${({ theme }) => theme.useTypography('h4')};
  font-weight: normal;
  line-height: 17px;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Message = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.getColor('lightestGrey', 95)};
  top: 0;
  left: 0;
  z-index: 2;
  ${({ theme }) => theme.useTypography('p')}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey};
`
