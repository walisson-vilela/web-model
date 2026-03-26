import { useCallback } from 'react'

import moment from 'moment'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../../../components/Toaster'
import useEventManagerContext from '../../../../../../context'
import { Event } from '../../../../../../interfaces'

import NotificationModal from './Notification'
import { deleteEvent } from './service'
import * as S from './styled'

const Interrupt = ({ event }: { event: Event }) => {
  const {
    loading: [, setLoading],
    modal: [, setModal],
    user_id,
    reload,
    changes: [, setChanges],
    confirmInterrupt: [confirmInterrupt, setConfirmInterrupt],
  } = useEventManagerContext()

  const { event: eventData } = event

  const handleRemove = useCallback(async () => {
    await deleteEvent(user_id, event.event.id)
    setChanges(true)
    reload()
    toast(<ToasterContent color='normal' />, SuccessStyle)
  }, [user_id, event.event.id])

  const isFuture = moment(eventData.starts_at).isAfter(moment().add(1, 'hours'))

  const onClick = useCallback(async () => {
    if (confirmInterrupt) {
      setModal(
        <NotificationModal
          handleRemove={handleRemove}
          setConfirmInterrupt={setConfirmInterrupt}
          onClose={() => setModal(null)}
        />,
      )
    } else {
      setLoading(true)

      try {
        await handleRemove()
      } catch (e) {
        console.error(e)
        setLoading(false)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }
    }
  }, [handleRemove, confirmInterrupt])

  return (
    <S.RemoveStatusName
      {...(isFuture
        ? { children: 'Remover' }
        : { className: 'red', children: 'Interromper' })}
      onClick={onClick}
    />
  )
}

export default Interrupt
