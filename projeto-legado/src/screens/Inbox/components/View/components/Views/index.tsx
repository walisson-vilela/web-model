import React, { useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../../../../utils/hooks'
import { BodyInterface } from '../../interfaces'

import { Grid } from './components'
import * as S from './styles'

const Views = (props: { recipients: BodyInterface['recipients'] }) => {
  const { recipients } = props

  const [viewsOpen, setViewsOpen] = useState(false)

  return (
    <S.Button
      ref={useOnClickOutState(() => setViewsOpen(false))}
      onClick={() => setViewsOpen((prev) => !prev)}
    >
      Confirmação de leitura: {recipients.visualized}/{recipients.total} (
      {recipients.visualized_percent}%)
      <MwIcon type='semantic' icon='caret down' width='17px' height='17px' />
      <Grid open={viewsOpen} recipients={recipients} />
    </S.Button>
  )
}

export default Views
