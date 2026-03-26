import styled from 'styled-components'

interface WrapperProps {
  borderless?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  color: #263046b3;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: ${({ theme }) => theme.spacings.s4};
  padding-top: ${({ theme }) => theme.spacings.s3};
  padding-bottom: ${({ theme }) => theme.spacings.s3};
  border-bottom: ${({ borderless }) =>
    borderless ? 'none' : '1px solid #E8E7E8'};

  > div {
    flex-direction: column;

    :first-child {
      flex-grow: 1;
    }

    > div {
      color: #263046;
      font-weight: bold;
      font-size: ${({ theme }) => theme.spacings.s3};
      margin-bottom: 7px;
    }
  }
`
