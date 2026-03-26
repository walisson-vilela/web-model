import styled from 'styled-components'

import Modal from '../../../../../../../components/MwModal'

export const Header = styled(Modal.Header)`
  .ui.modal > &.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:last-child {
      cursor: pointer;
    }
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};

  > div {
    display: flex;

    > div:first-child {
      width: 317px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    > div:last-child {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: ${({ theme }) => theme.spacings.s3};
      position: relative;
    }
  }
`

export const Title = styled.div`
  background-color: ${({ theme }) => theme.colors.lightestGrey};

  ${({ theme }) => theme.useTypography('h2')}
  line-height: 19px;
  color: ${({ theme }) => theme.colors.darkBlue};

  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const Pending = styled.div`
  padding-left: ${({ theme }) => theme.spacings.s3};
`
