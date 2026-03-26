import styled from 'styled-components'

export const IconContainer = styled.div`
  display: flex;
  align-items: center;

  > i.icon {
    margin-top: -1px;
  }
`

export const RelativeContainer = styled.div`
  position: relative;
`

export const Label = styled.div`
  ${({ theme }) => theme.useTypography('p')}

  color: ${({ theme }) => theme.colors.greyishBlue};

  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};

  > span {
    color: ${({ theme }) => theme.colors.darkestGrey};
  }
`
