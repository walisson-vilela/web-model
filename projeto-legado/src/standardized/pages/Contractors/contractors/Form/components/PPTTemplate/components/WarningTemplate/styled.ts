import styled from 'styled-components'

export { Link } from '../../styles'

export const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => theme.spacings.s3};
  margin-top: auto;

  border: 1px solid ${({ theme }) => theme.colors.vanilla};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.floralWhite};
  color: ${({ theme }) => theme.colors.bronze};

  > div {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    align-items: center;

    :nth-child(1) {
      font-size: ${({ theme }) => theme.spacings.s4};
      font-weight: bold;
    }
  }
`
