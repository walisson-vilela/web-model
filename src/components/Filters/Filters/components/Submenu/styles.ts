import styled from 'styled-components'

export const EmptyMessage = styled.div`
  ${({ theme }) => theme.useTypography('p')}

  padding: 0 20px;
  color: ${({
    theme: {
      colors: { lightGrey },
    },
  }) => lightGrey};
  text-align: center;
  margin: auto;
  width: 100%;
`
