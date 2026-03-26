import { MwAbsoluteContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

const Container = styled(MwAbsoluteContainer)`
  width: 446px;
  right: -54px;
  color: ${({ theme }) => theme.colors.greyishBlue};

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
  }

  :before {
    content: '';

    position: absolute;
    top: -5px;
    right: 59px;
    z-index: 2;

    width: 0px;
    height: 0px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 6px solid ${({ theme }) => theme.colors.white};
  }
`

export default Container
