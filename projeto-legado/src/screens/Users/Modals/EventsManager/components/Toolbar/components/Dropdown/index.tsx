import { useState } from 'react'

import { MwMenu } from '@mw-kit/mw-ui'
import { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import { useOnClickOutState } from '../../../../../../../../utils/hooks'

import * as S from './styles'

export interface DropdownProps {
  options: Option[]
}

const Dropdown = (props: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const close = () => setOpen(false)

  return (
    <div ref={useOnClickOutState(close)}>
      <S.Icon
        type='feather'
        icon='more_vertical'
        onClick={() => setOpen((prev) => !prev)}
      />

      <MwMenu
        open={open}
        close={close}
        options={props.options}
        transition={{ properties: { 'max-height': {} } }}
        maxHeight='50px'
        itemSpacing='s3'
      />
    </div>
  )
}

export default Dropdown
