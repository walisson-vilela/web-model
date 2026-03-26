import React, { useState } from 'react'

import type feather from '../../../../assets/icons/feather'
import type { IconProps } from '../../../Icon/interfaces'
import Input from '../Input'

import type { PasswordProps } from './interfaces'

const Password = React.forwardRef(
  (props: PasswordProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const [visibility, setVisibility] = useState<'visible' | 'hidden'>('hidden')

    const icons = {
      visible: {
        icon: 'eye_off' as keyof typeof feather,
        onClick: () => setVisibility('hidden'),
      },
      hidden: {
        icon: 'eye' as keyof typeof feather,
        onClick: () => setVisibility('visible'),
      },
    }

    const icon = {
      type: 'feather',
      width: '19px',
      ...icons[visibility],
    } as IconProps

    return (
      <Input
        {...props}
        type={visibility === 'visible' ? 'text' : 'PASSWORD'}
        icon={{
          icon,
          position: 'right',
        }}
        placeholder={props.placeholder || '••••••••'}
        ref={ref}
      />
    )
  },
)

Password.displayName = 'Password'

export default Password
