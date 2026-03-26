import { useEffect } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import moment from 'moment'
import toast from 'react-hot-toast'

import { Header } from '../../../../components/Header'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import useAFDContext from '../../provider'

import * as Components from './components'
import { getSchedules, replaceSchedules } from './services'
import * as S from './styles'

const AFDComponent = () => {
  const {
    schedulesState: {
      schedules,
      setSchedules,
      storageSchedules,
      dirtySchedules,
      setDirtySchedules,
      loadingSchedules,
      setLoadingSchedules,

      setStorageSchedules,
    },
    rangeState: { setRange, setDirtyRange },
  } = useAFDContext()

  const getSchedulesList = async () => {
    setLoadingSchedules(true)

    try {
      const { success, data } = await getSchedules()
      if (success) {
        setSchedules(
          data.map((schedule) => ({
            deliverySchedule: {
              label: schedule.frequency_label,
              value: schedule.frequency,
            },
            frequency: {
              label: schedule.update_frequency_label || '-',
              value: schedule.update_frequency,
            },
            emails: schedule.recipients.map((email) => email.email),
          })),
        )
        setStorageSchedules(
          data.map((schedule) => ({
            deliverySchedule: {
              label: schedule.frequency_label,
              value: schedule.frequency,
            },
            frequency: {
              label: schedule.update_frequency_label || '-',
              value: schedule.update_frequency,
            },
            emails: schedule.recipients.map((email) => email.email),
          })),
        )
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingSchedules(false)
    }
  }

  useEffect(() => {
    if (schedules.length === 0) getSchedulesList()
  }, [])

  const saveSchedules = async () => {
    setLoadingSchedules(true)

    try {
      await replaceSchedules(schedules)

      toast(<ToasterContent color={'normal'} />, SuccessStyle)

      setDirtySchedules(false)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingSchedules(false)
    }
  }

  const disabled =
    JSON.stringify(schedules) === JSON.stringify(storageSchedules)

  return (
    <S.Content>
      <Header description='Gerencie os arquivos e realize agendamentos.' />

      <S.Sections>
        <Components.Process />
        <Components.ToSchedule />
      </S.Sections>

      <S.Footer>
        <MwButton
          appearance='bordered'
          size='large'
          type='button'
          content='Cancelar'
          disabled={!dirtySchedules}
          onClick={() => {
            setDirtyRange(false)
            setRange([
              {
                startDate: moment().toDate(),
                endDate: moment().toDate(),
                key: 'selection',
              },
            ])
            setSchedules([])
            setDirtySchedules(false)
            getSchedulesList()
          }}
        />

        <MwButton
          appearance='solid'
          size='large'
          type='button'
          loading={loadingSchedules}
          disabled={disabled || loadingSchedules}
          content='Salvar'
          onClick={saveSchedules}
        />
      </S.Footer>
    </S.Content>
  )
}

export default AFDComponent
