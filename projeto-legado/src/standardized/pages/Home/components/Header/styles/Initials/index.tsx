import styled, { css } from 'styled-components'

import {
  filterObject,
  notEmptyStringOrDefault,
} from '../../../../../../utils/formatters'

type InitialsProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string
  name?: string
  mode?: 'nav' | 'menu'
  bordered?: boolean
}

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  $src?: InitialsProps['src']
  $mode?: InitialsProps['mode']
  $bordered?: InitialsProps['bordered']
}

const Container = styled.div<ContainerProps>`
  ${({ $mode: mode }) => {
    const size = mode === 'menu' ? 40 : 35
    return css`
      width: ${size}px;
      height: ${size}px;
    `
  }}

  ${({ $bordered: bordered }) =>
    bordered &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.blue};
    `}
  border-radius: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ $src: src }) =>
    src &&
    css`
      background-image: url(${src});
      background-size: cover;
      background-position: center;
    `}

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: ${({ theme }) => theme.colors.blue};
`

const getInitials = (name: string): string => {
  const initials = name
    .split(' ')
    .reduce<string[]>((names, e) => {
      const name = notEmptyStringOrDefault(e)
      return [...names, ...(name !== null ? [name.toUpperCase()[0]] : [])]
    }, [])
    .slice(0, 2)
    .join('')

  return initials
}

const Initials = (props: InitialsProps) => {
  const containerProps = filterObject<InitialsProps, ContainerProps>(
    props,
    ['src', 'name', 'mode', 'bordered'],
    {
      $mode: props.mode,
      $bordered: props.bordered,
      ...(() => {
        if (props.src) return { $src: props.src }
        return props.name ? { children: getInitials(props.name) } : {}
      })(),
    },
  )

  return <Container {...containerProps} />
}

export default Initials
