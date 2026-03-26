import { useCallback } from 'react'

import moment from 'moment'

import { useHookFormsAsState } from '../../../../../../utils/hooks'
import { WeekDays, auxFormConstant } from '../../constants'
import useFormContext from '../../context'
import type { AuxForm, Intervals, Weekdays } from '../../interfaces'
import {
  checkIntervalIntersection,
  checkOutsideBoundaries,
} from '../../services'

const isIntervalInsideDay = (interval: Intervals, day: Weekdays) => {
  const iStart = moment(interval.starts_at, 'HH:mm')
  const iEnd = moment(interval.ends_at, 'HH:mm')
  const dStart = moment(day.starts_at, 'HH:mm')
  const dEnd = moment(day.ends_at, 'HH:mm')

  return iStart.isSameOrAfter(dStart) && iEnd.isSameOrBefore(dEnd)
}

const refreshWeekDays = (weekdays: Weekdays[], value: AuxForm) => {
  let content = weekdays

  for (const weekday of value.weekdays) {
    const weekday_label =
      WeekDays.find((el) => Number(el.value) === weekday)?.label || ''

    const day = content.find((el) => el.weekday === weekday)
    if (day) {
      content = content.map((wd) => {
        if (wd.weekday === weekday) {
          const newWd = {
            ...wd,
            ends_at: value.ends_at,
            starts_at: value.starts_at,
          }

          const intervals = wd.intervals.filter((interval) => {
            if (isIntervalInsideDay(interval, newWd)) return interval
            return null
          })

          return {
            ...newWd,
            intervals: intervals,
          }
        }
        return wd
      })
    } else {
      content.push({
        intervals: [],
        ends_at: value.ends_at,
        starts_at: value.starts_at,
        weekday,
        weekday_label,
      })
    }
  }

  return content
}

const refreshWeekdaysIntervals = (
  content: Weekdays[],
  value: AuxForm,
  interval: Intervals,
) => {
  return content.map((weekday) => {
    if (!value.weekdays.includes(weekday.weekday)) return weekday

    const startAt = moment(interval.starts_at, 'HH:mm')
    const endsAt = moment(interval.ends_at, 'HH:mm')
    const weekdayStartsAt = moment(weekday.starts_at, 'HH:mm')
    const weekdayEndsAt = moment(weekday.ends_at, 'HH:mm')

    if (
      !startAt.isBetween(weekdayStartsAt, weekdayEndsAt) ||
      !endsAt.isBetween(weekdayStartsAt, weekdayEndsAt)
    ) {
      return weekday
    }

    const overlaps = weekday.intervals.some((i) => {
      const iStartAt = moment(i.starts_at, 'HH:mm')
      const iEndsAt = moment(i.ends_at, 'HH:mm')
      return (
        iStartAt.isBetween(startAt, endsAt) ||
        iEndsAt.isBetween(startAt, endsAt)
      )
    })

    if (overlaps) return weekday

    const intervals = [...weekday.intervals, interval].sort((x, y) => {
      const xStartAt = moment(x.starts_at, 'HH:mm')
      const yStartAt = moment(y.starts_at, 'HH:mm')
      return xStartAt.isAfter(yStartAt) ? 1 : -1
    })

    return { ...weekday, intervals }
  })
}

export const useUpdateWeekDays = () => {
  const {
    form,
    auxForm,
    resetAux,
    modal: [, setModal],
  } = useFormContext()

  const [weekdays, setWeekdays] = useHookFormsAsState('weekdays', form)
  const auxFormValues = auxForm.getValues()

  const hasIntervalIntersection = useCallback(() => {
    const intersection = checkIntervalIntersection(auxFormValues, weekdays)
    if (intersection) {
      setModal({
        title: 'Notificação',
        content: (
          <p>
            Não é possível criar intervalos que tenham intercessão com outro
            intervalo do mesmo dia.
          </p>
        ),
        buttonType: 'MwButton',
        actions: [
          {
            content: 'Ok',
            onClick: () => setModal(null),
          },
        ],
      })
    }

    return intersection
  }, [auxFormValues, weekdays, setModal])

  const hasOutsideBoundaries = useCallback(() => {
    if (weekdays.length === 0 || auxFormValues.weekdays.length === 0) {
      return false
    }

    const boundaries = checkOutsideBoundaries(auxFormValues, weekdays)

    if (boundaries) {
      setModal({
        title: 'Notificação',
        content: (
          <p>
            Não pode haver intervalo antes ou após o horário da jornada. Corrija
            os campos destacados em vermelho para prosseguir.
          </p>
        ),
        buttonType: 'MwButton',
        actions: [
          {
            content: 'Ok',
            onClick: () => setModal(null),
          },
        ],
      })
    }

    return boundaries
  }, [weekdays, auxFormValues, setModal])

  const updateWeekDays = useCallback(() => {
    if (auxFormValues.interval) {
      if (hasOutsideBoundaries()) return
      if (hasIntervalIntersection()) return
    }

    const value = auxForm.getValues()
    const interval: Intervals = {
      ends_at: value.ends_at,
      starts_at: value.starts_at,
      flag: value.flag,
      name: value.name,
      start_limit: value.start_limit,
    }

    setWeekdays((prev) => {
      let content = prev

      if (!auxFormValues.interval) {
        content = refreshWeekDays(content, value)
      } else {
        content = refreshWeekdaysIntervals(content, value, interval)
      }

      return content
    })

    resetAux(auxFormConstant)
  }, [
    auxForm,
    auxFormValues.interval,
    resetAux,
    hasIntervalIntersection,
    hasOutsideBoundaries,
    setWeekdays,
  ])

  return updateWeekDays
}
