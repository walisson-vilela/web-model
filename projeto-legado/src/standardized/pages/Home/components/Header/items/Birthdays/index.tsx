import { useCallback, useEffect, useState } from 'react'

import moment from 'moment'

import { useOnClickOutState } from '../../../../../../../utils/hooks'
import { Birthday } from '../../../../icons'
import { HeaderItemComponent } from '../../../../types'

import Popup from './Popup'
import { getTotalBirthdays } from './services'
import * as S from './styles'

const Birthdays: HeaderItemComponent = (props) => {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const start = moment(
    (() => {
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      return d
    })(),
  )
    .weekday(0)
    .subtract(1, 'w')
    .locale(window.navigator.language)

  const end = moment(start).weekday(6).add(2, 'w')

  const loadTotal = useCallback(async () => {
    setLoading(true)

    try {
      const total = await getTotalBirthdays(start, end)
      setTotal(total)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadTotal()
  }, [loadTotal])

  const close = () => setOpen(false)

  const { disabled, ...rest } = props

  return (
    <S.Item
      {...(open ? {} : { title: 'Aniversariantes' })}
      $loading={loading}
      ref={useOnClickOutState(close)}
    >
      <S.Container
        $disabled={disabled}
        {...(loading
          ? {}
          : { onClick: () => setOpen((prev) => !prev), ...rest })}
      >
        <Birthday />
      </S.Container>

      <S.Bullet color='blue' children={total} />

      <Popup start={start} end={end} open={open} />
    </S.Item>
  )
}

export default Birthdays
