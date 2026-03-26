import styled from 'styled-components'

export const Label = styled.div`
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.spacings.s1};
  ${({ theme }) => theme.useTypography('p')}
  line-height:17px;
  justify-content: space-between;
  align-item: center;
  color: ${({ theme }) => theme.colors.greyishBlue};
  overflow: hidden;
  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;

    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    :nth-child(2) {
      opacity: 0.5;
      white-space: nowrap;
    }
    :nth-child(1) {
      overflow: hidden;
    }
    :nth-child(1) > :nth-child(1) {
      font-weight: bold;
    }
    :nth-child(1) > :not(:nth-child(1)) {
      opacity: 0.5;
    }
  }
`
