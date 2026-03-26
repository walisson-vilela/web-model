import { MwIcon } from '@mw-kit/mw-ui'

import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import useFormContext from '../../../../context'

import {
  HeaderColWrapper,
  HeaderItemWrapper,
  HeaderSubItemWrapper,
  HeaderWrapper,
} from './style'

const Col = ({ value, label }: { value: number; label: string }) => {
  const { form } = useFormContext()
  const [weekdays, setWeekdays] = useHookFormsAsState('weekdays', form)

  const onRemove = (value: number) => {
    setWeekdays((prev) => prev.filter((w) => w.weekday !== value))
  }

  const weekday = weekdays.find((w) => w.weekday === value)

  const { starts_at, ends_at, length } = weekday
    ? {
        starts_at: weekday.starts_at,
        ends_at: weekday.ends_at,
        length: weekday.intervals.length,
      }
    : {
        starts_at: '--:--',
        ends_at: '--:--',
        length: 0,
      }

  return (
    <HeaderColWrapper>
      <MwIcon
        type='feather'
        icon='x'
        onClick={() => onRemove(value)}
        width={12}
        height={12}
      />
      <HeaderItemWrapper>
        <div>
          <b>{label}</b>
        </div>
        <div>
          {starts_at} às {ends_at}
        </div>
      </HeaderItemWrapper>
      <HeaderSubItemWrapper>N° Intervalo: {length || '-'}</HeaderSubItemWrapper>
    </HeaderColWrapper>
  )
}

export const Header = ({
  days,
}: {
  days: {
    label: string
    value: number
  }[]
}) => {
  return (
    <HeaderWrapper>
      {days.map(({ value, label }) => (
        <Col value={value} label={label} key={value} />
      ))}
    </HeaderWrapper>
  )
}
