import { useState } from 'react'

import { MwEllipsisContainer, MwIcon, Popup } from '@mw-kit/mw-ui'

import { centeringTransitionDuration } from '../../../../../../../../constants'
import type { CardNodeDatum } from '../../../../../../../../types'
import { usePopupTimeout } from '../../../../../../functions'

import { CardContent } from './components/CardContent'
import { TriggerWrapper } from './styles'

export const TeamsPopup = ({ nodeDatum }: { nodeDatum: CardNodeDatum }) => {
  const { attributes } = nodeDatum
  const [open, setOpen] = useState<boolean | NodeJS.Timeout>(false)

  return (
    <Popup
      on='click'
      position='top center'
      offset={[0, 9]}
      trigger={
        <TriggerWrapper>
          <MwEllipsisContainer>
            <span className='bold'>{attributes.name || '-'} </span>
          </MwEllipsisContainer>
          <span>
            <MwIcon type='semantic' icon='pencil' width={8} height={8} />
          </span>
        </TriggerWrapper>
      }
      content={<CardContent nodeDatum={nodeDatum} setOpen={setOpen} />}
      style={{
        width: '196px',
        margin: 0,
        padding: 0,
      }}
      {...usePopupTimeout(centeringTransitionDuration, [open, setOpen])}
    />
  )
}
