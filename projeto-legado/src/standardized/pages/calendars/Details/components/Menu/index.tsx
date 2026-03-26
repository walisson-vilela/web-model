import React, { useState } from 'react'

import { MwIcon, MwMenu } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../../../../utils/hooks'

import type { MenuProps } from './types'

const Menu = (props: MenuProps) => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <div ref={useOnClickOutState(close)} style={{ position: 'relative' }}>
      <MwIcon
        type='feather'
        icon='more_vertical'
        onClick={() => setOpen((prev) => !prev)}
      />
      <MwMenu
        {...{ open, close, ...props }}
        axis='y'
        center={{ x: 0, y: 75 }}
        containerSpacing='s1'
        transition={{ properties: { 'max-height': {} } }}
      />
    </div>
  )
}

export default Menu
