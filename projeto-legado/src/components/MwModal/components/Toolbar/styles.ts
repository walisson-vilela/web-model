import styled from 'styled-components'

export const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  align-items: center;
  justify-content: space-between;

  > div {
    :nth-child(2) {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s1};
    }
  }

  margin-bottom: ${({ theme }) => theme.spacings.s3};
`

export const DropdownContainer = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.spacings.s1};
`

export const ManagerContainer = styled.div`
  height: 383px;
  display: flex;
  flex-direction: column;
`
