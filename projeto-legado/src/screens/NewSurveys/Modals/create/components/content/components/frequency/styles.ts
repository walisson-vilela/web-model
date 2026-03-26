import styled from 'styled-components'

export const Container = styled.div`
  align-self: flex-end;
`

interface IconProps {
  isDisable: boolean
}

export const Icon = styled.div<IconProps>`
  width: 35px;
  height: 35px;

  opacity: ${(props) => (props.isDisable ? '0.5' : '1')};
  cursor: ${(props) => (props.isDisable ? 'default' : 'pointer')};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #c8c8c8;
  border-radius: 4px;
`
