import { MwIcon } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

import { HeaderItemComponent } from '../../../../types'

import useHamburguerContext, { HamburgerProvider } from './context'

const Container = styled.div<{ $disabled?: boolean }>`
  min-height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkBlue};

  ${({ $disabled: disabled, onClick }) => {
    if (disabled) {
      return css`
        > * {
          opacity: 0.25;
        }
      `
    }

    if (!onClick) {
      return
    }

    return css`
      cursor: pointer;
    `
  }}}
`

const Hamburguer = Object.assign(
  (({ disabled, ...props }) => {
    const { loading, toggle } = useHamburguerContext()

    return (
      <Container
        {...(loading
          ? {}
          : {
              onClick: toggle,
            })}
        {...props}
        $disabled={disabled}
      >
        <MwIcon
          type='feather'
          icon='menu'
          color='white'
          width='25.5px'
          height='auto'
        />
      </Container>
    )
  }) as HeaderItemComponent,
  {
    Provider: HamburgerProvider,
  },
)

export default Hamburguer
