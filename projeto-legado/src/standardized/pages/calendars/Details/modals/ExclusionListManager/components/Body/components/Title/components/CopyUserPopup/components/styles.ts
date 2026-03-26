import styled from 'styled-components'

export const Header = styled.div`
  h1 {
    ${({ theme }) => theme.useTypography('h1')}
    border-bottom: 1px solid ${({ theme }) => theme.getColor('lightestGrey')};
    margin-bottom: ${({ theme }) => theme.spacings.s3};
    padding-bottom: ${({ theme }) => theme.spacings.s3};
  }
`
export const AfterItems = styled.div`
  margin-top: 10px;
  display: grid;
  gap: ${({ theme }) => theme.spacings.s3};
`
export const MethodOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s1};
`
export const ListOptions = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: 0;
`
export const ListOptionsEmpty = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s3};
  width: 100%;
  height: 130px;

  display: grid;
  place-items: Center;
  border: 1px solid ${({ theme }) => theme.getColor('lightestGrey')};

  span {
    ${({ theme }) => theme.useTypography('h4')}
    color:${({ theme }) => theme.getColor('lightGrey')};
  }
`
export const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  position: relative;
`

export const CopyWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.getColor('lightestGrey')};
  padding-top: ${({ theme }) => theme.spacings.s3};
  display: grid;
  place-items: center;
  button {
    width: 150px;
  }
`
