import styled from 'styled-components'

const Container = styled.div<{ $color?: 'blue' | 'red' }>`
  position: absolute;
  top: 8.5px;
  right: -8.5px;

  width: 17px;
  height: 17px;

  border-radius: 100%;

  background-color: ${({ theme, $color: color }) =>
    theme.colors[color === 'blue' ? 'blue' : 'warningRed']};
  border: 1px solid ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};

  font-size: 9px;
  line-height: 11px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Bullet = (props: { children: number; color?: 'blue' | 'red' }) => {
  return props.children ? (
    <Container
      $color={props.color}
      children={props.children < 100 ? props.children : '99+'}
    />
  ) : null
}

export default Bullet
