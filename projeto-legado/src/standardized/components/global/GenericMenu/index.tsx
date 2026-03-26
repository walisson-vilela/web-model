import { useState } from 'react'

import { MwIcon, MwMenu } from '@mw-kit/mw-ui'
import type { MenuProps } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import { useOnClickOutState } from '../../../../utils/hooks'

import { Container } from './styles'

export const GenericMenu: React.FC<Omit<MenuProps, 'open' | 'close'>> = (
  props,
) => {
  const [open, setopen] = useState<boolean>(false)

  return (
    <Container ref={useOnClickOutState(() => setopen(false))}>
      <MwIcon
        type='feather'
        icon='more_vertical'
        onClick={() => setopen((prev) => !prev)}
      />
      <MwMenu open={open} close={() => setopen(false)} {...props} />
    </Container>
  )
}
