import { useState } from 'react'

import { filterObject } from '../../../functions/formatters'
import { useOnClickOut } from '../../../hooks'
import Icon from '../../Icon'

import type { ButtonProps } from './interfaces'
import * as S from './styles'

const Button = (props: ButtonProps) => {
  const { getContent } = props

  const [open, setOpen] = useState<boolean>(false)

  const close = () => setOpen(false)

  const onClick = props.disabled ? undefined : () => setOpen((prev) => !prev)

  const buttonProps = filterObject<
    ButtonProps,
    Exclude<ButtonProps, 'getContent' | 'gap'>
  >(props, ['getContent', 'gap'])

  return (
    <div ref={useOnClickOut(close)}>
      <S.Container {...buttonProps} {...{ onClick }} $gap={props.gap}>
        {props.children}
        <Icon
          type='feather'
          icon={open ? 'chevron_up' : 'chevron_down'}
          width='12px'
        />
      </S.Container>

      {getContent(open, close)}
    </div>
  )
}

export default Button
