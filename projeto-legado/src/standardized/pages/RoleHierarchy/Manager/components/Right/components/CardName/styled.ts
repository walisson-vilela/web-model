import styled from 'styled-components'

export const CardNameContainer = styled.div`
  width: 158px;

  border-right: 1px solid rgb(226, 226, 227);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: ${({ theme }) => theme.spacings.s1};
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
`
export const Title = styled.div`
  ${({ theme }) => theme.useTypography('p')};
  color: ${({ theme }) => theme.colors.greyishBlue};

  line-height: 17px;
`
