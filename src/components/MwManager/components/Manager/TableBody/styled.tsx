import styled from 'styled-components'

import { scrollbar } from '../../../styled'

export const TableBody = styled.tbody`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  ${scrollbar}
`
export const MessageCell = styled.td`
  height: 100%;
  width: 100%;
  color: #b2b2b2;
  padding-top: 112px;
  font-size: 16px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1 1 auto;
`

export const MessageRow = styled.tr`
  display: flex;
  height: 100%;
  width: 100%;
`
export const LoaderRow = styled.tr`
  display: flex;
  width: 100%;
`

export const LoaderCell = styled.td`
  padding: 0;
  flex: 1 1 auto;
  display: flex;
  position: relative;
`

interface LoaderContainerProps {
  $height: number | null
}

export const LoaderContainer = styled.div<LoaderContainerProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;

  height: ${({ $height: height }) => (height ? `${height}px` : '100%')};

  z-index: 98;
`

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 3px solid #e6e6e6;
  border-top-color: #3455ab;
  animation: mw_manager_spin 0.8s linear infinite;
  margin: 24px auto;

  @keyframes mw_manager_spin {
    to {
      transform: rotate(360deg);
    }
  }
`
