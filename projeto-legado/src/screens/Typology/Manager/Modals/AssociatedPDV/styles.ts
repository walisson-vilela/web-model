import styled from 'styled-components'

export const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};

  > div {
    position: relative;
    display: flex;
    align-items: center;

    :first-child {
      flex: 1;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.greyishBlue};
    }

    :last-child {
      width: 4px;
    }
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
`
