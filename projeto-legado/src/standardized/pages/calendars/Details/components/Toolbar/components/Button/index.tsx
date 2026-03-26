import React from 'react'

import { ButtonProps, MwButton } from '@mw-kit/mw-ui'

const Button = (props: Omit<ButtonProps, 'type' | 'apperance' | 'size'>) => {
  return (
    <div className='button'>
      <MwButton type='button' appearance='solid' {...props} />
    </div>
  )
}

export default Button
