import { useState } from 'react'

import { MwMenu } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../../../../../../utils/hooks'
import type { GetCardMenu } from '../../../../components/types'
import { getIsFuture } from '../../../../functions'
import { EventsStep, NameStep, UsersStep } from '../../../../modals/Form/steps'
import { edit, exclusionListHistory, historics } from '../../../menus'
import exclusionListManager from '../../../menus/exclusionListManager'

const getCardMenu: GetCardMenu = (card) => {
  const [open, setOpen] = useState<'historics' | null>(null)

  const close = () => setOpen(null)

  const isFuture = getIsFuture(card)

  return {
    width: '160px',
    maxHeight: '120px',
    options: [
      edit(card, isFuture, {
        NameStep,
        EventsStep,
        UsersStep,
      }),
      ...(isFuture ? [exclusionListManager(card)] : [historics(card, setOpen)]),
    ],
    children: (
      <div ref={useOnClickOutState(close)}>
        <MwMenu
          open={open === 'historics'}
          close={close}
          position='top left'
          options={[exclusionListHistory(card)]}
          width='160px'
          height='100%'
          containerSpacing='s1'
          transition={{ properties: { width: {} } }}
        />
      </div>
    ),
  }
}

export default getCardMenu
