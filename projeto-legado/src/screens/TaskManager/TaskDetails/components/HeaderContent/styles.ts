import styled from 'styled-components'

interface ContainerProps {
  style?: React.CSSProperties
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
`

export const Item = styled.div`
  text-align: center;
  padding: 0 14px;
  border-right: 1px solid #9aa1a9;

  &:last-child {
    padding-right: 0;
    border: none;
  }

  p:first-child {
    font-size: 12px;
    font-weight: bold;
    color: black;
    margin-bottom: 7px;
  }

  p:last-child {
    font-size: 14px;
    font-weight: normal;
    color: #6b7686;
    margin-bottom: 0;
  }
`
