import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'
import moment from 'moment'

import { generateKey } from '../../../../../../../../utils/Generate'
import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import useFormContext from '../../../../context'

import { ScrollColWrapper, ScrollItemWrapper, ScrollWrapper } from './style'

const Items = ({ value }: { value: number }) => {
  const { form } = useFormContext()
  const [weekdays, setWeekdays] = useHookFormsAsState('weekdays', form)
  const hasInterval = weekdays.some((item) => item.intervals.length > 0)
  const weekday = weekdays.find((w) => w.weekday === value)

  const flagLabel = form.watch('electronic_point') ? 'Pré-Ass.' : 'Bloqueio'

  const { intervals, invalid } = weekday
    ? {
        intervals: weekday.intervals,
        invalid:
          weekday.intervals.length < 1 &&
          moment(weekday.ends_at, 'HH:mm').diff(
            moment(weekday.starts_at, 'HH:mm'),
            'minutes',
          ),
      }
    : {
        intervals: [],
        invalid: false,
      }

  const onRemove = (itemIndex: number) => {
    setWeekdays((prev) => {
      const weekIndex = prev.findIndex((w) => w.weekday === value)

      if (weekIndex < 0) return prev
      const newstate = [...prev]

      newstate[weekIndex].intervals.splice(itemIndex, 1)
      return newstate
    })
  }

  if (intervals.length === 0) {
    let hours = 0

    if (weekday && weekday.intervals.length === 0) {
      const start = moment(weekday.starts_at, 'HH:mm')
      const end = moment(weekday.ends_at, 'HH:mm')
      hours = end.diff(start, 'hours')
    }

    return (
      <ScrollColWrapper key={value} data-danger={hasInterval && hours > 4}>
        <span>Nenhum Intervalo definido</span>
      </ScrollColWrapper>
    )
  }

  return (
    <ScrollColWrapper key={value} data-invalid={invalid}>
      {intervals.map((interval, i) => (
        <ScrollItemWrapper key={generateKey(i)}>
          <MwIcon
            type='feather'
            icon='trash'
            onClick={() => onRemove(i)}
            color='white'
          />
          <MwEllipsisContainer>
            <b>{interval.name || '-'}</b>{' '}
          </MwEllipsisContainer>
          <div>
            {interval.starts_at} às {interval.ends_at}
          </div>
          <div>Limite: {interval.start_limit}</div>
          <div>
            {flagLabel}: {interval.flag ? 'Sim' : 'Não'}
          </div>
        </ScrollItemWrapper>
      ))}
    </ScrollColWrapper>
  )
}

export const Scroll = ({
  days,
}: {
  days: {
    label: string
    value: number
  }[]
}) => {
  return (
    <ScrollWrapper>
      {days.map(({ value }) => (
        <Items value={value} key={value} />
      ))}
    </ScrollWrapper>
  )
}
