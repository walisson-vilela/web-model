import React, { useEffect, useState } from 'react'

import Icon from '../../../../../Icon'
import Menu from '../../../../../Menu'
import type { MenuProps } from '../../../../../Menu/interfaces'
import { months } from '../../../../constants'
import * as S from '../../styles'

const MonthPicker = (
  props: Omit<MenuProps, 'before' | 'options' | 'spacing'> & {
    year: number
    setValue: (year: number, month: number) => void
    min?: Date
    max?: Date
  },
) => {
  const { setValue, close, min, max, year: initialYear, ...menuProps } = props

  const [year, setYear] = useState(initialYear)

  useEffect(() => {
    setYear(initialYear)
  }, [props.open, initialYear])

  return (
    <Menu
      close={close}
      {...menuProps}
      before={{
        fluid: true,
        children: (
          <S.MonthContainer>
            <S.NavBtn
              type='button'
              onClick={() => setYear((prev) => prev - 1)}
              disabled={min !== undefined && min.getFullYear() >= year}
            >
              <Icon
                type='feather'
                icon='chevron_left'
                color='darkBlue'
                strokeWidth='3px'
              />
            </S.NavBtn>

            <div>
              <S.MonthBtn>{year}</S.MonthBtn>
            </div>

            <S.NavBtn
              type='button'
              onClick={() => setYear((prev) => prev + 1)}
              disabled={max !== undefined && max.getFullYear() <= year}
            >
              <Icon
                type='feather'
                icon='chevron_right'
                color='darkBlue'
                strokeWidth='3px'
              />
            </S.NavBtn>
          </S.MonthContainer>
        ),
      }}
      options={months.map((label, index) => {
        return {
          label,
          onClick: () => {
            setValue(year, index)
            close()
          },
          rules: [
            () => {
              const disabled =
                (min !== undefined &&
                  (min.getFullYear() > year ||
                    (min.getFullYear() === year && min.getMonth() > index))) ||
                (max !== undefined &&
                  (max.getFullYear() < year ||
                    (max.getFullYear() === year && max.getMonth() < index)))

              return !disabled
            },
          ],
          data: {},
        }
      })}
    />
  )
}

export default MonthPicker
