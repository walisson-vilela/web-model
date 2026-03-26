import { MwAbsoluteContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

const Container = styled(MwAbsoluteContainer)`
  width: 225px;
  right: -24px;
  color: ${({ theme }) => theme.colors.greyishBlue};

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  :before {
    content: '';

    position: absolute;
    top: -11px;
    right: 25px;
    z-index: 2;

    width: 0px;
    height: 0px;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 12px solid ${({ theme }) => theme.colors.white};
  }
`

export default Container
