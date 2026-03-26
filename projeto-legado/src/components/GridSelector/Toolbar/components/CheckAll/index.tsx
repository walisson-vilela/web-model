import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import * as S from './styles'

interface Props {
  checkAll: () => void
  unCheckAll: () => void
  count: number
  checked: boolean
}

const CheckAll = (props: Props) => {
  const { checkAll, unCheckAll, count, checked } = props

  const onChange = (checked: boolean) => {
    ;(checked ? checkAll : unCheckAll)()
  }

  return (
    <MwInput
      type='checkbox'
      label={<S.LabelContainer children={`Selecionar Todos (${count})`} />}
      onChange={(e) => onChange(e.target.checked)}
      checked={checked}
    />
  )
}

export default CheckAll
