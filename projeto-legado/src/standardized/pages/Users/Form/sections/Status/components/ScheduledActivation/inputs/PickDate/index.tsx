import { useCallback } from 'react'

import { MwCalendar } from '@mw-kit/mw-ui'
import moment from 'moment'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../components/Toaster'
import useFormContext from '../../../../../../context'

import { userEventsUpdate } from './service'

const PickDate = ({
  eventId,
  close,
}: {
  eventId: number
  close: () => void
}) => {
  const {
    loading: [, setLoading],
    loadData,
  } = useFormContext()
  const toDay = new Date()
  const min = moment(toDay).add(1, 'day').startOf('day').toDate()

  const onSubmit = useCallback(
    async (value: Date | null) => {
      if (!value) return

      setLoading(true)

      try {
        await userEventsUpdate(
          eventId,
          moment(value).format('YYYY-MM-DD HH:mm:ss'),
        )
        loadData()
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
        setLoading(false)
      }

      close()
    },
    [eventId, loadData],
  )

  return (
    <MwCalendar
      type='single'
      initialValue={toDay}
      min={min}
      onSubmit={{
        onClick: onSubmit,
      }}
      paddingless
    />
  )
}

export default PickDate
