import { useState } from 'react'

import { MwGrid, MwIcon, MwMenu } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../utils/hooks'

const Menu = (props: Omit<Parameters<typeof MwMenu>[0], 'open' | 'close'>) => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <MwGrid.Col
      width='auto'
      spacing='0'
      align={{ content: { vertical: 'center' } }}
      ref={useOnClickOutState(() => setOpen(false))}
      style={{ position: 'relative' }}
    >
      <MwIcon
        type='feather'
        icon='more_vertical'
        onClick={() => setOpen((prev) => !prev)}
        color={open ? 'darkestGrey' : undefined}
      />

      <MwMenu
        {...{
          open,
          close,
          containerSpacing: 's1',
          axis: 'x',
          center: { x: 50, y: 25 },
          ...props,
        }}
      />
    </MwGrid.Col>
  )
}

export default Menu
