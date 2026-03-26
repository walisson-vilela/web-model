import { useState } from 'react'
import type React from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import type { RowComponent } from '../../../../../../../../../../../../../components/GridSelector/interfaces'
import useFormContext from '../../../../../../../context'
import type { Event, Row } from '../../../../../types'
import { PERMISSIONS } from '../../../../constants'

import { Content } from './components/Content'

const TimeConfig: RowComponent<Row> = (props) => {
  const {
    data: { event, permission, id },
  } = props

  const { useField } = useFormContext()

  const [, setEvents] = useField('events')
  const [open, setOpen] = useState<boolean>(false)

  const set: React.Dispatch<React.SetStateAction<Event>> = (value) => {
    setEvents((prev) => {
      const cure = prev[id]
      const newe = typeof value === 'function' ? value(cure) : value
      if (newe === cure) return prev
      const events = [...prev]
      events[id] = newe
      return events
    })
  }

  if (permission.value !== PERMISSIONS.REMOVE.value) return null

  return (
    <Popup
      on='click'
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      position='left center'
      content={<Content event={[event, set]} close={() => setOpen(false)} />}
      trigger={
        <MwIcon
          type='semantic'
          icon='setting'
          width='12px'
          height='12px'
          color='darkGrey'
        />
      }
      style={{ padding: 0 }}
    />
  )
}

export default TimeConfig
