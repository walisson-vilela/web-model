import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

interface IconProps {
  color: string
}

export const Icon = styled.div<IconProps>`
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};

  & > span {
    font: normal normal normal 14px/24px Lato;
    letter-spacing: 0px;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const NameContainer = styled.span`
  margin-left: 4px;
  font: normal normal normal 14px/24px Lato;
`
