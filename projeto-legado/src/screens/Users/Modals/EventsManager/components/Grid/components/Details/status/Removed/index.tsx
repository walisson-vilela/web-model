import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { Event } from '../../../../../../interfaces'
import { formatPeriod } from '../../function'

import { ModifierContainer } from './styles'

const Removed = ({ event }: { event: Event }) => {
  const { type, modifier } = event

  const [label, color, modified_at] =
    type === 'out'
      ? ['Removido', undefined, event.modified_at]
      : ['Interrompido', 'red', event.interrupted_at]

  return (
    <React.Fragment>
      <MwEllipsisContainer>
        Status do Evento: <span className={color} children={label} />
      </MwEllipsisContainer>

      <ModifierContainer>
        Por:
        <MwEllipsisContainer children={modifier?.name || '-'} /> |{' '}
        {formatPeriod(modified_at)}
      </ModifierContainer>
    </React.Fragment>
  )
}

export default Removed
