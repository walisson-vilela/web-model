import { MwButton } from '@mw-kit/mw-ui'
import styled, { keyframes } from 'styled-components'

export const Main = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
  > div:first-child {
    flex: 1;
    line-height: 20px;
    ${({ theme }) => theme.useTypography('h1', { fontWeight: 'normal' })}
  }
`

export const IconButton = styled(MwButton)`
  min-width: unset;
  padding-left: ${({ theme }) => theme.spacings.s1};
  padding-right: ${({ theme }) => theme.spacings.s1};
`

const rotate = keyframes`
 to{
   transform: rotate(360deg);
 }
`

export const Loader = styled.div`
  width: 100% !important;
  padding: 32px 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e4e4e4;

  div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #c8c8c8;
    border-left-color: #3455ab;
    animation: ${rotate} 0.5s linear infinite;
  }
`
