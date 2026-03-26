import styled from 'styled-components'

export const Trigger = styled.span`
  cursor: pointer;
`

export const Container = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  > div {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);

    :nth-child(1) {
      margin-bottom: ${({ theme }) => theme.spacings.s1};
      font-weight: bold;
    }

    :nth-child(2) {
      padding-bottom: ${({ theme }) => theme.spacings.s3};
      margin-bottom: ${({ theme }) => theme.spacings.s3};
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
    }

    :nth-child(2),
    :nth-child(3) {
      > :nth-child(1),
      > :nth-child(4) {
        font-weight: bold;
      }
    }
  }
`
