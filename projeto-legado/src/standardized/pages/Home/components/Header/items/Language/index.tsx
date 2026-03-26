import { useState } from 'react'

import { useOnClickOutState } from '../../../../../../../utils/hooks'
import { Language as Icon } from '../../../../icons'
import { HeaderItemComponent } from '../../../../types'

import Popup from './Popup'
import * as S from './styles'

const Language: HeaderItemComponent = (props) => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const { disabled, ...rest } = props

  return (
    <S.Item
      {...(open ? {} : { title: 'Idioma' })}
      ref={useOnClickOutState(close)}
    >
      <S.Container
        onClick={() => setOpen((prev) => !prev)}
        $disabled={disabled}
        {...rest}
      >
        <Icon />
      </S.Container>

      <Popup open={open} />
    </S.Item>
  )
}

export default Language
